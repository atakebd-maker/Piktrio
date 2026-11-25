import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Sparkles,
  Tag,
} from 'lucide-react';
import { BlogPost, PromptItem } from '../types/prompt';
import { promptMatchesCategory } from '../data/initialPrompts';
import { copyToClipboard } from '../utils/clipboard';
import { AdBanner } from './AdBanner';
import { ChatGptIcon, GeminiIcon } from './AiIcons';

interface BlogPageProps {
  blogs: BlogPost[];
  selectedBlog: BlogPost | null;
  allPrompts: PromptItem[];
  onBackHome: () => void;
  onSelectBlog: (blog: BlogPost | null) => void;
  onSelectPrompt: (prompt: PromptItem) => void;
  onCopyPrompt: (promptText: string, promptId: string) => void;
}

const getPromptTimestamp = (p: PromptItem): number => {
  if (!p.createdAt) return 0;
  if (typeof p.createdAt === 'number') return p.createdAt;
  if (typeof p.createdAt === 'string') {
    const parsed = Date.parse(p.createdAt);
    return isNaN(parsed) ? 0 : parsed;
  }
  const anyCreated = p.createdAt as unknown as { toMillis?: () => number; seconds?: number };
  if (typeof anyCreated.toMillis === 'function') return anyCreated.toMillis();
  if (typeof anyCreated.seconds === 'number') return anyCreated.seconds * 1000;
  return 0;
};

