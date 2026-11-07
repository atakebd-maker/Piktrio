import { CategoryItem, PromptItem } from '../types/prompt';

/**
 * Standard categories strictly requested by the user:
 * - All
 * - Trending
 * - Boys
 * - Girls
 * - Couple
 */
export const PROMPTPIN_CATEGORIES: CategoryItem[] = [
  { id: 'trending', name: 'Trending', description: 'Viral and popular AI image editing prompts' },
  { id: 'all', name: 'All', description: 'All AI Photo editing prompts' },
  { id: 'diwali', name: 'Diwali', description: 'Festive Diwali AI photo editing prompts' },
  { id: 'boys', name: 'Boys', description: 'AI photo editing prompts for boys and men' },
  { id: 'couple', name: 'Couple', description: 'Romantic and aesthetic couple AI photo prompts' },
];

export const COLLECTIONS_LIST = [
  { label: 'Diwali AI photo editing prompt', cat: 'Diwali AI photo editing prompt' },
  { label: 'Trending AI Photo Prompts', cat: 'Trending' },
  { label: 'Couple AI Photo Prompts', cat: 'Couple' },
  { label: 'AI Photo Prompts for Boys', cat: 'Boys' },
];

export const STORE_PROMPTS: PromptItem[] = [
  {
    id: 'best-diwali-prompt-for-boys',
    title: 'Best Diwali prompt for boys',
    category: 'Boys',
    description: `# Best Diwali Prompt for Boys – Step-by-Step AI Photo Creation Guide

Learn how to create an authentic, ultra-realistic 4K cinematic Diwali celebration photograph using two uploaded reference images: one for the festive scene composition and one for your authentic personal face and hairstyle.

## What Is This AI Photo Editing Prompt?
This prompt is designed to produce a professional festive portrait on a traditional stone terrace during Diwali night. It features you in an elegant pure-white traditional kurta pajama with clean white sneakers, holding a brightly glowing phooljhadi (sparkler) with the golden words "Happy Diwali" displayed in 3D metallic typography in the sky.

## Step-by-Step Tutorial: How to Create This Photo

### Step 1: Prepare Two Photographs
- **First Image (Scene Reference):** Use the preview image shown on this page as the reference for composition, lighting, clothing, terrace, sparkler, and fireworks.
- **Second Image (Face Reference):** Use your own personal front-facing photograph where your face, eyes, hair texture, and natural expression are clear and well lit.

### Step 2: Open ChatGPT or Google Gemini
Launch ChatGPT (GPT-4o image generation) or Google Gemini on your smartphone or web browser.

### Step 3: Attach Both Images
Upload the scene reference image first, followed by your personal face reference photo in the prompt input field.

### Step 4: Copy the AI Prompt
Click the **Copy** button below. Wait 5 seconds for the countdown, and the complete prompt will be copied to your clipboard.

### Step 5: Paste & Generate
Paste the prompt into the message box alongside your uploaded photos and submit. Ask for a vertical 9:16 portrait.

### Step 6: Review & Download
Verify facial identity preservation, realistic sparkler glow, and clean 3D gold typography. Download your 4K festive photo and share!

---

## SEO Keywords & Search Tags
Diwali prompt for boys, Diwali boys prompt, Boys Diwali prompt, Diwali prompt, Best Diwali prompt, Best Diwali prompt for boys, Diwali AI photo editing prompt, Happy Diwali 3D text AI photo, White kurta Diwali prompt, ChatGPT Diwali prompt, Gemini Diwali prompt, Realistic festive AI photo`,
    prompt: `Create a highly realistic, professional 4K cinematic photograph by following the FIRST uploaded image as the exact visual composition and scene reference, while using the SECOND uploaded personal photograph exclusively as the identity reference for the person's real face and hairstyle.
1. STRICT FACE AND HAIR IDENTITY
The person must look exactly like the individual in the personal reference photograph. Preserve his real facial features, face shape, eyes, eyebrows, nose, lips, jawline, natural skin tone, hairstyle, hairline, hair length, and hair texture. Do not generate a different face, change his hairstyle, or apply artificial beautification. His identity must remain clearly recognizable.
2. EXACT BODY POSE AND POSITION
Recreate the same full-body standing pose shown in the first reference image:
- Standing naturally in the center of the terrace.
- One leg casually crossed in front of the other.
- One hand holding a small, brightly glowing traditional phooljhadi (sparkler).
- The other hand placed inside the pajama pocket.
- Head slightly tilted downward, looking happily at the glowing sparkler.
- A natural, genuine smile.
3. CLOTHING
Dress him in a beautiful, elegant, pure-white traditional Indian kurta with matching white pajama trousers and clean white sneakers. Maintain realistic fabric details, natural folds, and an authentic traditional appearance.
4. BACKGROUND — MATCH THE FIRST IMAGE
Reproduce the festive terrace atmosphere from the first reference image. Include:
- A beautiful traditional stone terrace with decorative stone railings.
- Numerous small, glowing clay diyas arranged along the railing.
- Additional lit diyas scattered naturally across the terrace floor.
- A dark nighttime sky filled with spectacular golden, silver, blue, and subtle pink fireworks.
- Realistic fireworks of different sizes distributed throughout the background.
- Warm golden light from the diyas illuminating the terrace and the subject.
Do not replace the traditional terrace with a modern balcony or a city rooftop.
5. EXACT TEXT
Place the words "Happy Diwali" prominently at the top of the image in large, luxurious, three-dimensional metallic gold lettering. Use elegant decorative serif typography with realistic golden reflections, subtle highlights, and a beautiful premium festive appearance. The text must be correctly spelled, fully visible, and must not overlap the person's head.
6. CAMERA AND IMAGE COMPOSITION
Vertical portrait photography, 9:16 aspect ratio, full-body framing from head to shoes, subject positioned in the center, with sufficient space above the head for the greeting text. Maintain the same camera perspective, subject proportions, and overall visual arrangement as the first reference image.
Professional DSLR photography, ultra-realistic skin texture, authentic facial details, cinematic nighttime lighting, realistic shadows, natural human anatomy, detailed clothing, balanced exposure, sharp focus, and premium photographic quality.
7. IMPORTANT FINAL INSTRUCTIONS
The first image is the scene, pose, clothing, background, and composition reference. The personal photograph is the face and hairstyle identity reference.
Do not copy the original person's face from the scene reference. Do not use the face of the model shown in the first image. Use only the actual face and hairstyle from the personal photograph.
Do not change the pose, do not remove the sneakers, do not make the person barefoot, do not change the vertical 9:16 composition, and do not simplify the fireworks or diyas.
The final result should closely recreate the first reference photograph while featuring the real person from the personal face reference. It must look like an authentic professional photograph, not an AI-generated illustration.`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiPg0z2hHAODkb1D_pKFyvvz8yit7m4-Or9JC29wiRwIsJln29uKWSaSwHq7Wy-i7FzessspVShPmKJReIwadGx7ksyJaJgeg4ls0rPPHFMErwRNJ7m2WoYu_6o0WItEISeftR_23auzcenDACsJ4na50uvPShhCDyarKB53fi_hi4xUj48Xeu-oepLQo/s1600/image.png',
    tags: [
      'Boys',
      'Diwali',
      'Diwali prompt for boys',
      'Diwali boys prompt',
      'Boys Diwali prompt',
      'Diwali prompt',
      'Best Diwali prompt',
      'Best Diwali prompt for boys',
      'Diwali AI photo editing prompt',
      'Sparkler',
      'Fireworks',
      'Happy Diwali',
      'Trending',
      'ChatGPT',
      'Gemini',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '9:16',
    model: 'ChatGPT / Gemini',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'diwali-boys-prompt-burgundy-kurta',
    title: 'Diwali boys prompt – Deep Burgundy Kurta Courtyard Diya Lighting AI Photo',
    category: 'Boys',
    description: `# Diwali Boys Prompt: Deep Burgundy Kurta Courtyard Diya Lighting Guide

Create an exceptionally realistic 4K cinematic Diwali festive photograph featuring you wearing a sophisticated deep burgundy kurta with delicate golden embroidery, lighting an authentic earthen diya in an architectural arched courtyard.

## What Is This AI Photo Editing Prompt?
This prompt captures an intimate and elegant Diwali celebration moment. Set in an outdoor traditional courtyard with hanging brass lanterns, floral rangoli patterns, and warm-white fairy lights, the focus is on cultural authenticity and preserving your exact facial identity.

## Step-by-Step Tutorial: How to Create This Photo

### Step 1: Select Your Personal Photo
Choose a high-resolution portrait or selfie where your face shape, skin tone, eyebrows, nose, and hairstyle are clearly visible.

### Step 2: Open ChatGPT or Google Gemini
Open ChatGPT (GPT-4o) or Google Gemini on your phone or computer.

### Step 3: Attach Your Reference Photo
Upload your portrait to the chatbox so the AI uses your real features as the exclusive identity anchor.

### Step 4: Copy the AI Prompt
Click the **Copy** button below. Wait 5 seconds for the countdown, and the full prompt will be copied to your clipboard.

### Step 5: Paste & Generate
Paste the prompt into the message box alongside your uploaded photo. Instruct the AI to generate a vertical 9:16 aspect ratio portrait.

### Step 6: Review & Download
Ensure your real face, hands, and the natural diya flame reflection are rendered smoothly. Save the image in full 4K resolution!

---

## SEO Keywords & Search Tags
Diwali prompt for boys, Diwali boys prompt, Boys Diwali prompt, Diwali prompt, Best Diwali prompt, Best Diwali prompt for boys, Diwali AI photo editing prompt, Burgundy kurta Diwali AI photo, Courtyard diya lighting prompt, Rangoli festive AI photo, ChatGPT Diwali prompt, Gemini Diwali prompt`,
    prompt: `Create an exceptionally realistic 4K cinematic Diwali celebration photograph using the uploaded personal photograph as the facial identity reference.
Facial Identity Preservation: Reproduce the same individual from the personal reference photograph. Preserve his original face shape, facial proportions, eyes, eyebrows, nose, lips, jawline, natural skin tone, hairstyle, hairline, and hair texture. Do not replace or redesign his face or hairstyle. Maintain his recognizable natural appearance.
Outfit and Pose: Show him wearing a sophisticated deep burgundy traditional Indian kurta featuring delicate golden embroidery around the collar, neckline, and cuffs, paired with elegant black trousers and traditional brown leather footwear. He is standing slightly bent forward, carefully lighting a traditional earthen diya using a small flame. Both hands are positioned naturally around the lamp, with his eyes focused on the flame and a gentle, peaceful expression.
Festive Environment: Place him inside a magnificent outdoor traditional festive courtyard with beautifully carved architectural arches. Decorate the entire space with glowing warm-white fairy lights, hanging brass lanterns, golden decorative lamps, orange marigold flower garlands, and numerous illuminated candles.
A tall, antique brass oil-lamp stand should be positioned beside him. Beautifully detailed, colorful rangoli patterns made with flower petals and colored powders should decorate the stone floor. Add several small clay diyas around the courtyard to create an authentic Diwali atmosphere.
Lighting and Photography: Capture the scene with warm golden cinematic illumination, realistic flame reflections, natural skin texture, beautiful depth of field, detailed fabric textures, lifelike shadows, and balanced exposure. Use professional DSLR photography aesthetics with a rich festive color palette and exceptionally realistic environmental details.
Composition: Vertical 9:16 portrait format, full-body framing, natural human proportions, centered subject, and a beautifully balanced architectural background.
Final Requirements: The result must resemble a genuine professional festive photograph. Preserve the person's real facial identity and original hairstyle. Avoid artificial facial modifications, cartoon effects, distorted hands, unrealistic anatomy, or excessive visual effects. Prioritize photographic realism and an elegant traditional Diwali atmosphere.`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtiduU8Pbig4VEdKB_3Uf2eYzIHwvrsaZudPbzy1uhfv3GKWCiS1i9N_hAyPlIlzILQguIv_7ZVCbVnJtDKAtspdJvbYQqBPtyer0nTZ_2PaXmNV4yj9ZKxfZSTR9i29MCRtJmZPOXOxlaYyUOSh1mbpchTlkSzEvTFAsADVLNlciZUZp4lgPmjE5WKVE/s1600/image.png',
    tags: [
      'Boys',
      'Diwali',
      'Diwali prompt for boys',
      'Diwali boys prompt',
      'Boys Diwali prompt',
      'Diwali prompt',
      'Best Diwali prompt',
      'Best Diwali prompt for boys',
      'Diwali AI photo editing prompt',
      'Burgundy Kurta',
      'Courtyard',
      'Rangoli',
      'Trending',
      'ChatGPT',
      'Gemini',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '9:16',
    model: 'ChatGPT / Gemini',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'boys-diwali-prompt-ivory-kurta-brass-lamp',
    title: 'Boys Diwali prompt – Luxury Ivory Kurta & Antique Brass Lamp Stand AI Photo',
    category: 'Boys',
    description: `# Boys Diwali Prompt: Luxury Ivory Kurta & Brass Lamp Stand Guide

Create an ultra-realistic 4K professional cinematic Diwali portrait of yourself standing gracefully beside a tall, antique-style brass oil-lamp stand adorned with intricate marigold garlands and colorful rangoli floor art.

## What Is This AI Photo Editing Prompt?
This prompt emphasizes regal festive elegance. Dressed in a luxurious ivory-colored traditional kurta with woven golden embroidery, you are lighting an ornate brass lamp stand in an opulent festive courtyard while keeping your true facial appearance intact.

## Step-by-Step Tutorial: How to Create This Photo

### Step 1: Select Your Personal Photo
Pick a clear personal photo with natural lighting showing your face, hairline, eyes, and natural expression.

### Step 2: Open ChatGPT or Google Gemini
Open ChatGPT or Google Gemini with image generation enabled.

### Step 3: Upload Your Face Reference
Attach your reference image to the chat prompt input.

### Step 4: Copy the AI Prompt
Click the **Copy** button below. Wait 5 seconds for the countdown, and the full prompt will be copied to your clipboard.

### Step 5: Paste & Generate
Paste the prompt into the chat window with your photo. Ask for a vertical 9:16 composition.

### Step 6: Review & Download
Check the brass lamp stand reflections, intricate rangoli, and skin texture. Download your 4K portrait!

---

## SEO Keywords & Search Tags
Diwali prompt for boys, Diwali boys prompt, Boys Diwali prompt, Diwali prompt, Best Diwali prompt, Best Diwali prompt for boys, Diwali AI photo editing prompt, Ivory kurta Diwali AI photo, Brass lamp stand prompt, Marigold floral Diwali AI photo, ChatGPT Diwali prompt, Gemini Diwali prompt`,
    prompt: `Create an ultra-realistic 4K professional cinematic photograph of the person in the uploaded personal reference photo, celebrating Diwali in an elegant traditional festive setting.
FACE AND HAIR IDENTITY LOCK:
Use the uploaded personal photograph as the exclusive facial identity reference. Preserve the person's authentic facial appearance, including face shape, eyes, eyebrows, nose, lips, jawline, natural skin tone, hairstyle, hairline, and hair texture. Do not substitute another person's face or artificially alter his natural appearance. Maintain maximum possible facial identity consistency.
OUTFIT AND APPEARANCE:
Dress him in a luxurious light ivory-colored traditional Indian kurta with intricate, subtle golden embroidery and detailed woven patterns. Pair it with elegant dark brown or charcoal traditional trousers and classic beige ethnic footwear. The clothing should look premium, natural, and beautifully textured.
POSE AND ACTION:
Show him standing gracefully beside a tall, antique-style brass oil-lamp stand. He is carefully lighting one of the small flames using a traditional lighting taper. One hand holds the taper close to the lamp, while the other hand gently supports the decorative brass lamp plate. His head is slightly lowered, with his eyes focused on the flame, creating a peaceful and genuine festive expression.
BACKGROUND AND DECORATION:
Create a beautiful, luxurious outdoor-style Diwali courtyard or decorated terrace. Include elegant hanging ornamental lanterns, glowing warm-white fairy lights, orange and yellow marigold flower garlands arranged across the ceiling, decorative floral arrangements, and numerous small illuminated candles.
Add colorful traditional rangoli artwork made from vibrant flower petals and colored powders on the floor, especially around the base of the brass lamp. Include beautifully arranged flower decorations and traditional festive details throughout the environment.
LIGHTING AND ATMOSPHERE:
Use warm amber and golden cinematic lighting. The tiny flames should produce realistic reflections on the brass lamp and softly illuminate the person's face and clothing. Create a beautiful balance between warm decorative lights and the darker background, with natural shadows and realistic depth.
CAMERA AND COMPOSITION:
Vertical 9:16 portrait format, full-body photography, eye-level camera perspective, subject positioned prominently in the center, with the entire brass lamp visible from its base to the top. Keep the rangoli and decorative background clearly visible. Professional DSLR photographic quality, realistic skin texture, detailed embroidery, natural anatomy, sharp focus, and cinematic depth of field.
FINAL QUALITY REQUIREMENTS:
The final image must look like an authentic high-end festive photoshoot rather than an illustration or artificial digital artwork. Keep the person's real face and original hairstyle recognizable. Avoid distorted fingers, incorrect hand positions, unnatural facial features, excessive skin smoothing, or unrealistic lighting. Prioritize facial identity, photographic realism, and traditional Diwali elegance.`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEja4ufCjjJj7LMxNF2e8Q8rnbGTt6xnCNz2clrgsajusGKoDLCSAEVDNuX49blc50k2UtYpQ3BTBSE95a6tA6LZ0jeA1q7LavBeCXb1wdvOyPEcezM74Hxb7ymcGtAA12roymGFSYIIhdv0DW-lxiIs9AbSz9gu4M1v-Pgn879KV3v4Dj3-Q3TSqphw1ho/s1600/image.png',
    tags: [
      'Boys',
      'Diwali',
      'Diwali prompt for boys',
      'Diwali boys prompt',
      'Boys Diwali prompt',
      'Diwali prompt',
      'Best Diwali prompt',
      'Best Diwali prompt for boys',
      'Diwali AI photo editing prompt',
      'Ivory Kurta',
      'Brass Lamp',
      'Rangoli',
      'Trending',
      'ChatGPT',
      'Gemini',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '9:16',
    model: 'ChatGPT / Gemini',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'diwali-prompt-for-boys-cream-silk-dupatta',
    title: 'Diwali prompt for boys – Cream Silk Dupatta Rooftop Fireworks AI Photo',
    category: 'Boys',
    description: `# Diwali Prompt for Boys: Cream Silk Dupatta Rooftop Fireworks Guide

Create an ultra-realistic 4K cinematic full-body portrait on a spacious rooftop terrace during Diwali night, dressed in a cream kurta with a flowing silk dupatta draped across your shoulder, holding a small glowing clay diya under spectacular golden fireworks.

## What Is This AI Photo Editing Prompt?
This prompt captures modern festive royal charm. Standing in a relaxed, confident pose with one leg crossed in front of the other, you hold a traditional clay diya on an illuminated rooftop terrace while colorful fireworks burst across the deep night sky.

## Step-by-Step Tutorial: How to Create This Photo

### Step 1: Select Your Personal Photo
Choose a clear, front-facing portrait or selfie showing your natural skin tone, facial proportions, and original hairstyle.

### Step 2: Open ChatGPT or Google Gemini
Launch ChatGPT (GPT-4o image generation) or Google Gemini on your device.

### Step 3: Upload Your Face Reference
Attach your personal photograph to the prompt box.

### Step 4: Copy the AI Prompt
Click the **Copy** button below. Wait 5 seconds for the countdown, and the complete prompt will be copied to your clipboard.

### Step 5: Paste & Generate
Paste the prompt into the message box alongside your uploaded photo. Request a vertical 9:16 portrait.

### Step 6: Review & Download
Check the flowing silk texture, gentle flame reflections on your fingers, and realistic fireworks in the sky. Download your 4K portrait!

---

## SEO Keywords & Search Tags
Diwali prompt for boys, Diwali boys prompt, Boys Diwali prompt, Diwali prompt, Best Diwali prompt, Best Diwali prompt for boys, Diwali AI photo editing prompt, Silk dupatta kurta AI photo, Rooftop fireworks Diwali AI photo, Modern festive boys portrait, ChatGPT Diwali prompt, Gemini Diwali prompt`,
    prompt: `Create an ultra-realistic 4K cinematic full-body portrait of the person in the uploaded personal reference photograph.
FACE AND HAIR PRESERVATION:
Use the uploaded photograph as the sole facial identity reference. Maintain his original facial structure, eyes, eyebrows, nose, lips, jawline, natural skin tone, hairstyle, hairline, and hair texture. Do not replace, reshape, beautify, or modify his real face. Preserve his recognizable identity with maximum possible accuracy.
OUTFIT AND STYLING:
Dress him in an elegant cream-colored traditional kurta with a matching flowing silk dupatta draped gracefully over one shoulder. Add matching cream pajama trousers and clean white sneakers. The silk fabric should have realistic folds, a soft luxurious texture, and subtle natural highlights.
POSE AND EXPRESSION:
Position him confidently in the center of a spacious modern rooftop terrace. His legs are casually crossed, creating a relaxed and stylish full-body pose. He gently holds a small traditional clay lamp in one hand while resting the other hand naturally near his waist. His expression is calm, confident, and natural, with his eyes looking directly toward the camera.
BACKGROUND AND ENVIRONMENT:
Create a beautiful nighttime rooftop atmosphere with a deep black sky illuminated by spectacular golden fireworks. Decorate the terrace railing with warm glowing fairy lights arranged in elegant patterns. Add subtle decorative floor lighting and colorful geometric floral artwork on the terrace floor. The environment should feel spacious, sophisticated, and festive.
LIGHTING AND VISUAL DETAILS:
The small flame in his hand should produce a gentle golden glow across his fingers and clothing. Combine this with soft ambient terrace lighting and realistic fireworks illumination. Maintain natural skin tones, realistic shadows, detailed fabric textures, and balanced cinematic exposure.
CAMERA AND QUALITY:
Vertical 9:16 composition, complete head-to-toe framing, professional DSLR photography, realistic human anatomy, sharp facial details, cinematic depth of field, natural proportions, premium 4K photographic quality, and lifelike environmental details.
STRICT FINAL INSTRUCTIONS:
The uploaded personal photograph determines the person's real face and hairstyle. Do not generate a different identity. Avoid facial alterations, distorted hands, extra fingers, artificial skin smoothing, incorrect body proportions, or cartoon-like effects. The final output must look like an authentic professional nighttime portrait.`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgagzTUZHaOl6WpbQ0DqIUwZQrdzrgNz60aSW0VVR9WXNyM74VP7wY1JKd7wsCPP0vyHtXitssXOWj5gpH01zXzP41B9c4jiZy4znAAz_fdc6Zf5_NFRkcw_Ax1I2j4GYKwRiHtnWHnCOkP30UqPeVdn1J8GbXrmY2p53iu40YwtHL_pLDuDr4yZKGdA-Y/s1600/image.png',
    tags: [
      'Boys',
      'Diwali',
      'Diwali prompt for boys',
      'Diwali boys prompt',
      'Boys Diwali prompt',
      'Diwali prompt',
      'Best Diwali prompt',
      'Best Diwali prompt for boys',
      'Diwali AI photo editing prompt',
      'Silk Dupatta',
      'Cream Kurta',
      'Rooftop Fireworks',
      'Trending',
      'ChatGPT',
      'Gemini',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '9:16',
    model: 'ChatGPT / Gemini',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'diwali-sparkler-prompt-for-boys',
    title: 'Diwali prompt for boys',
    category: 'Boys',
    description: `# How to Create a Realistic Diwali Festival Fireworks AI Photo Using Your Own Picture

Learn how to create an ultra-realistic, cinematic Diwali celebration portrait holding a glowing sparkler (phooljhadi) with stunning fireworks and 3D metallic "Happy Diwali" lettering in the background using ChatGPT (GPT-4o) or Google Gemini with your own reference photograph.

## What Is This AI Photo Editing Prompt?

This Diwali AI photo editing prompt places you on an authentic festive rooftop terrace at night with glowing clay diyas, holding a sparkling phooljhadi in a crisp pure-white embroidered kurta, while preserving 100% of your real facial identity, hairstyle, and expression.

## Step-by-Step Tutorial: How to Create This Photo

### Step 1: Select Your Reference Photo
Choose a clear, front-facing personal photo or selfie where your face, hairstyle, skin tone, and natural expression are well lit and clearly visible.

### Step 2: Open ChatGPT or Google Gemini
Open ChatGPT (with GPT-4o image generation) or Google Gemini on your smartphone or computer, and ensure the image upload feature is active.

### Step 3: Upload Your Photo
Attach your personal photograph to the chat message box so the AI model can analyze your facial structure, features, and authentic identity.

### Step 4: Copy the AI Prompt
Click the **Copy** button below. Wait 5 seconds for the security countdown to finish, and the complete English prompt will be copied to your clipboard.

### Step 5: Paste and Generate
Paste the copied prompt into the message box alongside your uploaded photo. Instruct the AI to generate a vertical full-length portrait (3:4 or 9:16 aspect ratio).

### Step 6: Review & Save
Examine the face fidelity, sparkling light reflections, and background festive fireworks. Once satisfied, download your ultra-realistic 4K festive Diwali photo and share it on Instagram, WhatsApp, or Facebook!

---

## Key Highlights of This Prompt
- **Face & Hair Identity Preservation:** Maintains your exact facial structure, skin tone, eyebrows, lips, and hairstyle without artificial distortion.
- **Outfit & Posing:** Elegant Indian pure-white kurta pajama with clean white sneakers in a natural, relaxed leaning pose.
- **Festive Atmosphere:** Glowing sparkler (phooljhadi), illuminated clay oil lamps (diyas), and colorful night fireworks.
- **3D Typography:** Sophisticated 3D metallic gold "Happy Diwali" typography in the upper background.

---

## SEO Keywords & Tags
Diwali prompt for boys, Diwali AI Photo Prompt, Diwali Sparkler AI Photo, Phooljhadi Diwali AI Prompt, Happy Diwali 3D AI Photo, ChatGPT Diwali Prompt, Gemini Diwali Prompt, Realistic Indian Festival AI Photo, Boys Kurta Diwali Photo Editing`,
    prompt: `Create an ultra-realistic, premium-quality 4K cinematic festive photograph using the uploaded reference photo as the primary identity reference.
Face & Hair Identity Preservation:
Reproduce the exact same person from the uploaded reference photo. Preserve his original facial structure, facial proportions, eyes, eyebrows, nose, lips, jawline, skin tone, hairstyle, hair texture, and natural facial expression. His face and hair must remain completely recognizable and consistent with the reference image. Do not replace, redesign, beautify, or artificially modify his facial appearance. Prioritize authentic identity preservation over artistic styling.
Pose & Clothing:
Show him standing naturally on a beautifully decorated terrace during Diwali night. He is wearing an elegant, traditional, pure-white Indian kurta with matching white pajama trousers and clean white sneakers. One hand holds a brightly glowing phooljhadi (sparkler), while his other hand rests casually inside his pajama pocket. His body posture is relaxed, with one leg slightly crossed in front of the other. He looks down at the sparkling light with a genuine, joyful smile.
Background & Festive Atmosphere:
Create a breathtaking night sky filled with colorful, realistic fireworks in golden, silver, blue, and subtle pink shades. A beautiful stone terrace railing runs behind him, decorated with multiple glowing traditional clay diyas. Additional illuminated diyas are scattered naturally across the terrace floor, creating a warm and authentic festive environment.
Typography:
Add the exact words "Happy Diwali" in large, elegant, three-dimensional metallic gold lettering in the upper background. Use sophisticated decorative typography with realistic golden reflections and subtle glowing highlights. Keep the text clearly readable without covering the person's face.
Photography & Quality:
Professional DSLR photography, cinematic composition, realistic human anatomy, natural skin texture, authentic facial details, detailed fabric texture, realistic fireworks illumination, warm golden ambient lighting, beautiful depth of field, balanced exposure, lifelike shadows, rich festive colors, high dynamic range, and exceptionally realistic details.
Important: The final result must look like a genuine professional photograph, not a digital painting, cartoon, or artificial-looking AI portrait. Maintain the original person's real face and hairstyle with maximum identity consistency.`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgankApmajhvzriG4_RFThRuV5LOmYqNzm3lLqNIBE4w7rfPLV7l54gyTplnBwrnBGDkgzjkCTAcd-bO6iuyYJXbODZqeYysOjbVfsCg8QSpwJHXejtQrfJ6knIkDcBPWsh8-CT-4YpRHT6zfq0gPFAIkLSmyunp5vbcko1Kns-By8BaSCqGvQgcCX5vD8/s1600/image.png',
    tags: [
      'Boys',
      'Diwali',
      'Diwali AI photo editing prompt',
      'Sparkler',
      'Fireworks',
      'Festival',
      'Kurta',
      'Cinematic',
      'ChatGPT',
      'Gemini',
      'Trending',
      'Diya',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'diwali-prompt-for-boys',
    title: 'Diwali prompt for boys',
    category: 'Boys',
    description: `# How to Create a Realistic Diwali Festival AI Photo Using Your Own Picture

Learn how to create an ultra-realistic, cinematic Diwali celebration portrait using ChatGPT or Google Gemini with your own reference photograph. Follow this simple step-by-step tutorial to create a stunning festive portrait with glowing diyas, fairy lights, marigold decorations, and an elegant kurta outfit.

## What Is This AI Photo Editing Prompt?

This is a specially crafted AI photo editing prompt designed for celebrating Diwali (the Festival of Lights). It places you on a beautifully decorated balcony at night holding a traditional glowing clay diya, surrounded by fairy lights and vibrant marigold flowers, while preserving 100% of your authentic facial identity and features.

## What You Need Before Creating the Image

- A clear, front-facing personal photo or selfie.
- ChatGPT (GPT-4o / Image Generation) or Google Gemini.
- The Diwali AI Photo Prompt provided below.
- A stable internet connection.

## Step-by-Step: How to Create This AI Photo

### Step 1: Select Your Personal Photo
Choose a clear, well-lit photograph of yourself where your face and natural expression are clearly visible. Avoid dark, heavily blurred, or heavily filtered photos.

### Step 2: Open ChatGPT or Google Gemini
Open ChatGPT or Google Gemini on your smartphone or computer. Select the image generation or photo editing feature that supports reference photo uploads.

### Step 3: Upload Your Face Reference
Attach your personal picture to the chat prompt box so the AI can analyze your facial structure, skin tone, hair, and facial features.

### Step 4: Copy the AI Prompt
Click the **Copy** button on this page (wait 5 seconds for the countdown) to copy the complete English prompt text.

### Step 5: Paste and Generate
Paste the prompt into the message box alongside your uploaded photo. Ask the AI to generate a vertical full-body portrait (3:4 or 9:16 aspect ratio).

### Step 6: Review & Save
Check the face, hands, clay diya lighting, and kurta details. Once satisfied, download your ultra-realistic 8K festive Diwali celebration photo!

---

## SEO Keywords & Google Search Indexing Tags
Diwali AI Photo Prompt, Diwali AI Image Prompt, Diwali Photo Editing, Boys Diwali AI Photo, Diwali Festive Kurta AI Photo, Diwali Balcony Diya Photo Prompt, Realistic Diwali AI Photo, ChatGPT Diwali Prompt, Gemini Diwali Prompt, AI Festival Photo Editing, Indian Festival AI Photo Prompt, Diwali Portrait AI Prompt`,
    prompt: `Create an original, ultra-realistic cinematic Diwali celebration portrait using the uploaded photograph as the facial reference.
Facial Identity Preservation: Maintain the reference person's recognizable facial identity, natural skin tone, facial structure, hairstyle, eyes, nose, lips, beard, and genuine expression. Do not apply beauty filters or artificially modify facial features.
Scene & Composition: Capture a full-body portrait of a young Indian man standing confidently on a beautifully decorated apartment balcony at night. He wears an elegant ivory-white embroidered kurta pajama, a stylish red-and-black wristwatch, and no footwear. His posture is relaxed, with one leg naturally crossed over the other while leaning gently against the balcony railing.
Festive Action: He holds a traditional handmade clay diya in one hand and carefully lights its wick with the other. His face displays a natural, joyful smile as he celebrates the festival of lights.
Environment: Decorate the balcony with glowing golden fairy lights, vibrant orange and yellow marigold flower arrangements, traditional clay oil lamps along the railing and floor, decorative lanterns, and elegant green plants. Include a softly illuminated nighttime cityscape in the distance.
Photography Style: Professional full-frame DSLR photography, realistic skin texture, detailed fabric embroidery, natural body proportions, cinematic golden-hour-inspired lighting at night, beautiful warm reflections, soft background bokeh, balanced highlights, realistic shadows, shallow depth of field, premium editorial photography, ultra-detailed 8K appearance.
Important: Keep the composition natural and visually believable. Avoid artificial skin smoothing, distorted hands, extra fingers, incorrect anatomy, duplicated objects, cartoon effects, watermarks, logos, and unwanted text.
Create a completely original photographic composition.`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAO929HdP61AHpFttEvtfAFMNfp5Di3s1Hb8eGEkU_uwLBhnYPS53UGk6G_6pl7_kE4wtNgcldADU77nGBa6jbsdmQv8Tqx3R6CuKofZQyfZ_TI9CvHhbVmFXD6ggCtN-aklUE2Unz5-Gt8k6TOvftr0s7TpBEUgfpiponm3BATw60PLWqXUDSI1J3nhuR/s1600/image.png',
    tags: [
      'Boys',
      'Diwali',
      'Diwali AI photo editing prompt',
      'Festival',
      'Kurta',
      'Cinematic',
      'ChatGPT',
      'Gemini',
      'Trending',
      'Diya',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'orUmpTSCFTyOAc9HOMhV',
    title: 'Black & White Luxury Car Photoshoot AI Prompt – Create Ultra Realistic Mahindra Scorpio Portrait with ChatGPT & Gemini',
    category: 'Boys',
    description: `# How to Create a Black & White Luxury Car Photoshoot Using AI

Want to transform your ordinary portrait into a stunning luxury car photoshoot? With this Black & White Luxury SUV AI Photo Prompt, you can create a cinematic automotive fashion photograph featuring a glossy black Mahindra Scorpio, stylish streetwear, dramatic tree reflections, and a professional top-down aerial camera angle.

This AI photo editing prompt is designed to help you create an ultra-realistic portrait while using your own uploaded photograph as the identity reference.

## What Is This AI Photo Editing Prompt?

This is a specially written AI image generation prompt for creating a luxury automotive photoshoot. It combines black and white cinematic photography, realistic vehicle details, modern fashion styling, and dramatic aerial composition.

The final image features a person sitting confidently on the bonnet of a black SUV, with an open car door, a takeaway drink cup, gravel surroundings, and beautiful natural tree reflections.

## What You Need Before Creating the Image

Before starting, prepare the following:

- A clear personal portrait or selfie.
- ChatGPT with image generation or editing capabilities.
- Alternatively, Google Gemini with image generation capabilities.
- The AI prompt provided below.
- A stable internet connection.

## Step-by-Step: How to Create This AI Photo

### Step 1: Select Your Personal Photo

Choose a clear photograph of yourself. For the best results, use a front-facing or slightly angled portrait where your face is visible.

Avoid heavily blurred photographs, dark selfies, or images with objects covering your face.

### Step 2: Open an AI Image Generator

Open ChatGPT or Google Gemini. Select an image generation or image editing feature that supports uploading reference photographs.

### Step 3: Upload Your Reference Image

Upload your original photograph to the AI image generator.

The reference image will help the AI understand your facial features, hairstyle, skin tone, and natural appearance.

### Step 4: Copy the AI Photo Editing Prompt

Copy the complete Black & White Luxury SUV Photoshoot AI Prompt provided below.

Paste it into the AI image generator's message box along with your uploaded reference image.

### Step 5: Generate Your Luxury Car Photoshoot

Ask the AI to generate the image using a vertical 9:16 composition.

The AI will attempt to create a cinematic photograph showing you sitting on a glossy black Mahindra Scorpio SUV, wearing a white oversized T-shirt, baggy jeans, black-and-white sneakers, and sunglasses.

### Step 6: Review and Improve Your Image

After generation, carefully check the face, hands, clothing, car details, reflections, and license plate.

If any details are incorrect, ask the AI to regenerate or correct those specific areas while keeping your original facial identity.

### Step 7: Save Your Final Image

When you are satisfied with the result, save the generated image to your device. You can use it as a social media profile picture, Instagram post, or personal photography project, subject to the AI platform's usage terms.

## Best AI Tools for This Photoshoot

You can try this prompt with:

- ChatGPT Image Generation
- Google Gemini AI Image Generation
- Leonardo AI
- Other AI image generators that support reference-image uploads.

Features and results may vary depending on the platform and its available tools.

## Important Tips for Better AI Photo Results

1. Always upload a clear reference photograph.
2. Use the complete prompt instead of removing important instructions.
3. Keep the 9:16 portrait aspect ratio.
4. Ask the AI to preserve your original facial identity.
5. Check the vehicle's proportions and facial details.
6. Avoid using low-resolution reference photographs.

## Frequently Asked Questions (FAQs)

**1. Can I use my own photo for this AI photoshoot?**

Yes. Upload your own clear portrait as a reference image and use the provided prompt.

**2. Can I create this image with ChatGPT?**

Yes, if image generation or image editing is available on your account.

**3. Does this prompt work with Google Gemini?**

You can use it with Gemini features that support image generation using uploaded reference images.

**4. Is this an AI-generated black and white photography style?**

Yes. The prompt requests a cinematic monochrome appearance with deep blacks, bright whites, natural shadows, and realistic reflections.

**5. Can I change the car or outfit?**

Yes. You can modify the vehicle model, clothing, background, or camera angle according to your preferences.

## Final Words

Creating a professional-looking luxury car photoshoot no longer requires an expensive camera or a professional photography studio. With this Black & White Luxury SUV AI Photo Prompt, you can experiment with cinematic automotive photography using your own reference image.

Copy the prompt, upload your photo, follow the instructions, and create your own stylish AI-generated luxury car portrait.

**Note:** AI-generated results may vary. Always review the final image and follow the image generator's terms regarding commercial use and intellectual property.`,
    prompt: `SUBJECT & IDENTITY PRESERVATION:
Use the uploaded reference photo as the identity reference for the subject. Preserve the person's recognizable facial features, natural face shape, skin tone, hairstyle, beard, and overall appearance. Do not substitute another person's face or unnecessarily modify their identity.
MAIN SCENE:
Create an ultra-realistic, cinematic black-and-white automotive fashion photograph featuring the person sitting confidently on the front bonnet of a luxurious black SUV, inspired by a dramatic top-down editorial photography aesthetic.
CAMERA & COMPOSITION:
- Direct overhead aerial drone photography.
- Almost perfectly vertical top-down camera angle.
- Portrait 9:16 aspect ratio.
- Show the entire SUV from roof to front bumper.
- Keep the person clearly visible and naturally proportioned.
- Professional luxury automotive editorial composition.
OUTFIT & APPEARANCE:
- Oversized plain white luxury streetwear T-shirt with elegant original typography reading "HERMES PARIS".
- Loose-fitting light-wash baggy denim jeans.
- Black-and-white premium sneakers.
- Stylish black sunglasses.
- Naturally messy, voluminous hairstyle.
- Realistic natural beard and facial details.
- Black wristwatch.
POSE & VEHICLE DETAILS:
The person is sitting casually on the bonnet of a glossy black Mahindra Scorpio SUV, with one leg slightly bent and the other relaxed forward. One hand rests naturally on the knee while the other rests casually near the thigh.
The SUV must have:
- Glossy black exterior.
- Clearly visible front grille and headlights.
- Realistic roof rails.
- Driver-side front door opened outward.
- Realistic windshield and side mirrors.
- A white takeaway cold-drink cup placed on the bonnet.
- A clearly readable fictional license plate displaying "DL00MM0000".
ENVIRONMENT:
A natural outdoor gravel parking area with small stones and uneven ground. Large tree branches and leaves create beautiful natural shadows and reflections across the glossy black roof, windshield, and bonnet.
LIGHTING & PHOTOGRAPHY:
Natural daylight, realistic environmental reflections, detailed textures, cinematic shadows, professional DSLR photography, sharp focus, realistic skin texture, accurate anatomy, physically correct perspective, and premium editorial styling.
COLOR GRADING:
Pure monochrome black-and-white photography. Deep rich blacks, bright whites, balanced grayscale midtones, dramatic contrast, and subtle cinematic film grain. Absolutely no artificial color tint.
QUALITY & REALISM:
Ultra-photorealistic, highly detailed, professional automotive fashion photography, realistic human anatomy, natural hands and fingers, accurate vehicle geometry, authentic reflections, 8K-quality detail.
IMPORTANT INSTRUCTIONS:
Create an original photographic composition. Do not copy any existing photographer's photograph, watermark, logo artwork, or copyrighted image. Use the uploaded photo only as a personal identity reference. Avoid distorted facial features, extra fingers, unnatural body proportions, blurry details, or artificial-looking textures.
ASPECT RATIO: 9:16`,
    imageUrl: '/assets/aistudio/image_615815aa.png',
    tags: ['Boys', 'Automotive', 'Monochrome', 'SUV', 'Streetwear', 'TopDown', 'Trending'],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '9:16',
    model: 'ChatGPT / Gemini',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ry1YS0nVUaA7flw02c7J',
    title: 'Jailer 2 AI Photo Prompt – Create Realistic Boys AI Photos with ChatGPT & Gemini',
    category: 'Boys',
    description: `# How to Create Jailer 2 AI Photo Using AI

Learn how to create a realistic Jailer 2 AI photo using your own picture. Follow this easy step-by-step tutorial with ChatGPT and Google Gemini to create stylish hairstyles and cinematic movie-poster backgrounds.

Create your own stunning Jailer 2 cinematic movie-style photograph using ChatGPT or Google Gemini. You don't need professional photography skills or advanced photo editing knowledge. Just follow the simple steps below.

## Step-by-Step: How to Create This AI Photo

### Step 1: Select Your Clear Face Photo
Choose a clear photograph of yourself. Even if you have short hair, shaved head, or baldness, this prompt is specially instructed to transform your hairstyle into a thick, modern, wavy textured cut with natural volume while keeping 100% of your authentic facial identity intact.

### Step 2: Open ChatGPT or Google Gemini
Launch ChatGPT (GPT-4o / Image Generation) or Google Gemini.

### Step 3: Upload Your Face Reference
Attach your personal picture to the AI chat prompt box.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above to copy the complete English prompt instructions.

### Step 5: Generate & Review
Paste the prompt and ask the AI to generate a vertical 3:4 or 9:16 portrait. Review the lighting, cinema banner, and realistic reflections, then save your high-resolution movie-premiere photo!

---

## SEO Keywords & Google Search Indexing Tags
Jailer 2 AI Photo Prompt, Jailer 2 AI Image Prompt, Jailer 2 Photo Editing, Jailer 2 AI Photo Editing Prompt, Jailer 2 Movie Poster AI Prompt, Boys AI Photo Prompt, Boys AI Image Prompt, Boys Photo Editing Prompt, Boys AI Photo Editing, Boys Stylish Photo Prompt, Boys Cinematic AI Photo, Boys New Hairstyle AI Prompt, AI Photo Prompt, AI Image Prompt, AI Photo Editing Prompt, Best AI Prompts, Realistic AI Photo Prompt, Cinematic AI Image Prompt, DSLR AI Photo Prompt, Ultra Realistic AI Photography, AI Portrait Prompt, AI Face Reference Prompt, ChatGPT AI Photo Prompt, ChatGPT Image Prompt, ChatGPT Photo Editing Prompt, ChatGPT Image Generation Prompt, ChatGPT Boys Photo Prompt, Gemini AI Photo Prompt, Gemini AI Image Prompt, Gemini Photo Editing Prompt, Gemini Boys Photo Prompt, Google Gemini Image Generation Prompt, How to Create Jailer 2 AI Photo, Jailer 2 Photo Prompt Copy Paste, Create Movie Poster AI Photo, AI Photo Prompt for Bald Men, AI Hair Style Change Prompt, Realistic Movie Theatre Photo Prompt, AI Photo Editing Using Own Face.`,
    prompt: `Create an ultra-realistic, cinematic DSLR photograph using the uploaded image as the face reference. Show the same young man from the reference photo standing confidently outside a luxurious Indian multiplex cinema on 15 October 2026, in front of a massive, spectacularly illuminated JAILER 2 movie promotional billboard.
1. STRICT FACE IDENTITY LOCK
Preserve the person's original facial identity as accurately as possible, including facial structure, skin tone, eyes, eyebrows, nose, lips, jawline, and natural facial expression. Do not replace, redesign, beautify, or artificially modify the face. The person must remain recognizable as the same individual in the uploaded photograph.
2. STYLISH HAIRSTYLE TRANSFORMATION — VERY IMPORTANT
Regardless of the person's actual hairstyle, baldness, shaved head, or lack of hair in the uploaded reference photo, generate a naturally full head of thick, healthy, attractive, stylish hair.
Give the person a modern, premium hairstyle featuring:
- Thick, naturally voluminous hair.
- A stylish, slightly wavy textured hairstyle.
- A fashionable front fringe with natural volume.
- Neatly styled sides and a modern haircut.
- Realistic individual hair strands and natural hair density.
- A youthful, attractive hairstyle that perfectly suits the person's face shape.
Do not preserve a bald head, completely shaved head, or receding hairline. The newly generated hairstyle must look completely natural and professionally styled.
IMPORTANT: Change only the hairstyle. Never change the original facial identity or facial structure.
3. CINEMATIC ENVIRONMENT
Create a realistic Indian cinema entrance at night, featuring a gigantic illuminated LED movie billboard, elegant glass entrance doors, glowing theatre signage, red neon lighting, warm golden illumination, and a lively crowd of moviegoers. Include realistic reflections on the polished cinema floor.
4. POSE AND FASHION
The young man is standing naturally in a relaxed, confident pose, facing the camera with a friendly smile. One hand is casually placed inside his trouser pocket, while the other rests naturally beside his body.
Dress him in:
- A premium black button-up shirt with slightly rolled sleeves.
- Stylish black trousers.
- Fashionable black-and-white sneakers.
- A subtle silver necklace.
- An elegant wristwatch.
Maintain realistic body proportions and natural clothing folds.
5. JAILER 2 MOVIE BILLBOARD
Behind him, display an enormous dramatic action-movie promotional poster featuring an older, powerful male action-star character wearing black sunglasses and a dark outfit.
Use smoky textures, deep black backgrounds, fiery red accents, golden highlights, and bold distressed cinematic typography.
The movie title must read:
"JAILER 2"
Add a smaller promotional line:
"THE NEXT CHAPTER BEGINS"
Include a prominent illuminated cinema banner displaying:
"NOW SHOWING — 15 OCTOBER 2026"
All poster text must be visually clear, correctly spelled, and professionally integrated into the billboard.
6. LIGHTING AND PHOTOGRAPHY
Professional full-frame DSLR photography, 85mm portrait lens aesthetic, realistic skin pores, highly detailed facial features, natural shadows, cinematic depth of field, balanced highlights, HDR quality, realistic reflections, and premium Hollywood-style color grading.
7. STRICT REALISM REQUIREMENTS
Maintain natural human anatomy, accurate body proportions, realistic hands and fingers, properly positioned feet, natural clothing folds, realistic hairstyle, and seamless integration between the person and the environment.
Avoid artificial skin, distorted facial features, extra fingers, baldness, unnatural hair, blurry facial details, floating feet, and cartoon-like effects.
8. COMPOSITION
Vertical 3:4 portrait orientation, full-body photograph. Keep the entire person visible from head to shoes while ensuring the massive JAILER 2 billboard remains clearly visible in the background.
FINAL RESULT
Create an incredibly realistic, premium cinematic photograph that looks like an actual professional DSLR photograph taken during a major Indian movie premiere celebration on 15 October 2026.
The person must have a completely natural, thick, stylish modern hairstyle, regardless of whether the original reference photo shows a bald head. Preserve the person's original facial identity while transforming the hairstyle and creating a stunning cinematic movie-premiere atmosphere.`,
    imageUrl: '/assets/aistudio/image_ad502c62.png',
    tags: [
      'Boys',
      'Jailer 2',
      'Cinema',
      'Movie Poster',
      'ChatGPT',
      'Gemini',
      'Trending',
      'Hairstyle',
      'DSLR',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: new Date().toISOString(),
  },
];
