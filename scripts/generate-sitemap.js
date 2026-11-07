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

  <!-- Prompt: Royal Diwali Portrait – Elegant Navy Blue Sherwani & Palace Courtyard Look -->
  <url>
    <loc>${siteUrl}/?prompt=royal-diwali-navy-blue-sherwani-palace</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjsOPQ-pN-BZIvKlkFHrgH_kHSf2ltWw7c86bpN4ooTzhglgzOsZqEAqoyX1IBAN0udLAnAIFFW580TziPwYvrbwvNHzALPsCz3K8euKekchKigVX7SkPV66E2ZcF8aVvcqakB9Agojl2TkBseDyvnv5oHw6HcrapZejbHf8nDQfQdt3-HCf0kynkiE_g/s1600/image.png</image:loc>
      <image:title>Royal Diwali Portrait – Elegant Navy Blue Sherwani &amp; Palace Courtyard Look</image:title>
      <image:caption>Ultra-realistic 4K royal festive portrait in deep navy-blue sherwani in palace courtyard</image:caption>
    </image:image>
  </url>

  <!-- Prompt: 90s Retro Motorcycle Portrait – Vintage Denim Style with Classic Bike -->
  <url>
    <loc>${siteUrl}/?prompt=90s-retro-motorcycle-vintage-denim</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfHGavzFK-xB5wCGq3k80KcNrzYHd3RmEy1HlC8-rngXHf7255HxUFGqeU727RGXKlHChGH8eUi1-jCGJXwEBdT_FoMRFLPFIHRkRsd3ZBI2cmVXCnbSlQ3Y2CBo0TN8t0zAChhGQpnkfo-11wXRI6XhmAXz4sfqsljm8mwmTbLv5Ddl54ZdCPDD3kJGE/s1600/image.png</image:loc>
      <image:title>90s Retro Motorcycle Portrait – Vintage Denim Style with Classic Bike</image:title>
      <image:caption>Ultra-realistic 8K vintage-inspired 1990s street-style portrait with vintage motorcycle and acid-wash denim</image:caption>
    </image:image>
  </url>

  <!-- Prompt: Best Diwali prompt for boys -->
  <url>
    <loc>${siteUrl}/?prompt=best-diwali-prompt-for-boys</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiPg0z2hHAODkb1D_pKFyvvz8yit7m4-Or9JC29wiRwIsJln29uKWSaSwHq7Wy-i7FzessspVShPmKJReIwadGx7ksyJaJgeg4ls0rPPHFMErwRNJ7m2WoYu_6o0WItEISeftR_23auzcenDACsJ4na50uvPShhCDyarKB53fi_hi4xUj48Xeu-oepLQo/s1600/image.png</image:loc>
      <image:title>Best Diwali prompt for boys</image:title>
      <image:caption>Best Diwali prompt for boys 4K cinematic festive photograph with ChatGPT and Gemini</image:caption>
    </image:image>
  </url>

  <!-- Prompt: Diwali boys prompt – Deep Burgundy Kurta Courtyard Diya Lighting -->
  <url>
    <loc>${siteUrl}/?prompt=diwali-boys-prompt-burgundy-kurta</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtiduU8Pbig4VEdKB_3Uf2eYzIHwvrsaZudPbzy1uhfv3GKWCiS1i9N_hAyPlIlzILQguIv_7ZVCbVnJtDKAtspdJvbYQqBPtyer0nTZ_2PaXmNV4yj9ZKxfZSTR9i29MCRtJmZPOXOxlaYyUOSh1mbpchTlkSzEvTFAsADVLNlciZUZp4lgPmjE5WKVE/s1600/image.png</image:loc>
      <image:title>Diwali boys prompt – Deep Burgundy Kurta Courtyard Diya Lighting AI Photo</image:title>
      <image:caption>Realistic cinematic deep burgundy kurta Diwali diya lighting prompt</image:caption>
    </image:image>
  </url>

  <!-- Prompt: Boys Diwali prompt – Luxury Ivory Kurta & Brass Lamp Stand -->
  <url>
    <loc>${siteUrl}/?prompt=boys-diwali-prompt-ivory-kurta-brass-lamp</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEja4ufCjjJj7LMxNF2e8Q8rnbGTt6xnCNz2clrgsajusGKoDLCSAEVDNuX49blc50k2UtYpQ3BTBSE95a6tA6LZ0jeA1q7LavBeCXb1wdvOyPEcezM74Hxb7ymcGtAA12roymGFSYIIhdv0DW-lxiIs9AbSz9gu4M1v-Pgn879KV3v4Dj3-Q3TSqphw1ho/s1600/image.png</image:loc>
      <image:title>Boys Diwali prompt – Luxury Ivory Kurta &amp; Antique Brass Lamp Stand AI Photo</image:title>
      <image:caption>Ultra-realistic luxury ivory kurta antique brass lamp stand festive AI photoshoot</image:caption>
    </image:image>
  </url>

  <!-- Prompt: Diwali prompt for boys – Cream Silk Dupatta Rooftop Fireworks -->
  <url>
    <loc>${siteUrl}/?prompt=diwali-prompt-for-boys-cream-silk-dupatta</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgagzTUZHaOl6WpbQ0DqIUwZQrdzrgNz60aSW0VVR9WXNyM74VP7wY1JKd7wsCPP0vyHtXitssXOWj5gpH01zXzP41B9c4jiZy4znAAz_fdc6Zf5_NFRkcw_Ax1I2j4GYKwRiHtnWHnCOkP30UqPeVdn1J8GbXrmY2p53iu40YwtHL_pLDuDr4yZKGdA-Y/s1600/image.png</image:loc>
      <image:title>Diwali prompt for boys – Cream Silk Dupatta Rooftop Fireworks AI Photo</image:title>
      <image:caption>Cinematic cream kurta with silk dupatta on rooftop terrace holding clay diya under fireworks</image:caption>
    </image:image>
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

  <!-- Category & Collection: 90s Retro AI Photo Prompts -->
  <url>
    <loc>${siteUrl}/?category=retro</loc>
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
