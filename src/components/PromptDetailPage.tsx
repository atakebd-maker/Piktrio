import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Layers,
  Share2,
  CheckCircle2,
  Clock,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { PromptItem } from '../types/prompt';
import { copyToClipboard } from '../utils/clipboard';
import { PromptCard } from './PromptCard';
import { AdBanner } from './AdBanner';
import { ChatGptIcon, GeminiIcon } from './AiIcons';
import ReactMarkdown from 'react-markdown';

interface PromptDetailPageProps {
  prompt: PromptItem;
  onBack: () => void;
  onCopyPrompt: (promptText: string, promptId: string) => void;
  onSelectPrompt: (prompt: PromptItem) => void;
  allPrompts: PromptItem[];
}

export const PromptDetailPage: React.FC<PromptDetailPageProps> = ({
  prompt,
  onBack,
  onCopyPrompt,
  onSelectPrompt,
  allPrompts,
}) => {
  // Copy state: 'idle' -> 'counting' (7s countdown) -> 'ready' ("Click to Copy Now" in green) -> 'copied'
  type CopyStatus = 'idle' | 'counting' | 'ready' | 'copied';
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const [countdown, setCountdown] = useState<number>(7);
  const [shareToast, setShareToast] = useState(false);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const promptFaqs = useMemo(() => {
    const modelLabel = prompt.model || 'ChatGPT (GPT-4o) & Google Gemini';
    const ratioLabel = prompt.aspectRatio || '3:4 vertical portrait';
    const topTags = prompt.tags?.slice(0, 4).join(', ') || prompt.category;

    return [
      {
        question: `How do I create the "${prompt.title}" AI photo in ChatGPT or Google Gemini?`,
        answer: `Copy the full "${prompt.title}" prompt on this page using the Copy Full Prompt button, open ${modelLabel}, upload a clear front-facing photo of yourself, paste the prompt below your image, and send to generate your 8K portrait.`,
      },
      {
        question: `Will my real face, beard, or mustache stay unchanged when using this ${prompt.category} prompt?`,
        answer: `Yes. Every Piktrio prompt includes Strict Face Identity and Natural Facial Hair Preservation rules. When you upload your reference photo, ${modelLabel} matches your exact facial bone structure, skin tone, beard, and mustache without substituting a generic face.`,
      },
      {
        question: `Is the "${prompt.title}" AI photo editing prompt free to use?`,
        answer: `Yes, this ${prompt.category} prompt is 100% free to copy, customize, and use in ChatGPT, Google Gemini, or compatible AI image generators with zero watermarks.`,
      },
      {
        question: `What aspect ratio, camera quality, and tags are used in this prompt?`,
        answer: `This prompt is tuned for ${ratioLabel} framing with 8K photorealistic lighting, DSLR depth of field, and ${topTags} styling.`,
      },
      {
        question: `Can I generate "${prompt.title}" on my Android phone or iPhone?`,
        answer: `Yes! Tap Copy Full Prompt on your mobile phone, then tap Open in ChatGPT or Open in Gemini directly below the prompt box to paste and generate your photo in under 30 seconds.`,
      },
    ];
  }, [prompt]);

  const toggleFaqIndex = (idx: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Reset countdown if switching between prompts
  useEffect(() => {
    setCopyStatus('idle');
    setCountdown(7);
    setOpenFaqIndices([0]);
  }, [prompt.id]);

  // 7-second countdown timer
  useEffect(() => {
    if (copyStatus !== 'counting') return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown finished -> Show green "Click to Copy Now"
      setCopyStatus('ready');
    }
  }, [copyStatus, countdown]);

  const handleCopyButtonClick = () => {
    if (copyStatus === 'idle') {
      // Start 7-second countdown
      setCountdown(7);
      setCopyStatus('counting');
    } else if (copyStatus === 'ready' || copyStatus === 'copied') {
      // User clicked "Click to Copy Now" -> Copy immediately!
      executeCopy();
    }
  };

  const executeCopy = async () => {
    const success = await copyToClipboard(prompt.prompt);
    if (success) {
      onCopyPrompt(prompt.prompt, prompt.id);
      setCopyStatus('copied');
      setTimeout(() => {
        // Keep in green "ready" state so user can re-copy anytime without another countdown
        setCopyStatus('ready');
      }, 2500);
    }
  };


  useEffect(() => {
    const pageTitle = `${prompt.title} – Piktrio`;
    const pageDesc = `${prompt.title}. Copy this free ${prompt.category} AI photo editing prompt and learn how to create it using ChatGPT & Google Gemini.`;
    const pageUrl = `${window.location.origin}/prompt/${encodeURIComponent(prompt.id)}`;

    document.title = pageTitle;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic SEO description for Google indexing
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDesc);
    }

    // Dynamic SEO keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      (prompt.tags?.join(', ') || '') +
        `, ${prompt.category} AI Photo Prompt, ChatGPT prompt, Gemini AI Prompt, AI photo editing`
    );

    const resolvedImageUrl = prompt.imageUrl.startsWith('http')
      ? prompt.imageUrl
      : `${window.location.origin}${prompt.imageUrl.startsWith('/') ? '' : '/'}${prompt.imageUrl}`;

    // Social OpenGraph & Twitter Cards
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', pageDesc);
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', resolvedImageUrl);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', pageDesc);
    const twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (twitterImg) twitterImg.setAttribute('content', resolvedImageUrl);

    // Schema.org Article Structured Data
    let scriptTag = document.getElementById('jsonld-prompt-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-prompt-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: prompt.title,
      image: [resolvedImageUrl],
      description: prompt.description ? prompt.description.slice(0, 200) : pageDesc,
      articleBody: prompt.prompt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Piktrio',
        url: window.location.origin,
      },
    });

    // Schema.org FAQPage Structured Data for query-based search visibility
    let faqScriptTag = document.getElementById('jsonld-prompt-faq-schema') as HTMLScriptElement | null;
    if (!faqScriptTag) {
      faqScriptTag = document.createElement('script');
      faqScriptTag.id = 'jsonld-prompt-faq-schema';
      faqScriptTag.type = 'application/ld+json';
      document.head.appendChild(faqScriptTag);
    }

    faqScriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: promptFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', pageUrl);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', pageUrl);
    }

    return () => {
      const el = document.getElementById('jsonld-prompt-schema');
      if (el) el.remove();
      const faqEl = document.getElementById('jsonld-prompt-faq-schema');
      if (faqEl) faqEl.remove();
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `${window.location.origin}/`);
      }
    };
  }, [prompt, promptFaqs]);

  const relatedPrompts = allPrompts
    .filter((p) => p.category === prompt.category && p.id !== prompt.id)
    .slice(0, 4);




  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: prompt.title,
        text: prompt.prompt,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 bg-white hover:bg-zinc-900 hover:text-white border border-zinc-200 hover:border-zinc-900 transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Prompts</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-900 bg-white hover:bg-blue-600 hover:text-white border border-zinc-200 hover:border-blue-600 transition-colors cursor-pointer shadow-xs"
          title="Share prompt link"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Top-of-Post Natural Banners */}
      <div className="mb-5 flex flex-col items-center justify-center gap-2">
        <AdBanner format="320x50" label="" className="my-0" priorityPrimary />
        <AdBanner format="300x250" label="Sponsored Ad" className="my-1" />
      </div>

      {/* Main Prompt Details Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-900/5 overflow-hidden p-5 sm:p-8 mb-12">
        {/* Title Header placed ABOVE the photo and content as requested */}
        <div className="mb-6 pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-white">
              {prompt.category}
            </span>
            {prompt.model && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-50 text-zinc-800 border border-zinc-200 flex items-center gap-1.5 shadow-2xs">
                <ChatGptIcon className="w-3.5 h-3.5 shrink-0" />
                <GeminiIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{prompt.model}</span>
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-950 leading-snug tracking-tight">
            {prompt.title}
          </h1>
          {prompt.description && !prompt.description.startsWith('#') && (
            <p className="text-sm text-zinc-600 leading-relaxed mt-2">
              {prompt.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Large Original Image Preview in Showcase Frame */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Ad on top of the image (as requested) */}
            <AdBanner label="Sponsored Ad" className="mb-3" />

            <div className="relative w-full min-h-[420px] sm:min-h-[560px] max-h-[78vh] bg-zinc-50 rounded-2xl sm:rounded-3xl flex items-center justify-center p-3 overflow-hidden shadow-inner border border-zinc-200 group">
              <img
                src={prompt.imageUrl}
                alt={prompt.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/1000050956-removebg-preview_1d3a3740.png';
                }}
                style={{ objectFit: 'contain' }}
                className="max-w-full max-h-full w-auto h-auto object-contain select-none"
              />
            </div>

            <div className="w-full mt-2.5 flex items-center justify-center text-xs text-zinc-500 px-1">
              <span>100% Uncropped &bull; Original Aspect Ratio</span>
            </div>

            {/* Ads below main preview image (One of Each) */}
            <div className="w-full flex flex-col items-center gap-2.5 mt-4">
              <AdBanner format="320x50" label="" className="my-0" />
              <AdBanner format="300x250" label="Sponsored Partner" className="my-0" />
            </div>
          </div>

          {/* RIGHT: Prompt Information, Copy, and AI Tools */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            
            {/* Three Ads above prompt box (2x 300x250 + 1x 320x50) */}
            <div className="w-full flex flex-col items-center justify-center gap-2 my-1">
              <AdBanner format="300x250" label="Sponsored Ad" className="my-1" />
              <AdBanner format="300x250" label="Sponsored Partner" className="my-1" />
              <AdBanner format="320x50" label="" className="my-1" />
            </div>

            {/* English AI Generation Prompt Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>English AI Generation Prompt</span>
                </label>
                <button
                  onClick={handleCopyButtonClick}
                  className={`text-xs font-semibold transition-colors cursor-pointer ${
                    copyStatus === 'ready' || copyStatus === 'copied'
                      ? 'text-emerald-600 underline font-bold'
                      : copyStatus === 'counting'
                      ? 'text-amber-600 font-bold'
                      : 'text-blue-600 hover:underline'
                  }`}
                >
                  {copyStatus === 'counting'
                    ? `Wait ${countdown}s...`
                    : copyStatus === 'ready'
                    ? 'Click to Copy Now'
                    : copyStatus === 'copied'
                    ? 'Copied!'
                    : 'Copy Full'}
                </button>
              </div>

              <div className="relative bg-[#0d1326] text-slate-100 rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed border border-slate-800 shadow-lg max-h-64 overflow-y-auto">
                <p className="text-slate-200 whitespace-pre-wrap break-words leading-relaxed">
                  {prompt.prompt}
                </p>
              </div>
            </div>

            {/* Slim 320x50 Ad directly below prompt box */}
            <AdBanner format="320x50" label="" className="my-1" />

            {/* Action Buttons: 7-Second Countdown & Emerald Ready Copy Now */}
            <div className="space-y-3 pt-2">
              {/* Copy Full Prompt Button */}
              <button
                onClick={handleCopyButtonClick}
                disabled={copyStatus === 'counting'}
                className={`w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer ${
                  copyStatus === 'counting'
                    ? 'bg-amber-500 text-white cursor-wait opacity-95'
                    : copyStatus === 'ready'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 ring-4 ring-emerald-500/20 active:scale-[0.99] font-extrabold animate-pulse'
                    : copyStatus === 'copied'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-zinc-900 hover:bg-blue-600 text-white active:scale-[0.99]'
                }`}
              >
                {copyStatus === 'counting' ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    <span>Please wait {countdown}s to copy...</span>
                  </>
                ) : copyStatus === 'ready' ? (
                  <>
                    <Copy className="w-5 h-5" />
                    <span className="tracking-wide">Click to Copy Now</span>
                  </>
                ) : copyStatus === 'copied' ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" />
                    <span>Prompt Copied Successfully!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy Full Prompt</span>
                  </>
                )}
              </button>

              {/* Progress bar during 7-second countdown */}
              {copyStatus === 'counting' && (
                <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden border border-zinc-200">
                  <div
                    className="bg-amber-500 h-full transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((7 - countdown) / 7) * 100}%` }}
                  />
                </div>
              )}

              {/* Two 300x250 AdBanners placed below the prompt box & copy button as requested */}
              <div className="w-full flex flex-col items-center justify-center gap-3 my-3">
                <AdBanner format="300x250" label="Sponsored Partner" className="my-1" />
                <AdBanner format="300x250" label="Sponsored Ad" className="my-1" />
              </div>

              {/* Open in ChatGPT and Open in Gemini (Opens tool website directly without prefilling query) */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://chatgpt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-200 bg-white hover:bg-emerald-50 hover:border-emerald-500/60 text-zinc-900 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs no-underline"
                >
                  <ChatGptIcon className="w-4 h-4 shrink-0" />
                  <span>Open in ChatGPT</span>
                </a>

                <a
                  href="https://gemini.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-200 bg-white hover:bg-blue-50 hover:border-blue-500/60 text-zinc-900 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs no-underline"
                >
                  <GeminiIcon className="w-4 h-4 shrink-0" />
                  <span>Open in Gemini</span>
                </a>
              </div>
            </div>

            {/* Tags (if any) */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-zinc-500 block mb-1.5">Tags &amp; Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Natural Ads before the Tutorial Guide */}
            <div className="w-full flex flex-col items-center justify-center gap-2 pt-2">
              <AdBanner format="320x50" label="" className="my-0" />
              <AdBanner format="300x250" label="Sponsored Partner" className="my-1" />
            </div>

            {/* Complete Guide / Description with Natural In-Article Ads between sections */}
            {prompt.description && (
              <div className="pt-5 border-t border-zinc-200">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200 shadow-xs space-y-5">
                  {prompt.description
                    .split(/\r?\n---\r?\n/)
                    .map((section) => section.trim())
                    .filter(Boolean)
                    .map((section, idx, arr) => (
                      <React.Fragment key={idx}>
                        <ReactMarkdown
                          components={{
                            h1: ({ node, ...props }) => <h2 className="text-lg sm:text-xl font-black text-zinc-950 mt-1 mb-3 leading-snug" {...props} />,
                            h2: ({ node, ...props }) => <h3 className="text-base sm:text-lg font-bold text-zinc-950 mt-3 mb-2.5 pb-1 border-b border-zinc-200" {...props} />,
                            h3: ({ node, ...props }) => <h4 className="text-sm sm:text-base font-semibold text-blue-700 mt-3 mb-1.5" {...props} />,
                            p: ({ node, ...props }) => <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-3" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-zinc-600 mb-3" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-zinc-600 mb-3" {...props} />,
                            li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-bold text-zinc-950" {...props} />,
                          }}
                        >
                          {section}
                        </ReactMarkdown>

                        {idx < arr.length - 1 && (
                          <div className="py-2 border-y border-zinc-200 flex flex-col items-center gap-2">
                            <AdBanner
                              format={idx % 2 === 0 ? '300x250' : '320x50'}
                              label={idx % 2 === 0 ? 'Advertisement' : ''}
                              className="my-0"
                            />
                            {idx === 0 && (
                              <AdBanner format="320x50" label="" className="my-0" />
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            )}

            {/* Ad at the end of the post guide */}
            <div className="w-full flex flex-col items-center gap-2 mt-4 mb-2">
              <AdBanner format="300x250" label="Sponsored Partner" className="my-1" />
              <AdBanner format="320x50" label="" className="my-0" />
            </div>

          </div>

        </div>
      </div>

      {/* Prompt-Specific FAQ Section (Matched 1:1 with FAQPage JSON-LD Schema) */}
      <section
        aria-label="Prompt Frequently Asked Questions"
        className="bg-white rounded-3xl border border-zinc-200 shadow-xs p-5 sm:p-7 mb-8"
      >
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-black text-zinc-950 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Quick answers for creating this {prompt.category} AI photo prompt in ChatGPT &amp; Google Gemini.
          </p>
        </div>

        <div className="space-y-2.5">
          {promptFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.includes(idx);
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 overflow-hidden bg-zinc-50/50"
              >
                <button
                  type="button"
                  onClick={() => toggleFaqIndex(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-zinc-950 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/70 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Mid-Page Sponsored Break before Related Prompts */}
      <div className="my-6 flex flex-col items-center justify-center gap-2.5">
        <AdBanner format="300x250" label="Sponsored Links" className="my-0" />
        <AdBanner format="320x50" label="" className="my-0" />
      </div>

      {/* Related Prompts Section (Matching 2-column mobile / 4-column desktop gallery) */}
      {relatedPrompts.length > 0 && (
        <section className="mt-8 mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-200">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-950 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Related {prompt.category} Prompts</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {relatedPrompts.slice(0, 2).map((related) => (
              <PromptCard
                key={related.id}
                prompt={related}
                onViewDetails={(p) => {
                  onSelectPrompt(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onCopyPrompt={onCopyPrompt}
              />
            ))}
          </div>

          {relatedPrompts.length > 2 && (
            <>
              <div className="my-4 flex flex-col items-center gap-2">
                <AdBanner format="320x50" label="" className="my-0" />
                <AdBanner format="300x250" label="Sponsored Ad" className="my-0" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {relatedPrompts.slice(2).map((related) => (
                  <PromptCard
                    key={related.id}
                    prompt={related}
                    onViewDetails={(p) => {
                      onSelectPrompt(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onCopyPrompt={onCopyPrompt}
                  />
                ))}
              </div>
            </>
          )}

          <div className="mt-6 mb-2 flex flex-col items-center gap-3">
            <AdBanner format="300x250" label="Sponsored Partner" className="my-1" />
            <AdBanner format="320x50" label="Sponsored Links" className="my-1" />
          </div>
        </section>
      )}

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-medium shadow-xl border border-zinc-700 flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Prompt link copied to clipboard!</span>
        </div>
      )}

    </div>
  );
};
