import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { STORE_PROMPTS, PROMPTPIN_CATEGORIES, COLLECTIONS_LIST, promptMatchesCategory } from '../src/data/initialPrompts';
import { BLOG_POSTS } from '../src/data/blogs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let siteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;

if (!siteUrl && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
} else if (!siteUrl && process.env.VERCEL_URL) {
  siteUrl = `https://${process.env.VERCEL_URL}`;
}

if (!siteUrl) {
  siteUrl = 'https://piktrio.vercel.app';
}

if (!siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
  siteUrl = `https://${siteUrl}`;
}
siteUrl = siteUrl.replace(/\/+$/, '');

console.log(`[Sitemap & Static Pages Generator] Running for domain: ${siteUrl}`);

const escapeXml = (unsafe: string) => {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const resolveImageUrl = (imgUrl: string): string => {
  if (!imgUrl) {
    return `${siteUrl}/assets/aistudio/1000050956-removebg-preview_1d3a3740.png`;
  }
  if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
    return imgUrl;
  }
  return `${siteUrl}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`;
};

const today = new Date().toISOString().split('T')[0];

const categoryEntries = PROMPTPIN_CATEGORIES.map(
  (c) => `  <url>
    <loc>${siteUrl}/?category=${encodeURIComponent(c.id)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
).join('\n\n');

const collectionEntries = COLLECTIONS_LIST.map(
  (col) => `  <url>
    <loc>${siteUrl}/collection/${encodeURIComponent(col.slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>`
).join('\n\n');

const blogEntries = [
  `  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>`,
  ...BLOG_POSTS.map(
    (b) => `  <url>
    <loc>${siteUrl}/blog/${encodeURIComponent(b.slug)}</loc>
    <lastmod>${b.publishedAt || today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${escapeXml(resolveImageUrl(b.coverImageUrl))}</image:loc>
      <image:title>${escapeXml(b.title)}</image:title>
      <image:caption>${escapeXml(b.metaDescription)}</image:caption>
    </image:image>
  </url>`
  ),
].join('\n\n');

// 1. Generate Sitemap XML
const promptEntries = STORE_PROMPTS.map((p) => {
  const lastmod = p.createdAt ? (typeof p.createdAt === 'string' ? p.createdAt.split('T')[0] : today) : today;
  const canonicalUrl = `${siteUrl}/prompt/${encodeURIComponent(p.id)}`;
  const absoluteImageUrl = resolveImageUrl(p.imageUrl);

  return `  <!-- Prompt: ${escapeXml(p.title)} -->
  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${escapeXml(absoluteImageUrl)}</image:loc>
      <image:title>${escapeXml(p.title)}</image:title>
      <image:caption>${escapeXml(p.title)} - Free AI photo editing prompt for ChatGPT and Google Gemini</image:caption>
    </image:image>
  </url>`;
}).join('\n\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog & Guides -->
${blogEntries}

  <!-- Categories -->
${categoryEntries}

  <!-- Collections -->
${collectionEntries}

${promptEntries}
</urlset>
`;

const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const publicDir = path.join(rootDir, 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent.trim() + '\n', 'utf-8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent.trim() + '\n', 'utf-8');

console.log(`[Sitemap Generator] Generated ${STORE_PROMPTS.length} prompt URLs and ${BLOG_POSTS.length} blog URLs into ${path.join(publicDir, 'sitemap.xml')}`);

// 2. Pre-render individual static SEO pages for EVERY prompt (with Article + FAQPage JSON-LD)
STORE_PROMPTS.forEach((p) => {
  const promptDir = path.join(publicDir, 'prompt', p.id);
  if (!fs.existsSync(promptDir)) {
    fs.mkdirSync(promptDir, { recursive: true });
  }

  const promptCanonicalUrl = `${siteUrl}/prompt/${encodeURIComponent(p.id)}`;
  const absoluteImageUrl = resolveImageUrl(p.imageUrl);
  const metaDesc = `${p.title}. Copy this free ${p.category} AI photo editing prompt and create it using ChatGPT & Gemini with 100% facial identity preservation.`;
  const modelLabel = p.model || 'ChatGPT (GPT-4o) & Google Gemini';
  const ratioLabel = p.aspectRatio || '3:4 vertical portrait';
  const topTags = (p.tags || []).slice(0, 4).join(', ') || p.category;

  const promptFaqs = [
    {
      question: `How do I create the "${p.title}" AI photo in ChatGPT or Google Gemini?`,
      answer: `Copy the full "${p.title}" prompt on this page using the Copy Full Prompt button, open ${modelLabel}, upload a clear front-facing photo of yourself, paste the prompt below your image, and send to generate your 8K portrait.`,
    },
    {
      question: `Will my real face, beard, or mustache stay unchanged when using this ${p.category} prompt?`,
      answer: `Yes. Every Piktrio prompt includes Strict Face Identity and Natural Facial Hair Preservation rules. When you upload your reference photo, ${modelLabel} matches your exact facial bone structure, skin tone, beard, and mustache without substituting a generic face.`,
    },
    {
      question: `Is the "${p.title}" AI photo editing prompt free to use?`,
      answer: `Yes, this ${p.category} prompt is 100% free to copy, customize, and use in ChatGPT, Google Gemini, or compatible AI image generators with zero watermarks.`,
    },
    {
      question: `What aspect ratio, camera quality, and tags are used in this prompt?`,
      answer: `This prompt is tuned for ${ratioLabel} framing with 8K photorealistic lighting, DSLR depth of field, and ${topTags} styling.`,
    },
    {
      question: `Can I generate "${p.title}" on my Android phone or iPhone?`,
      answer: `Yes! Tap Copy Full Prompt on your mobile phone, then tap Open in ChatGPT or Open in Gemini directly below the prompt box to paste and generate your photo in under 30 seconds.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    image: [absoluteImageUrl],
    description: p.description ? p.description.slice(0, 200).replace(/#/g, '') : metaDesc,
    articleBody: p.prompt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': promptCanonicalUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Piktrio',
      url: siteUrl,
      logo: `${siteUrl}/assets/aistudio/1000050956-removebg-preview_1d3a3740.png`,
    },
  };

  const faqJsonLd = {
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
  };

  const faqHtml = promptFaqs
    .map(
      (faq) => `          <div style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.75rem; background: #f8fafc;">
            <h3 style="font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 0.4rem 0;">${escapeXml(faq.question)}</h3>
            <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.5;">${escapeXml(faq.answer)}</p>
          </div>`
    )
    .join('\n');

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="origin" />
    <meta name="google-site-verification" content="bLN_T8HDzlDs9LNH6wEMuVvLOZf0JINKEPAEq7_QjpM" />
    <meta name="bengalads-site-verification" content="c0650568682c03689a1a8e3f29136478da8e01f98a666417" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    
    <title>${escapeXml(p.title)} – Piktrio</title>
    <meta name="description" content="${escapeXml(metaDesc)}" />
    <meta name="keywords" content="${escapeXml((p.tags || []).join(', '))}, ChatGPT AI Prompt, Gemini AI Prompt, AI Photo Editing" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${escapeXml(promptCanonicalUrl)}" />
    <meta property="og:site_name" content="Piktrio" />
    <meta property="og:title" content="${escapeXml(p.title)} – Piktrio" />
    <meta property="og:description" content="${escapeXml(metaDesc)}" />
    <meta property="og:image" content="${escapeXml(absoluteImageUrl)}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeXml(p.title)} – Piktrio" />
    <meta name="twitter:description" content="${escapeXml(metaDesc)}" />
    <meta name="twitter:image" content="${escapeXml(absoluteImageUrl)}" />
    
    <!-- Canonical Link (Dedicated to this exact post, never pointing to homepage) -->
    <link rel="canonical" href="${escapeXml(promptCanonicalUrl)}" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/assets/aistudio/image_bad50ca2.png" />
    <link rel="shortcut icon" href="/favicon.ico" />

    <!-- Schema.org Article Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>

    <!-- Schema.org FAQPage Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(faqJsonLd, null, 2)}
    </script>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white font-sans min-h-screen">
    <div id="root">
      <!-- Pre-rendered Static Semantic Content for Googlebot Crawler & Instant SEO Indexing -->
      <header style="padding: 1.25rem; border-bottom: 1px solid #e2e8f0; background: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
          <a href="/" style="font-size: 1.5rem; font-weight: 800; color: #0a0a0a; text-decoration: none;">Piktrio</a>
          <nav>
            <a href="/" style="margin-right: 1rem; color: #475569; text-decoration: none; font-weight: 600;">Home</a>
            <a href="/?category=boys" style="margin-right: 1rem; color: #475569; text-decoration: none; font-weight: 600;">Boys Prompts</a>
            <a href="/blog" style="color: #2563eb; text-decoration: none; font-weight: 700;">Blog</a>
          </nav>
        </div>
      </header>

      <main style="max-width: 1100px; margin: 2rem auto; padding: 0 1rem;">
        <article style="background: #ffffff; border-radius: 1.5rem; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);">
          <span style="display: inline-block; padding: 0.35rem 0.85rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; margin-bottom: 0.75rem;">
            ${escapeXml(p.category)} &bull; ${escapeXml(modelLabel)}
          </span>
          <h1 style="font-size: 2rem; font-weight: 800; color: #0f172a; line-height: 1.3; margin: 0 0 1.5rem 0;">
            ${escapeXml(p.title)}
          </h1>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: start;">
            <div style="text-align: center; background: #f8fafc; padding: 1rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
              <img src="${escapeXml(absoluteImageUrl)}" alt="${escapeXml(p.title)}" style="max-width: 100%; height: auto; border-radius: 0.75rem; max-height: 600px; object-fit: contain;" />
            </div>

            <div>
              <h2 style="font-size: 1.15rem; font-weight: 700; color: #1e293b; margin-top: 0;">English AI Generation Prompt</h2>
              <pre style="background: #0f172a; color: #f8fafc; padding: 1.25rem; border-radius: 1rem; font-family: monospace; font-size: 0.85rem; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${escapeXml(p.prompt)}</pre>
            </div>
          </div>

          <section style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 1rem 0;">Frequently Asked Questions</h2>
${faqHtml}
          </section>
        </article>
      </main>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(promptDir, 'index.html'), html, 'utf-8');
});

// 3. Pre-render Blog Index & Individual Blog Pages for Googlebot indexing
const blogIndexDir = path.join(publicDir, 'blog');
if (!fs.existsSync(blogIndexDir)) {
  fs.mkdirSync(blogIndexDir, { recursive: true });
}

const blogIndexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
    <title>AI Photo Editing Blog &amp; Step-by-Step Prompt Guides – Piktrio</title>
    <meta name="description" content="Read complete step-by-step AI photo editing guides, viral ChatGPT &amp; Google Gemini prompt collections, and expert portrait creation tutorials on Piktrio Blog." />
    <link rel="canonical" href="${siteUrl}/blog" />
  </head>
  <body class="bg-[#fafafa] text-zinc-950 font-sans min-h-screen">
    <div id="root">
      <main style="max-width: 1000px; margin: 2rem auto; padding: 1rem;">
        <h1>AI Photo Editing Blog &amp; Step-by-Step Prompt Guides</h1>
        ${BLOG_POSTS.map(
          (b) => `<article style="margin-bottom: 1.5rem; padding: 1.25rem; background: #fff; border: 1px solid #e5e5e5; border-radius: 1rem;">
            <h2><a href="/blog/${escapeXml(b.slug)}">${escapeXml(b.title)}</a></h2>
            <p>${escapeXml(b.excerpt)}</p>
          </article>`
        ).join('\n')}
      </main>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
fs.writeFileSync(path.join(blogIndexDir, 'index.html'), blogIndexHtml, 'utf-8');

BLOG_POSTS.forEach((b) => {
  const bDir = path.join(blogIndexDir, b.slug);
  if (!fs.existsSync(bDir)) {
    fs.mkdirSync(bDir, { recursive: true });
  }
  const blogCanonicalUrl = `${siteUrl}/blog/${encodeURIComponent(b.slug)}`;
  const matchedPrompts = STORE_PROMPTS.filter((p) =>
    b.promptIds && b.promptIds.length > 0
      ? b.promptIds.includes(p.id)
      : promptMatchesCategory(p, b.categoryId)
  );

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: b.title,
    description: b.metaDescription,
    image: [resolveImageUrl(b.coverImageUrl)],
    datePublished: b.publishedAt,
    dateModified: b.publishedAt,
    keywords: b.keywords.join(', '),
    articleSection: b.categoryName,
    author: { '@type': 'Organization', name: b.author },
    publisher: { '@type': 'Organization', name: 'Piktrio', url: siteUrl },
    mainEntityOfPage: { '@type': 'WebPage', '@id': blogCanonicalUrl },
  };

  const blogFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: b.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const blogHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <title>${escapeXml(b.metaTitle)}</title>
    <meta name="description" content="${escapeXml(b.metaDescription)}" />
    <meta name="keywords" content="${escapeXml(b.keywords.join(', '))}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${escapeXml(blogCanonicalUrl)}" />
    <meta property="og:title" content="${escapeXml(b.metaTitle)}" />
    <meta property="og:description" content="${escapeXml(b.metaDescription)}" />
    <meta property="og:image" content="${escapeXml(resolveImageUrl(b.coverImageUrl))}" />
    <link rel="canonical" href="${escapeXml(blogCanonicalUrl)}" />
    <script type="application/ld+json">
${JSON.stringify(blogJsonLd, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(blogFaqJsonLd, null, 2)}
    </script>
  </head>
  <body class="bg-[#fafafa] text-zinc-950 font-sans min-h-screen">
    <div id="root">
      <article style="max-width: 960px; margin: 2rem auto; padding: 1.5rem; background: #fff; border-radius: 1rem;">
        <h1>${escapeXml(b.title)}</h1>
        <p>${escapeXml(b.excerpt)}</p>
        ${matchedPrompts
          .map(
            (p) => `<section style="margin-top: 2rem;">
              <h2>${escapeXml(p.title)}</h2>
              <img src="${escapeXml(resolveImageUrl(p.imageUrl))}" alt="${escapeXml(p.title)}" style="max-width: 100%; height: auto;" />
              <pre style="white-space: pre-wrap;">${escapeXml(p.prompt)}</pre>
            </section>`
          )
          .join('\n')}
      </article>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  fs.writeFileSync(path.join(bDir, 'index.html'), blogHtml, 'utf-8');
});

console.log(`[Static Pre-render] Successfully generated FAQPage JSON-LD for ${STORE_PROMPTS.length} prompts and ${BLOG_POSTS.length} blog pages!`);
