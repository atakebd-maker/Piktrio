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
  ExternalLink,
} from 'lucide-react';
import { PromptItem } from '../types/prompt';
import { copyToClipboard } from '../utils/clipboard';
import { PromptCard } from './PromptCard';

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
  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    document.title = `${prompt.title} - TS Prompt Store`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [prompt]);

  const relatedPrompts = allPrompts
    .filter((p) => p.category === prompt.category && p.id !== prompt.id)
    .slice(0, 4);

  const handleCopyPrompt = async () => {
    const success = await copyToClipboard(prompt.prompt);
    if (success) {
      onCopyPrompt(prompt.prompt, prompt.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Prompts</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 transition-colors cursor-pointer"
          title="Share prompt link"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Prompt Details Card */}
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden p-5 sm:p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Large Original Image Preview with NO Cropping */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full h-[400px] sm:h-[520px] bg-gray-950 rounded-2xl flex items-center justify-center p-3 overflow-hidden shadow-inner border border-gray-800 group">
              
              {/* Subtle background grid pattern */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:16px_16px]"
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
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900/90 text-white text-xs font-semibold hover:bg-blue-600 transition-colors backdrop-blur-md border border-gray-700 cursor-pointer shadow-lg"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Image Preview</span>
              </button>
            </div>

            <div className="w-full mt-2.5 flex items-center justify-between text-xs text-gray-400 px-1">
              <span>100% Uncropped &bull; Original Aspect Ratio</span>
              <button
                onClick={() => onOpenLightbox(prompt.imageUrl, prompt.title)}
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Zoom View
              </button>
            </div>
          </div>

          {/* RIGHT: Prompt Information, Copy, and AI Tools */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            
            {/* Category & Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {prompt.category}
                </span>
                {prompt.model && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {prompt.model}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-2">
                {prompt.title}
              </h1>

              <p className="text-sm text-gray-600 leading-relaxed">
                {prompt.description}
              </p>
            </div>

            {/* Complete English AI Prompt in High Contrast Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>English AI Generation Prompt</span>
                </label>
                <button
                  onClick={handleCopyPrompt}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="relative bg-gray-900 text-gray-100 rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed border border-gray-800 shadow-md selection:bg-blue-600">
                <p className="whitespace-pre-wrap select-all">{prompt.prompt}</p>
              </div>
            </div>

            {/* Action Buttons: Copy Full Prompt, ChatGPT, Gemini */}
            <div className="space-y-3 pt-2">
              {/* Copy Full Prompt Button */}
              <button
                onClick={handleCopyPrompt}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-[0.99]'
                }`}
              >
                {copied ? (
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

              {/* Open in ChatGPT and Open in Gemini */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleOpenChatGPT}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 text-gray-800 hover:text-emerald-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-emerald-600" />
                  <span>Open in ChatGPT</span>
                </button>

                <button
                  onClick={handleOpenGemini}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 text-gray-800 hover:text-blue-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Open in Gemini</span>
                </button>
              </div>
            </div>

            {/* Tags (if any) */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-gray-400 block mb-1.5">Tags & Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Related Prompts Section (Matching 2-column mobile / 4-column desktop gallery) */}
      {relatedPrompts.length > 0 && (
        <section className="mt-8 mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
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
