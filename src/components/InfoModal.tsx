import React, { useState } from 'react';
import { X, Mail, Shield, FileText, Info, Send, CheckCircle2 } from 'lucide-react';

export type ModalType = 'about' | 'contact' | 'privacy' | 'terms';

interface InfoModalProps {
  type: ModalType | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  const [activeTab, setActiveTab] = useState<ModalType>(type || 'about');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Sync tab if type prop changes
  React.useEffect(() => {
    if (type) {
      setActiveTab(type);
      setContactSubmitted(false);
    }
  }, [type]);

  if (!type) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-[#0e0922] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-[#271a4f] z-10 overflow-hidden text-gray-200">
        
        {/* Modal Header & Navigation Tabs */}
        <div className="border-b border-[#21153f] bg-[#0a0618] px-4 sm:px-6 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md">
                {activeTab === 'about' && <Info className="w-5 h-5" />}
                {activeTab === 'contact' && <Mail className="w-5 h-5" />}
                {activeTab === 'privacy' && <Shield className="w-5 h-5" />}
                {activeTab === 'terms' && <FileText className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg">
                  {activeTab === 'about' && 'About Piktrio'}
                  {activeTab === 'contact' && 'Contact Us'}
                  {activeTab === 'privacy' && 'Privacy Policy'}
                  {activeTab === 'terms' && 'Terms & Conditions'}
                </h3>
                <p className="text-[11px] text-purple-300/60">Official Piktrio Information &amp; Guidelines</p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'about'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'contact'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'privacy'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'terms'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6 text-gray-300 text-sm leading-relaxed space-y-4">
          
          {/* 1. ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-base">Welcome to Piktrio</h4>
              <p>
                <strong>Piktrio</strong> is your premier destination for discovering, copying, and mastering realistic AI photo editing prompts. We curate meticulously tested prompts engineered specifically for ChatGPT (GPT-4o), Google Gemini, Flux, and Midjourney.
              </p>
              
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs space-y-2 text-blue-950">
                <p className="font-bold text-blue-800 text-sm">✨ Why Creators Choose Piktrio:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li><strong>100% Uncropped Previews:</strong> View complete full-bleed photographs without awkward crops or hidden details.</li>
                  <li><strong>Face Identity Preservation:</strong> Prompts specifically structured to keep your real face, hair, and facial proportions identical.</li>
                  <li><strong>One-Click Fast Copy:</strong> Copy prompts in full high-fidelity format directly to your clipboard.</li>
                  <li><strong>Detailed How-To Guides:</strong> Step-by-step instructions for beginners and pros alike.</li>
                </ul>
              </div>

              <p className="text-xs text-gray-500">
                Whether you are creating festive Diwali portraits, cinematic streetwear aesthetics, or luxury automobile photoshoots, Piktrio empowers your creative vision with cutting-edge artificial intelligence prompts.
              </p>
            </div>
          )}

          {/* 2. CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-gray-900 text-base">Get in Touch with Us</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Have a suggestion, custom prompt request, or partnership inquiry? We would love to hear from you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Direct Email
                  </span>
                  <a href="mailto:support@piktrio.com" className="text-sm font-bold text-blue-600 hover:underline">
                    support@piktrio.com
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Response Time
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    Within 24-48 Hours
                  </span>
                </div>
              </div>

              {contactSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h5 className="font-bold text-emerald-900">Message Received!</h5>
                  <p className="text-xs text-emerald-700">
                    Thank you for reaching out to Piktrio. Our team will review your message and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="mt-2 px-4 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Message</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Write your question, suggestion, or prompt idea here..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Piktrio</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 3. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-base">Privacy Policy</h4>
              <p className="text-xs text-gray-500">Last updated: November 2026</p>

              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-gray-800 text-xs uppercase tracking-wide">1. Information We Collect</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Piktrio operates as a curated catalog of public AI prompts. We do not require account registration or store sensitive personal data of casual visitors. We collect anonymous analytics regarding prompt views and copies to enhance platform performance.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 text-xs uppercase tracking-wide">2. Cookies & Advertising</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    We may use standard web cookies to preserve user preferences (such as selected categories). Third-party vendors, including Google, may use cookies to serve ads based on prior visits to our website.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 text-xs uppercase tracking-wide">3. Third-Party Links</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Our site includes external links to tools such as ChatGPT and Google Gemini. We encourage you to review their respective privacy practices when utilizing third-party services.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 text-xs uppercase tracking-wide">4. Contact on Privacy</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    For privacy inquiries or data requests, please contact us at <a href="mailto:privacy@piktrio.com" className="text-blue-600 hover:underline">privacy@piktrio.com</a>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-base">Terms and Conditions of Use</h4>
              <p className="text-xs text-gray-500">Effective Date: November 2026</p>

              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-gray-800 text-xs uppercase tracking-wide">1. Permitted Use</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    All prompts published on Piktrio are provided for personal and commercial generative AI photo creation. You are free to copy, modify, and input these prompts into AI models such as ChatGPT, Gemini, and Midjourney.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 text-xs uppercase tracking-wide">2. Intellectual Property</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    The Piktrio logo, design, website layouts, and compilation are proprietary. Mass automated scraping or unauthorized mirror distribution of our platform content is strictly prohibited.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 text-xs uppercase tracking-wide">3. Responsible AI Generation</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Users must adhere to the acceptable use policies of third-party AI providers. Prompts may not be used to create defamatory, harmful, deceptive, or non-consensual imagery.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 text-xs uppercase tracking-wide">4. Disclaimer</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Piktrio provides prompts "as is". Generated outputs depend upon the respective third-party AI model version and settings used.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-3.5 flex items-center justify-between">
          <span className="text-[11px] text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} Piktrio • Discover. Copy. Create.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
