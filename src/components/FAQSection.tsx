import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

export const FAQS_DATA: FAQItem[] = [
  {
    question: 'How do I use these AI photo editing prompts in ChatGPT and Google Gemini?',
    answer: 'Using Piktrio prompts is completely free and easy: 1) Click on any photo to open its prompt details. 2) Click the "Copy Full Prompt" button to copy the prompt with strict face identity rules. 3) Open ChatGPT (GPT-4o) or Google Gemini on your phone or PC. 4) Upload your personal face reference photograph and paste the copied prompt into the message box. 5) Press send to generate your 8K ultra-realistic cinematic portrait with your real face preserved.',
    keywords: ['ChatGPT AI Photo Editing', 'Google Gemini Prompts', 'Copy Paste AI Prompt', 'Face Photo Upload', '8K Realistic Portrait'],
  },
  {
    question: 'How does 100% Face Identity and Facial Hair Preservation work?',
    answer: 'Every prompt on Piktrio includes our specialized "Strict Face Identity & Natural Facial Hair Preservation" instructions. When you upload your reference photo alongside our prompt, ChatGPT and Google Gemini lock your real bone structure, forehead, eyes, eyebrows, nose, lips, jawline, and natural skin tone. If you have a natural beard or moustache, the AI maintains its exact density and style; if clean-shaven, it stays clean-shaven without generic model distortion.',
    keywords: ['Face Identity Lock', 'Beard & Moustache Preservation', 'Natural Skin Tone', 'No Generic Face', 'Facial Structure Reference'],
  },
  {
    question: 'What trending AI photo prompt styles are available on Piktrio?',
    answer: 'Piktrio features the most popular trending categories for boys and men, including: Mahindra Thar SUV automotive photoshoots, Korean messy hair wildflower hillside aesthetic, Royal Diwali ethnic kurta and sherwani palace celebrations, vintage retro golden-hour portraits, neon cyberpunk digital glitch art, editorial magazine covers, and romantic roses shadow portraits.',
    keywords: ['Mahindra Thar AI Photo', 'Boys AI Photo Prompts', 'Royal Diwali Kurta Prompt', 'Korean Hair Aesthetic', 'Cyberpunk Neon Portrait'],
  },
  {
    question: 'Are all AI prompts on Piktrio free to copy and use?',
    answer: 'Yes, 100% of all prompts on Piktrio are completely free to copy, modify, and use for personal or social media content creation. You can copy the exact prompt with a single click, open it directly in ChatGPT or Google Gemini, and generate unlimited high-resolution photos without watermarks.',
    keywords: ['Free AI Prompts', 'No Watermark AI Photos', 'Instant Copy Prompt', 'ChatGPT Free Prompt', 'Gemini AI Free'],
  },
  {
    question: 'How do I get ultra-realistic 8K DSLR camera quality with these prompts?',
    answer: 'Our prompts are engineered with professional photography parameters: 85mm portrait focal length, shallow depth of field, cinematic color grading, realistic fabric wrinkles, HDR lighting, and lifelike skin textures. This ensures the output looks like a high-end fashion campaign photograph taken by a professional photographer rather than artificial CGI or a cartoon.',
    keywords: ['8K DSLR Photography', '85mm Portrait Lens', 'Cinematic Color Grading', 'Photorealistic AI', 'HDR Studio Lighting'],
  },
  {
    question: 'Can I use these prompts on mobile phones with Android and iPhone?',
    answer: 'Absolutely! Piktrio is 100% mobile-friendly. You can browse all prompts on your Android phone or iPhone, copy full prompts with one tap, and directly open them in the official ChatGPT and Google Gemini mobile apps or your mobile browser.',
    keywords: ['Mobile AI Photo Editing', 'Android AI Prompts', 'iPhone ChatGPT Prompts', 'Gemini Mobile Editor'],
  },
  {
    question: 'Why does Piktrio show 100% uncropped original photo previews?',
    answer: 'Unlike other prompt platforms that force square or cropped thumbnails and cut off heads, shoes, or vehicles, Piktrio uses zero-crop aspect ratio display. You see the complete vertical portrait, posture, background, and outfit exactly as the AI will generate it.',
    keywords: ['Uncropped Photo Previews', 'Zero Crop AI Gallery', 'Full Vertical Aspect Ratio', 'Verified AI Prompts'],
  },
];

export const FAQSection: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]); // First two opened by default

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section 
      aria-label="Frequently Asked Questions & AI Prompts Guide"
      className="w-full mt-12 mb-16 pt-10 border-t border-slate-200"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Search-Friendly AI Guide &amp; Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about creating viral, ultra-realistic AI portraits with ChatGPT, Google Gemini, and Piktrio prompts.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-in fade-in duration-200">
                    <p className="mb-3">{faq.answer}</p>
                    
                    {/* SEO Keywords Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                        Keywords:
                      </span>
                      {faq.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 text-[10px] font-medium"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Guarantee Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="text-xs font-semibold text-blue-950">
              100% Tested Prompts &bull; Compatible with ChatGPT (GPT-4o), Google Gemini &amp; Midjourney
            </span>
          </div>
          <span className="text-[11px] font-bold text-blue-700 bg-white px-3 py-1 rounded-full border border-blue-200 shadow-xs">
            Updated Daily
          </span>
        </div>

      </div>
    </section>
  );
};
