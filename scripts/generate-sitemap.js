import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Determine base URL:
// 1. Explicit SITE_URL or VITE_SITE_URL environment variable
// 2. Vercel System Env: VERCEL_PROJECT_PRODUCTION_URL or VERCEL_URL
// 3. Fallback to production Vercel domain https://piktrio.vercel.app
let siteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;

if (!siteUrl && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
} else if (!siteUrl && process.env.VERCEL_URL) {
  siteUrl = `https://${process.env.VERCEL_URL}`;
}

if (!siteUrl) {
  siteUrl = 'https://piktrio.vercel.app';
}

// Ensure protocol and remove trailing slash
if (!siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
  siteUrl = `https://${siteUrl}`;
}
siteUrl = siteUrl.replace(/\/+$/, '');

console.log(`[Sitemap Generator] Generating sitemap for domain: ${siteUrl}`);

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage / Main Prompt Gallery -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Prompt: Diwali prompt for boys (Sparkler & Fireworks) -->
  <url>
    <loc>${siteUrl}/?prompt=diwali-sparkler-prompt-for-boys</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgankApmajhvzriG4_RFThRuV5LOmYqNzm3lLqNIBE4w7rfPLV7l54gyTplnBwrnBGDkgzjkCTAcd-bO6iuyYJXbODZqeYysOjbVfsCg8QSpwJHXejtQrfJ6knIkDcBPWsh8-CT-4YpRHT6zfq0gPFAIkLSmyunp5vbcko1Kns-By8BaSCqGvQgcCX5vD8/s1600/image.png</image:loc>
      <image:title>Diwali prompt for boys – Sparkler &amp; Fireworks 4K AI Photo Prompt</image:title>
      <image:caption>Ultra-realistic 4K festive Diwali celebration portrait AI photo prompt for boys with ChatGPT and Gemini</image:caption>
    </image:image>
  </url>

  <!-- Prompt: Diwali prompt for boys (Balcony Diya) -->
  <url>
    <loc>${siteUrl}/?prompt=diwali-prompt-for-boys</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAO929HdP61AHpFttEvtfAFMNfp5Di3s1Hb8eGEkU_uwLBhnYPS53UGk6G_6pl7_kE4wtNgcldADU77nGBa6jbsdmQv8Tqx3R6CuKofZQyfZ_TI9CvHhbVmFXD6ggCtN-aklUE2Unz5-Gt8k6TOvftr0s7TpBEUgfpiponm3BATw60PLWqXUDSI1J3nhuR/s1600/image.png</image:loc>
      <image:title>Diwali prompt for boys</image:title>
      <image:caption>Realistic cinematic Diwali celebration portrait AI photo prompt for boys with ChatGPT and Gemini</image:caption>
    </image:image>
  </url>

  <!-- Prompt: Jailer 2 AI Photo Prompt -->
  <url>
    <loc>${siteUrl}/?prompt=ry1YS0nVUaA7flw02c7J</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${siteUrl}/assets/aistudio/image_ad502c62.png</image:loc>
      <image:title>Jailer 2 AI Photo Prompt – Create Realistic Boys AI Photos</image:title>
      <image:caption>Ultra-realistic cinematic Jailer 2 multiplex cinema hall DSLR photography AI prompt</image:caption>
    </image:image>
  </url>

  <!-- Prompt: Black & White Luxury Car Photoshoot AI Prompt -->
  <url>
    <loc>${siteUrl}/?prompt=orUmpTSCFTyOAc9HOMhV</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${siteUrl}/assets/aistudio/image_615815aa.png</image:loc>
      <image:title>Black &amp; White Luxury Car Photoshoot AI Prompt</image:title>
      <image:caption>Ultra realistic Mahindra Scorpio portrait AI prompt with ChatGPT and Gemini</image:caption>
    </image:image>
  </url>

  <!-- Category & Collection: Diwali AI photo editing prompt -->
  <url>
    <loc>${siteUrl}/?category=diwali</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Category: Trending -->
  <url>
    <loc>${siteUrl}/?category=trending</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Category: Boys -->
  <url>
    <loc>${siteUrl}/?category=boys</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Category: Couple -->
  <url>
    <loc>${siteUrl}/?category=couple</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`;

const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

// Write to public/sitemap.xml and public/robots.txt
const publicDir = path.join(rootDir, 'public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent.trim() + '\n', 'utf-8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent.trim() + '\n', 'utf-8');

console.log(`[Sitemap Generator] Successfully generated sitemap.xml and robots.txt for ${siteUrl}!`);
