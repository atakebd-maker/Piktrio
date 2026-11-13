import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Bot,
  Layers,
  Share2,
  CheckCircle2,
  Clock,
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

  // Reset countdown if switching between prompts
  useEffect(() => {
    setCopyStatus('idle');
    setCountdown(7);
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
    document.title = `${prompt.title} - Piktrio`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic SEO description for Google indexing
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${prompt.title}. Learn how to create this AI photo using ChatGPT & Gemini.`);
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
        ', Jailer 2 AI Photo Prompt, Boys AI Photo, ChatGPT prompt, Gemini AI Prompt, AI photo editing'
    );

    // Schema.org Structured Data for Google Rich Snippets & Indexing
    let scriptTag = document.getElementById('jsonld-prompt-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-prompt-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    const resolvedImageUrl = prompt.imageUrl.startsWith('http')
      ? prompt.imageUrl
      : `${window.location.origin}${prompt.imageUrl.startsWith('/') ? '' : '/'}${prompt.imageUrl}`;

    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: prompt.title,
      image: [resolvedImageUrl],
      description: prompt.description ? prompt.description.slice(0, 200) : prompt.title,
      articleBody: prompt.prompt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${window.location.origin}/prompt/${encodeURIComponent(prompt.id)}`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Piktrio',
        url: window.location.origin,
      },
    });

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `${window.location.origin}/prompt/${encodeURIComponent(prompt.id)}`);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `${window.location.origin}/prompt/${encodeURIComponent(prompt.id)}`);
    }

    return () => {
      const el = document.getElementById('jsonld-prompt-schema');
      if (el) el.remove();
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `${window.location.origin}/`);
      }
    };
  }, [prompt]);

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
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Prompts</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer shadow-xs"
          title="Share prompt link"
        >
          <Share2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Prompt Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-5 sm:p-8 mb-12">
        {/* Title Header placed ABOVE the photo and content as requested */}
        <div className="mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {prompt.category}
            </span>
            {prompt.model && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 shadow-2xs">
                <ChatGptIcon className="w-3.5 h-3.5 text-[#10a37f] shrink-0" />
                <GeminiIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{prompt.model}</span>
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-snug tracking-tight">
            {prompt.title}
          </h1>
          {prompt.description && !prompt.description.startsWith('#') && (
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              {prompt.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Large Original Image Preview in Showcase Frame */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Ad on top of the image (as requested) */}
            <AdBanner label="Sponsored Ad" className="mb-3" />

            <div className="relative w-full min-h-[420px] sm:min-h-[560px] max-h-[78vh] bg-slate-100 rounded-2xl sm:rounded-3xl flex items-center justify-center p-3 overflow-hidden shadow-inner border border-slate-200 group">
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

            <div className="w-full mt-2.5 flex items-center justify-center text-xs text-slate-400 px-1">
              <span>100% Uncropped &bull; Original Aspect Ratio</span>
            </div>
          </div>

          {/* RIGHT: Prompt Information, Copy, and AI Tools */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            
            {/* Ad above prompt box */}
            <AdBanner format="300x250" label="Sponsored Ad" className="my-2" />

            {/* English AI Generation Prompt Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>English AI Generation Prompt</span>
                </label>
                <button
                  onClick={handleCopyButtonClick}
                  className={`text-xs font-semibold transition-colors cursor-pointer ${
                    copyStatus === 'ready' || copyStatus === 'copied'
                      ? 'text-emerald-600 hover:text-emerald-700 font-bold'
                      : copyStatus === 'counting'
                      ? 'text-amber-600 font-bold'
                      : 'text-blue-600 hover:text-blue-700'
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

              <div className="relative bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed border border-slate-800 shadow-md max-h-64 overflow-y-auto">
                <p className="text-slate-200 whitespace-pre-wrap break-words leading-relaxed">
                  {prompt.prompt}
                </p>
              </div>
            </div>

            {/* Action Buttons: 7-Second Countdown & Green Click to Copy Now */}
            <div className="space-y-3 pt-2">
              {/* Copy Full Prompt Button */}
              <button
                onClick={handleCopyButtonClick}
                disabled={copyStatus === 'counting'}
                className={`w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer ${
                  copyStatus === 'counting'
                    ? 'bg-amber-500 text-white cursor-wait opacity-95 shadow-amber-500/20'
                    : copyStatus === 'ready'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-400/50 active:scale-[0.99] font-extrabold animate-pulse'
                    : copyStatus === 'copied'
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 active:scale-[0.99]'
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
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div
                    className="bg-amber-500 h-full transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((7 - countdown) / 7) * 100}%` }}
                  />
                </div>
              )}

              {/* 300x250 AdBanner placed directly below Copy Full Prompt button as requested */}
              <div className="w-full flex justify-center my-3">
                <AdBanner format="300x250" label="Sponsored Partner" className="my-1" />
              </div>

              {/* Open in ChatGPT and Open in Gemini (Opens tool website directly without prefilling query) */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://chatgpt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-300 text-slate-800 hover:text-emerald-700 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs no-underline"
                >
                  <ChatGptIcon className="w-4 h-4 text-[#10a37f] shrink-0" />
                  <span>Open in ChatGPT</span>
                </a>

                <a
                  href="https://gemini.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-800 hover:text-blue-700 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs no-underline"
                >
                  <GeminiIcon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Open in Gemini</span>
                </a>
              </div>
            </div>

            {/* Tags (if any) */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-500 block mb-1.5">Tags &amp; Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Guide / Description rendered directly below the Copy Prompt Button */}
            {prompt.description && (
              <div className="pt-5 border-t border-slate-200">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-2 mb-3 leading-snug" {...props} />,
                      h2: ({ node, ...props }) => <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-6 mb-2.5 pb-1 border-b border-slate-200" {...props} />,
                      h3: ({ node, ...props }) => <h4 className="text-sm sm:text-base font-semibold text-blue-800 mt-4 mb-1.5" {...props} />,
                      p: ({ node, ...props }) => <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 mb-4" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 mb-4" {...props} />,
                      li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                    }}
                  >
                    {prompt.description}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Ad at the end of the post guide */}
            <AdBanner format="300x250" label="Sponsored Partner" className="mt-6 mb-2" />

          </div>

        </div>
      </div>

      {/* Related Prompts Section (Matching 2-column mobile / 4-column desktop gallery) */}
      {relatedPrompts.length > 0 && (
        <section className="mt-8 mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Related {prompt.category} Prompts</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {relatedPrompts.map((related) => (
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
        </section>
      )}

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-gray-900 text-white text-xs font-medium shadow-xl flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Prompt link copied to clipboard!</span>
        </div>
      )}

    </div>
  );
};
