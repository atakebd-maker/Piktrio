import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { STORE_PROMPTS } from '../src/data/initialPrompts';

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

  <!-- Categories -->
  <url>
    <loc>${siteUrl}/?category=trending</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${siteUrl}/?category=all</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${siteUrl}/?category=boys</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${siteUrl}/?category=diwali</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Collections -->
  <url>
    <loc>${siteUrl}/collection/diwali-ai-photo-editing-prompt</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${siteUrl}/collection/ai-photo-prompts-for-boys</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>

  <url>
    <loc>${siteUrl}/collection/trending-ai-photo-prompts</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>

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

console.log(`[Sitemap Generator] Generated ${STORE_PROMPTS.length} prompt URLs with 100% absolute URLs into ${path.join(publicDir, 'sitemap.xml')}`);

// 2. Pre-render individual static SEO pages for EVERY prompt to guarantee 100% Googlebot indexing
STORE_PROMPTS.forEach((p) => {
  const promptDir = path.join(publicDir, 'prompt', p.id);
  if (!fs.existsSync(promptDir)) {
    fs.mkdirSync(promptDir, { recursive: true });
  }

  const promptCanonicalUrl = `${siteUrl}/prompt/${encodeURIComponent(p.id)}`;
  const absoluteImageUrl = resolveImageUrl(p.imageUrl);
  const metaDesc = `${p.title}. Copy and create this AI photo using ChatGPT & Gemini with 100% facial identity preservation.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    image: [absoluteImageUrl],
    description: p.description ? p.description.slice(0, 200).replace(/#/g, '') : p.title,
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

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white font-sans min-h-screen">
    <div id="root">
      <!-- Pre-rendered Static Semantic Content for Googlebot Crawler & Instant SEO Indexing -->
      <header style="padding: 1.25rem; border-bottom: 1px solid #e2e8f0; background: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
          <a href="/" style="font-size: 1.5rem; font-weight: 800; color: #2563eb; text-decoration: none;">Piktrio</a>
          <nav>
            <a href="/" style="margin-right: 1rem; color: #475569; text-decoration: none; font-weight: 600;">Home</a>
            <a href="/?category=boys" style="color: #475569; text-decoration: none; font-weight: 600;">Boys Prompts</a>
          </nav>
        </div>
      </header>

      <main style="max-width: 1100px; margin: 2rem auto; padding: 0 1rem;">
        <article style="background: #ffffff; border-radius: 1.5rem; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);">
          <span style="display: inline-block; padding: 0.35rem 0.85rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; margin-bottom: 0.75rem;">
            ${escapeXml(p.category)} &bull; ${escapeXml(p.model || 'ChatGPT / Gemini')}
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
        </article>
      </main>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(promptDir, 'index.html'), html, 'utf-8');
});

console.log(`[Static Pre-render] Successfully generated individual SEO static pages for all ${STORE_PROMPTS.length} prompts!`);
