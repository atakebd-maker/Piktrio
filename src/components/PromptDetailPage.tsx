import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Bot,
  Layers,
  Share2,
  Maximize2,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { PromptItem } from '../types/prompt';
import { copyToClipboard } from '../utils/clipboard';
import { PromptCard } from './PromptCard';
import { AdBanner } from './AdBanner';
import ReactMarkdown from 'react-markdown';

interface PromptDetailPageProps {
  prompt: PromptItem;
  onBack: () => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
  onCopyPrompt: (promptText: string, promptId: string) => void;
  onSelectPrompt: (prompt: PromptItem) => void;
  allPrompts: PromptItem[];
}

export const PromptDetailPage: React.FC<PromptDetailPageProps> = ({
  prompt,
  onBack,
  onOpenLightbox,
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
        '@id': `${window.location.origin}/?prompt=${prompt.id}`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Piktrio',
        url: window.location.origin,
      },
    });

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `${window.location.origin}/?prompt=${prompt.id}`);
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


  const handleOpenChatGPT = () => {
    const url = `https://chatgpt.com/?q=${encodeURIComponent(prompt.prompt)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenGemini = () => {
    const url = `https://gemini.google.com/?q=${encodeURIComponent(prompt.prompt)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#21163e]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-200 bg-[#140e2e] hover:bg-[#1f1544] hover:text-pink-400 border border-[#2a1c50] hover:border-pink-500/50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Prompts</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-[#140e2e] hover:bg-[#1f1544] border border-[#2a1c50] transition-colors cursor-pointer"
          title="Share prompt link"
        >
          <Share2 className="w-3.5 h-3.5 text-pink-400" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Prompt Details Card */}
      <div className="bg-[#120c29] rounded-3xl border border-[#271a4f] shadow-2xl overflow-hidden p-5 sm:p-8 mb-12">
        {/* Title Header placed ABOVE the photo and content as requested */}
        <div className="mb-6 pb-4 border-b border-[#21153f]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/40 text-purple-300 border border-purple-700/50">
              {prompt.category}
            </span>
            {prompt.model && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                {prompt.model}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug tracking-tight">
            {prompt.title}
          </h1>
          {prompt.description && !prompt.description.startsWith('#') && (
            <p className="text-sm text-gray-300 leading-relaxed mt-2">
              {prompt.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Large Original Image Preview in Showcase Frame */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Ad on top of the image (as requested: "ছবির উপরে মানে যেকোনো পোস্ট ওপেন করলে ছবিটির উপরে") */}
            <AdBanner label="Sponsored Ad" className="mb-3" />

            <div className="relative w-full min-h-[420px] sm:min-h-[560px] max-h-[78vh] bg-[#080514] rounded-2xl sm:rounded-3xl flex items-center justify-center p-3 overflow-hidden shadow-inner border border-[#231542] group">
              
              {/* Subtle background grid pattern */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]"
              />

              <img
                src={prompt.imageUrl}
                alt={prompt.title}
                style={{ objectFit: 'contain' }}
                className="max-w-full max-h-full w-auto h-auto object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
                onClick={() => onOpenLightbox(prompt.imageUrl, prompt.title)}
              />

              {/* Lightbox Fullscreen Trigger */}
              <button
                onClick={() => onOpenLightbox(prompt.imageUrl, prompt.title)}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/80 text-white text-xs font-semibold hover:bg-pink-600 transition-colors backdrop-blur-md border border-white/20 cursor-pointer shadow-lg"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Image Preview</span>
              </button>
            </div>

            <div className="w-full mt-2.5 flex items-center justify-between text-xs text-gray-400 px-1">
              <span>100% Uncropped &bull; Original Aspect Ratio</span>
              <button
                onClick={() => onOpenLightbox(prompt.imageUrl, prompt.title)}
                className="text-pink-400 hover:underline font-medium cursor-pointer"
              >
                Zoom View
              </button>
            </div>
          </div>

          {/* RIGHT: Prompt Information, Copy, and AI Tools */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            
            {/* Ad above prompt box (as requested: "তারপরে prompt বক্সটির উপরে") */}
            <AdBanner label="Advertisement" className="my-1" />

            {/* Complete English AI Prompt in High Contrast Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>English AI Generation Prompt</span>
                </label>
                <button
                  onClick={handleCopyButtonClick}
                  className={`text-xs font-semibold transition-colors cursor-pointer ${
                    copyStatus === 'ready' || copyStatus === 'copied'
                      ? 'text-emerald-400 hover:text-emerald-300 font-bold'
                      : copyStatus === 'counting'
                      ? 'text-amber-400 font-bold'
                      : 'text-purple-400 hover:text-purple-300'
                  }`}
                >
                  {copyStatus === 'counting'
                    ? `Wait ${countdown}s...`
                    : copyStatus === 'ready'
                    ? 'Click to Copy Now'
                    : copyStatus === 'copied'
                    ? 'Copied!'
                    : 'Copy'}
                </button>
              </div>

              <div className="relative bg-[#090518] text-purple-100/90 rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed border border-[#2b1b50] shadow-md selection:bg-purple-600">
                <p className="whitespace-pre-wrap select-all">{prompt.prompt}</p>
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
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-pink-500/30 active:scale-[0.99]'
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
                <div className="w-full bg-[#181035] rounded-full h-2 overflow-hidden border border-[#2a1c4f]">
                  <div
                    className="bg-amber-400 h-full transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((7 - countdown) / 7) * 100}%` }}
                  />
                </div>
              )}

              {/* Open in ChatGPT and Open in Gemini */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleOpenChatGPT}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#2b1c52] bg-[#140e2d] hover:bg-[#1e1542] hover:border-emerald-500/50 text-gray-200 hover:text-emerald-400 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>Open in ChatGPT</span>
                </button>

                <button
                  onClick={handleOpenGemini}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#2b1c52] bg-[#140e2d] hover:bg-[#1e1542] hover:border-pink-500/50 text-gray-200 hover:text-pink-300 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>Open in Gemini</span>
                </button>
              </div>
            </div>

            {/* Tags (if any) */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-gray-400 block mb-1.5">Tags &amp; Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-[#160f33] text-purple-300 text-xs font-medium border border-[#2b1c52]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Guide / Description rendered directly below the Copy Prompt Button */}
            {prompt.description && (
              <div className="pt-5 border-t border-[#231542]">
                <div className="bg-[#0e0921] rounded-2xl p-5 sm:p-6 border border-[#241748]">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h2 className="text-lg sm:text-xl font-black text-white mt-2 mb-3 leading-snug" {...props} />,
                      h2: ({ node, ...props }) => <h3 className="text-base sm:text-lg font-bold text-white mt-6 mb-2.5 pb-1 border-b border-[#2b1b50]" {...props} />,
                      h3: ({ node, ...props }) => <h4 className="text-sm sm:text-base font-semibold text-purple-200 mt-4 mb-1.5" {...props} />,
                      p: ({ node, ...props }) => <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3.5" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-300 mb-4" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-gray-300 mb-4" {...props} />,
                      li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                    }}
                  >
                    {prompt.description}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Ad at the end of the post guide (as requested: "এবং শেষে") */}
            <AdBanner label="Sponsored Link" className="mt-6 mb-2" />

          </div>

        </div>
      </div>

      {/* Related Prompts Section (Matching 2-column mobile / 4-column desktop gallery) */}
      {relatedPrompts.length > 0 && (
        <section className="mt-8 mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#21163e]">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-pink-400" />
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