export const BlogPage: React.FC<BlogPageProps> = ({
  blogs,
  selectedBlog,
  allPrompts,
  onBackHome,
  onSelectBlog,
  onSelectPrompt,
  onCopyPrompt,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number[]>([0, 1]);

  // Collect all prompts matching the selected blog's category
  const categoryPrompts = useMemo(() => {
    if (!selectedBlog) return [];
    return allPrompts
      .filter((p) => promptMatchesCategory(p, selectedBlog.categoryId))
      .sort((a, b) => getPromptTimestamp(b) - getPromptTimestamp(a));
  }, [allPrompts, selectedBlog]);

  // Dynamic SEO Metadata & JSON-LD (BlogPosting + FAQPage) for Blog Views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }

    if (selectedBlog) {
      const blogUrl = `${window.location.origin}/blog/${encodeURIComponent(selectedBlog.slug)}`;
      document.title = selectedBlog.metaTitle;
      if (metaDesc) metaDesc.setAttribute('content', selectedBlog.metaDescription);
      metaKeywords.setAttribute('content', selectedBlog.keywords.join(', '));
      if (ogTitle) ogTitle.setAttribute('content', selectedBlog.metaTitle);
      if (ogDesc) ogDesc.setAttribute('content', selectedBlog.metaDescription);
      if (ogUrl) ogUrl.setAttribute('content', blogUrl);
      if (twitterTitle) twitterTitle.setAttribute('content', selectedBlog.metaTitle);
      if (twitterDesc) twitterDesc.setAttribute('content', selectedBlog.metaDescription);
      if (canonicalLink) canonicalLink.setAttribute('href', blogUrl);

      // BlogPosting JSON-LD
      let blogScript = document.getElementById('jsonld-blog-schema') as HTMLScriptElement | null;
      if (!blogScript) {
        blogScript = document.createElement('script');
        blogScript.id = 'jsonld-blog-schema';
        blogScript.type = 'application/ld+json';
        document.head.appendChild(blogScript);
      }
      blogScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: selectedBlog.title,
        description: selectedBlog.metaDescription,
        image: [selectedBlog.coverImageUrl],
        datePublished: selectedBlog.publishedAt,
        dateModified: selectedBlog.publishedAt,
        keywords: selectedBlog.keywords.join(', '),
        articleSection: selectedBlog.categoryName,
        author: {
          '@type': 'Organization',
          name: selectedBlog.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Piktrio',
          url: window.location.origin,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': blogUrl,
        },
      });

      // FAQPage JSON-LD
      let faqScript = document.getElementById('jsonld-blog-faq-schema') as HTMLScriptElement | null;
      if (!faqScript) {
        faqScript = document.createElement('script');
        faqScript.id = 'jsonld-blog-faq-schema';
        faqScript.type = 'application/ld+json';
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: selectedBlog.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    } else {
      const blogIndexUrl = `${window.location.origin}/blog`;
      const indexTitle = 'AI Photo Editing Blog & Step-by-Step Prompt Guides – Piktrio';
      const indexDesc =
        'Read complete step-by-step AI photo editing guides, viral ChatGPT & Google Gemini prompt collections, and expert portrait creation tutorials on Piktrio Blog.';
      document.title = indexTitle;
      if (metaDesc) metaDesc.setAttribute('content', indexDesc);
      if (ogTitle) ogTitle.setAttribute('content', indexTitle);
      if (ogDesc) ogDesc.setAttribute('content', indexDesc);
      if (ogUrl) ogUrl.setAttribute('content', blogIndexUrl);
      if (twitterTitle) twitterTitle.setAttribute('content', indexTitle);
      if (twitterDesc) twitterDesc.setAttribute('content', indexDesc);
      if (canonicalLink) canonicalLink.setAttribute('href', blogIndexUrl);

      const oldBlogSchema = document.getElementById('jsonld-blog-schema');
      if (oldBlogSchema) oldBlogSchema.remove();
      const oldFaqSchema = document.getElementById('jsonld-blog-faq-schema');
      if (oldFaqSchema) oldFaqSchema.remove();
    }

    return () => {
      const s1 = document.getElementById('jsonld-blog-schema');
      if (s1) s1.remove();
      const s2 = document.getElementById('jsonld-blog-faq-schema');
      if (s2) s2.remove();
    };
  }, [selectedBlog]);

  const handleCopy = async (promptText: string, promptId: string) => {
    const ok = await copyToClipboard(promptText);
    if (ok) {
      setCopiedId(promptId);
      onCopyPrompt(promptText, promptId);
      setTimeout(() => {
        setCopiedId((curr) => (curr === promptId ? null : curr));
      }, 2400);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // 1. BLOG INDEX VIEW (/blog)
  if (!selectedBlog) {
    return (
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-300">
        {/* Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 bg-white hover:bg-zinc-900 hover:text-white border border-zinc-200 hover:border-zinc-900 transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <button onClick={onBackHome} className="hover:text-blue-600 font-medium cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="font-bold text-zinc-950">Blog</span>
          </div>
        </div>

        {/* Hero Intro */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 sm:p-10 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Piktrio SEO Blog &amp; Prompt Tutorials</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
            AI Photo Editing Guides &amp; Complete Prompt Blogs
          </h1>
          <p className="text-xs sm:text-base text-zinc-600 max-w-2xl mx-auto mt-3 leading-relaxed">
            In-depth category guides where every trending photo, one-click copy prompt, and step-by-step ChatGPT &amp; Google Gemini creation tutorial is organized on one page.
          </p>
        </div>

        {/* Top Natural Ads */}
        <div className="my-4 flex flex-col items-center gap-2.5">
          <AdBanner format="320x50" label="" className="my-0" />
          <AdBanner format="300x250" label="Sponsored Ad" className="my-0" />
          <AdBanner format="320x50" label="" className="my-0" />
        </div>

        {/* Blog Articles List */}
        <div className="grid grid-cols-1 gap-6 my-8">
          {blogs.map((blog) => {
            const count = allPrompts.filter((p) =>
              promptMatchesCategory(p, blog.categoryId)
            ).length;
            return (
              <article
                key={blog.id}
                className="bg-white rounded-3xl border border-zinc-200 hover:border-zinc-900 shadow-sm hover:shadow-xl transition-all overflow-hidden grid grid-cols-1 md:grid-cols-12"
              >
                <a
                  href={`/blog/${encodeURIComponent(blog.slug)}`}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      onSelectBlog(blog);
                    }
                  }}
                  className="md:col-span-5 bg-zinc-50 flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-zinc-200 no-underline"
                >
                  <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    style={{ objectFit: 'contain' }}
                    className="max-h-[300px] w-auto object-contain rounded-xl"
                  />
                </a>

                <div className="md:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-3 py-1 rounded-full bg-zinc-900 text-white font-bold">
                        {blog.categoryName} Guide
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                        {count} Prompts Included
                      </span>
                      <span className="text-zinc-500 inline-flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-zinc-950 leading-snug">
                      <a
                        href={`/blog/${encodeURIComponent(blog.slug)}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                            e.preventDefault();
                            onSelectBlog(blog);
                          }
                        }}
                        className="text-inherit hover:text-blue-600 transition-colors no-underline"
                      >
                        {blog.title}
                      </a>
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100">
                    <span className="text-xs text-zinc-500 inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Updated {blog.publishedAt}</span>
                    </span>

                    <a
                      href={`/blog/${encodeURIComponent(blog.slug)}`}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                          e.preventDefault();
                          onSelectBlog(blog);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold transition-colors no-underline shadow-sm"
                    >
                      <span>Read Full Blog &amp; Copy Prompts</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. INDIVIDUAL BLOG ARTICLE VIEW (/blog/:slug)
  return (
    <article className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectBlog(null)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 bg-white hover:bg-zinc-900 hover:text-white border border-zinc-200 hover:border-zinc-900 transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Blogs</span>
          </button>
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <span>Home</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <button onClick={onBackHome} className="hover:text-blue-600 font-medium cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onSelectBlog(null)}
            className="hover:text-blue-600 font-medium cursor-pointer"
          >
            Blog
          </button>
          <span>/</span>
          <span className="font-bold text-zinc-950">{selectedBlog.categoryName}</span>
        </div>
      </div>

      {/* Top Banners */}
      <div className="mb-5 flex flex-col items-center gap-2.5">
        <AdBanner format="320x50" label="" className="my-0" priorityPrimary />
        <AdBanner format="300x250" label="Sponsored Ad" className="my-0" />
        <AdBanner format="320x50" label="" className="my-0" />
      </div>

      {/* Article Header */}
      <header className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-5 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-bold inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{selectedBlog.categoryName} Category Complete Guide</span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            {categoryPrompts.length} Viral Prompts Inside
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            100% Free Copy &amp; Paste
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-950 leading-tight tracking-tight mb-4">
          {selectedBlog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pb-4 mb-5 border-b border-zinc-100">
          <span className="font-semibold text-zinc-800">By {selectedBlog.author}</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{selectedBlog.publishedAt}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{selectedBlog.readTime}</span>
          </span>
        </div>

        {/* SEO Intro Paragraphs */}
        <div className="space-y-3 text-sm sm:text-base text-zinc-700 leading-relaxed">
          {selectedBlog.introParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Quick Table of Contents */}
        {categoryPrompts.length > 0 && (
          <nav
            aria-label="Blog Table of Contents"
            className="mt-6 p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200"
          >
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-900 mb-3 flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-blue-600" />
              <span>Quick Jump: All {categoryPrompts.length} {selectedBlog.categoryName} Prompts in This Blog</span>
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {categoryPrompts.map((item, idx) => {
                const note = selectedBlog.perPromptNotes[item.id];
                return (
                  <li key={item.id}>
                    <a
                      href={`#blog-prompt-${idx + 1}`}
                      className="flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-zinc-900 hover:text-white border border-zinc-200 text-zinc-800 font-semibold transition-colors no-underline"
                    >
                      <span className="w-5 h-5 rounded-md bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{note?.headline || item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </header>

      {/* Main Repeating Pattern: Photo -> Copy Prompt Box -> Creation Steps -> Next Photo */}
      <div className="space-y-8">
        {categoryPrompts.map((item, idx) => {
          const note = selectedBlog.perPromptNotes[item.id];
          const isCopied = copiedId === item.id;
          const displayHeading = note?.headline || item.title;
          const displaySummary =
            note?.summary ||
            `${item.title} — Ultra-realistic 8K AI photo editing prompt for ChatGPT & Google Gemini with strict face identity and facial hair preservation.`;
          const displaySteps = note?.howToSteps || [
            'Click the Copy Prompt button directly below the preview image.',
            'Open ChatGPT (GPT-4o) or Google Gemini on your phone or computer.',
            'Upload a clear, front-facing solo photo of yourself as the face reference.',
            'Paste the copied prompt and press Send to generate your 8K portrait.',
          ];
          const displayTip =
            note?.proTip ||
            'Always upload a sharp, unedited photo in natural lighting so the AI preserves your real eyes, skin tone, beard, and mustache accurately.';

          return (
            <React.Fragment key={item.id}>
              <section
                id={`blog-prompt-${idx + 1}`}
                className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden p-5 sm:p-8 scroll-mt-24"
              >
                {/* Section Title */}
                <div className="mb-4 pb-3 border-b border-zinc-100">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-zinc-900 text-white text-xs font-extrabold">
                      Prompt #{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                      {selectedBlog.categoryName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-semibold">
                      {item.aspectRatio || '3:4 Vertical'}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-zinc-950 leading-snug">
                    {displayHeading}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">
                    {displaySummary}
                  </p>
                </div>

                {/* 1. 100% Uncropped Photo Preview */}
                <div className="mb-5">
                  <div className="w-full bg-zinc-50 rounded-2xl border border-zinc-200 p-3 sm:p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={`${displayHeading} – ${selectedBlog.categoryName} AI Photo Prompt Preview`}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          '/assets/aistudio/1000050956-removebg-preview_1d3a3740.png';
                      }}
                      style={{ objectFit: 'contain' }}
                      className="max-h-[500px] w-auto object-contain rounded-xl"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500 px-1">
                    <span>100% Uncropped Original Preview</span>
                    <button
                      type="button"
                      onClick={() => onSelectPrompt(item)}
                      className="text-blue-600 hover:underline font-semibold cursor-pointer"
                    >
                      Open Standalone Prompt Page &rarr;
                    </button>
                  </div>
                </div>

                {/* Small 320x50 Ad directly above the Prompt Box */}
                <div className="my-4 flex justify-center">
                  <AdBanner format="320x50" label="" className="my-0" />
                </div>

                {/* 2. Copy Prompt Box Directly Under the Photo */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Copy Full English AI Prompt</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.prompt, item.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-900 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-[#0d1326] text-slate-200 rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed border border-slate-800 max-h-60 overflow-y-auto shadow-inner">
                    <p className="whitespace-pre-wrap break-words">{item.prompt}</p>
                  </div>

                  {/* Direct Copy + AI Tool Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.prompt, item.id)}
                      className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-900 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{isCopied ? 'Prompt Copied!' : 'Copy Full Prompt'}</span>
                    </button>

                    <a
                      href="https://chatgpt.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl border border-zinc-200 bg-white hover:bg-emerald-50 hover:border-emerald-500/60 text-zinc-900 text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors no-underline shadow-xs"
                    >
                      <ChatGptIcon className="w-4 h-4 shrink-0" />
                      <span>Open in ChatGPT</span>
                    </a>

                    <a
                      href="https://gemini.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl border border-zinc-200 bg-white hover:bg-blue-50 hover:border-blue-500/60 text-zinc-900 text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors no-underline shadow-xs"
                    >
                      <GeminiIcon className="w-4 h-4 shrink-0" />
                      <span>Open in Gemini</span>
                    </a>
                  </div>
                </div>

                {/* Small 320x50 Ad directly below the Prompt Box */}
                <div className="mt-2 mb-5 flex justify-center">
                  <AdBanner format="320x50" label="" className="my-0" />
                </div>

                {/* 3. How to Create This Photo (Step-by-Step Creation Rules) */}
                <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4 sm:p-5 space-y-3">
                  <h3 className="text-sm sm:text-base font-extrabold text-zinc-950 flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>How to Create This Photo (Step-by-Step Guide)</span>
                  </h3>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    {displaySteps.map((step, stepIdx) => (
                      <li key={stepIdx}>{step}</li>
                    ))}
                  </ol>
                  <div className="pt-2 border-t border-zinc-200/80 flex items-start gap-2 text-xs text-zinc-700">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-zinc-950">Pro Tip:</strong> {displayTip}
                    </p>
                  </div>
                </div>
              </section>

              {/* One Large 300x250 Ad after every 2 photos */}
              {(idx + 1) % 2 === 0 && (
                <div className="my-4 flex justify-center">
                  <AdBanner format="300x250" label="Sponsored Ad" className="my-0" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Master Complete Tutorial Section */}
      <section className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-5 sm:p-8 mt-10">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-950 mb-2">
          Complete Tutorial: How to Generate {selectedBlog.categoryName} AI Photos in ChatGPT &amp; Gemini
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mb-5 leading-relaxed">
          Follow these five quick steps to transform any normal selfie into an ultra-realistic 8K {selectedBlog.categoryName} portrait while keeping your real identity intact.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedBlog.masterHowToSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3"
            >
              <span className="w-7 h-7 rounded-xl bg-zinc-900 text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                {step.stepNumber}
              </span>
              <div>
                <h3 className="text-sm font-bold text-zinc-950 mb-1">{step.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Natural Ad Break */}
      <div className="my-6 flex flex-col items-center gap-2.5">
        <AdBanner format="320x50" label="" className="my-0" />
        <AdBanner format="300x250" label="Sponsored Partner" className="my-0" />
        <AdBanner format="320x50" label="" className="my-0" />
      </div>

      {/* Rich Search-Friendly Keywords Section */}
      <section className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-5 sm:p-8 mt-6">
        <h2 className="text-base sm:text-lg font-black text-zinc-950 mb-2 flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600" />
          <span>Popular Search Keywords &amp; Related Topics</span>
        </h2>
        <p className="text-xs text-zinc-500 mb-4">
          Trending search queries covered in this {selectedBlog.categoryName} AI photo editing guide:
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedBlog.keywords.map((kw) => (
            <span
              key={kw}
              className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 text-xs font-semibold"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Blog FAQ Section (Matched 1:1 with FAQPage JSON-LD Schema) */}
      <section className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-5 sm:p-8 mt-8 mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-zinc-950 mb-2">
          Frequently Asked Questions ({selectedBlog.categoryName} AI Prompts)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 mb-5">
          Common questions about copying and generating {selectedBlog.categoryName} AI portraits with ChatGPT and Google Gemini.
        </p>

        <div className="space-y-3">
          {selectedBlog.faqs.map((faq, idx) => {
            const isOpen = openFaqIdx.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 overflow-hidden bg-zinc-50/50"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-sm font-bold text-zinc-950">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/60 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
};
