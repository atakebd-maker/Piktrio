import { CategoryItem, PromptItem, CollectionInfo } from '../types/prompt';

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
  { id: 'boys', name: 'Boys', description: 'AI photo editing prompts for boys and men' },
  { id: 'diwali', name: 'Diwali', description: 'Festive Diwali AI photo editing prompts for boys' },
];

export const STRICT_IDENTITY_PROMPT_SUFFIX = `**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**`;

export const ensureIdentityPromptSuffix = (promptText: string): string => {
  if (!promptText) return STRICT_IDENTITY_PROMPT_SUFFIX;
  if (promptText.includes('STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION')) {
    return promptText;
  }
  return `${promptText.trim()}\n\n${STRICT_IDENTITY_PROMPT_SUFFIX}`;
};

export const COLLECTIONS_LIST: CollectionInfo[] = [
  {
    id: 'diwali',
    label: 'Diwali AI photo editing prompt',
    slug: 'diwali-ai-photo-editing-prompt',
    cat: 'diwali',
    title: 'Diwali AI Photo Editing Prompts Collection',
    description: 'Explore the complete viral collection of royal Diwali ethnic kurta, navy blue sherwani, palace courtyard, sparklers, and festive night fireworks prompts for ChatGPT and Google Gemini with 100% natural facial identity preservation.',
  },
  {
    id: 'boys',
    label: 'AI Photo Prompts for Boys',
    slug: 'ai-photo-prompts-for-boys',
    cat: 'boys',
    title: 'AI Photo Prompts for Boys & Men Collection',
    description: 'Trending, ultra-realistic portrait prompts for boys including Mahindra Thar SUV, Korean messy hairstyles, luxury street fashion, and cinematic photography for ChatGPT & Gemini.',
  },
  {
    id: 'trending',
    label: 'Trending AI Photo Prompts',
    slug: 'trending-ai-photo-prompts',
    cat: 'trending',
    title: 'Trending Viral AI Photo Editing Prompts Collection',
    description: 'The most popular, highly shared, and viral AI photo editing prompts across social media platforms, curated for instant copy-paste into ChatGPT and Google Gemini.',
  },
];

export const STORE_PROMPTS: PromptItem[] = [
  {
    "id": "cinematic-sunset-portrait-horse-thar-suv",
  "title": "Cinematic Sunset Portrait with a Horse and Black Thar SUV",
  "category": "Boys",
  "description": "# Cinematic Sunset Portrait with a Horse and Black Thar SUV Guide\n\nCreate an ultra-realistic, cinematic outdoor lifestyle photoshoot portrait sitting casually on the front hood of a rugged black Mahindra Thar SUV alongside a magnificent dark brown horse during golden hour sunset using ChatGPT (GPT-4o) or Google Gemini.\n\n## Important Rules for Uploading Your Personal Photo\n- **High Resolution:** Upload a sharp, high-definition front or slight three-quarter portrait of yourself.\n- **Natural Beard & Moustache:** Your natural facial structure, jawline, and natural facial hair (beard/moustache) will be preserved 100% faithfully.\n- **Clear Lighting:** Natural or soft indoor lighting without heavy beauty filters or face obstructions.\n\n---\n\n## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini\n\n### Step 1: Prepare Your Personal Photo\nSelect a clear photograph of your face showing your authentic facial structure and hairstyle.\n\n### Step 2: Open ChatGPT or Google Gemini\nLaunch ChatGPT (GPT-4o image generation mode) or Google Gemini on your smartphone or PC.\n\n### Step 3: Upload Your Face Photo\nAttach your reference photo to the chat prompt window.\n\n### Step 4: Copy the AI Prompt\nClick the **Copy Full Prompt** button above. Wait for the countdown, then click **Click to Copy Now** to copy the full prompt.\n\n### Step 5: Send Prompt & Review\nPaste the prompt into the message box alongside your uploaded photo. Instruct the AI to generate a vertical 4:5 cinematic outdoor portrait.\n\n### Step 6: Download Your Masterpiece\nDownload your ultra-realistic 8K photograph featuring you on the hood of the Mahindra Thar with the beautiful brown horse at sunset!\n\n---\n\n## Key Highlights of This Prompt\n- **Authentic Mahindra Thar SUV:** Glossy black body, vertical front grille, rugged all-terrain tire, and headlights.\n- **Majestic Dark Brown Horse:** Muscular neck, dark brown coat, black mane, and authentic leather bridle.\n- **Warm Sunset Golden Hour:** Soft peach and pale orange gradient sky with a glowing golden sun above distant rolling hills.\n\n---\n\n## SEO Keywords & Search Tags\nMahindra Thar AI photo prompt, Boys Thar and horse portrait, cinematic golden hour sunset portrait, ChatGPT boys prompt, Gemini prompt for boys, AI photo editing prompt for boys, 8K ultra realistic automotive portrait.",
  "prompt": "Create an ultra-realistic, cinematic DSLR photograph of a young man sitting casually on the front hood of a rugged black Mahindra Thar SUV, accompanied by a beautiful dark brown horse standing right beside the vehicle. The photograph should look like a naturally captured professional outdoor lifestyle photoshoot during golden hour, with exceptionally realistic details, natural proportions, and warm cinematic color grading.\nPERSON AND APPEARANCE:\nShow a young adult man with a naturally attractive appearance, sitting confidently and comfortably on the front hood of the black SUV. His body is positioned slightly diagonally, with his upper body turned a little toward the left side of the frame. His head is turned toward the left, looking thoughtfully into the distance rather than directly at the camera.\nHe has naturally voluminous, thick, slightly messy curly dark hair with individual curls clearly visible. He is wearing stylish black rectangular sunglasses with dark lenses. His facial expression is calm, confident, relaxed, and natural, with his lips gently closed.\nOUTFIT AND ACCESSORIES:\nHe is wearing a loose-fitting, slightly oversized white linen button-down shirt with the top few buttons left open, creating a relaxed and elegant appearance. The sleeves are casually rolled up to approximately the forearms.\nHe wears loose-fitting dark chocolate-brown trousers with natural fabric folds and realistic creases. On his feet are clean, off-white casual sneakers with visible laces and subtle sole details.\nAccessories include a black wristwatch on his left wrist and a simple red thread bracelet on his right wrist.\nEXACT BODY POSITION AND HAND PLACEMENT:\nThe man is sitting on the front hood of the SUV, slightly toward the right side of the image.\nHis right leg is bent at the knee and raised comfortably, with his right foot resting on the front hood area near the headlight. His left leg hangs downward naturally over the front grille and bumper area, with the left sneaker resting on the front bumper.\nHis right hand rests casually on his raised right knee, with relaxed, naturally curved fingers. His left hand hangs comfortably beside his thigh, resting naturally near his left knee.\nBoth shoulders are relaxed. His back is slightly leaned backward, maintaining a casual yet stylish sitting posture. Every finger, wrist, elbow, knee, ankle, and foot must have anatomically correct proportions and natural positioning.\nTHE HORSE:\nA beautiful, healthy, dark chocolate-brown horse stands immediately beside the left side of the black SUV. Its body is positioned diagonally, with its head facing toward the left side of the photograph.\nThe horse has a dark brown coat, a thick flowing black mane, upright pointed ears, realistic dark eyes, and a natural muscular neck. It wears a dark brown leather bridle with visible metallic buckles, rings, straps, and reins. The horse's head and upper body are clearly visible, with realistic hair texture and natural anatomy.\nThe horse stands calmly and confidently, looking slightly toward the left, creating a beautiful composition alongside the man and vehicle.\nVEHICLE DETAILS:\nA rugged, glossy black Mahindra Thar SUV occupies the lower-right and foreground portion of the photograph.\nThe front of the vehicle faces the camera at a slight angle. Its distinctive round headlights, black vertical front grille, front bumper, rectangular side indicator, windshield, side mirror, hood, and rugged front tire are clearly visible.\nThe word \"THAR\" appears naturally on the front grille area. The vehicle has realistic dusty surfaces, subtle reflections, and authentic outdoor wear.\nThe man is seated on the front hood, while the horse stands immediately beside the vehicle. Maintain the relative positions and proportions of all three subjects.\nBACKGROUND AND ENVIRONMENT:\nThe entire scene takes place in a wide, open countryside landscape with a dry golden-brown grassy field.\nThe ground is covered with short, dry grass, patches of dusty earth, and natural vegetation. In the distant background, there are gently rolling hills and low mountain ranges stretching horizontally across the horizon.\nThe landscape has a warm, peaceful, rural atmosphere with no visible buildings, crowds, traffic, or distracting objects.\nSKY AND SUNSET LIGHTING:\nThe photograph is captured during a beautiful golden-hour sunset.\nThe sky features a soft gradient of warm peach, pale orange, golden yellow, and subtle beige tones, with delicate scattered clouds.\nA bright, round golden sun is positioned low near the right side of the distant horizon, glowing naturally above the hills.\nWarm sunlight illuminates the man's white shirt, the horse's dark brown coat, and the black SUV, producing beautiful golden highlights and soft, realistic shadows.\nThe lighting should feel naturally cinematic, with balanced exposure, warm highlights, and detailed shadows.\nCAMERA ANGLE AND COMPOSITION:\nVertical portrait photography, 4:5 aspect ratio.\nCapture the scene from a slightly low, front-facing three-quarter camera angle, showing the man, the horse, and the front portion of the SUV together.\nThe man should be the primary visual subject, positioned slightly right of center. The horse should occupy the left side of the frame, while the SUV fills the lower foreground and right side.\nKeep the man's entire sitting posture, both legs, and both sneakers visible. Do not crop the horse's head, the man's feet, or important vehicle details.\nThe composition should closely follow a premium cinematic outdoor editorial photograph.\nPHOTOGRAPHIC QUALITY:\nUltra-photorealistic, professional DSLR photography, natural skin texture, realistic facial details, highly detailed curly hair, authentic horse anatomy, realistic leather textures, natural fabric wrinkles, physically accurate shadows, cinematic golden-hour lighting, subtle background depth of field, sharp subject details, professional color grading, high dynamic range, 8K photographic quality.\nThe final image must look like a genuine photograph captured by a professional photographer, not a painting, illustration, 3D render, or artificial-looking AI image\n**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**\n\nUse the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.\n\n**IMPORTANT FACIAL HAIR MATCHING RULE:**\n\nCarefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:\n\n- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.\n- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.\n- If the reference photo has both a beard and a moustache, reproduce both naturally.\n- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.\n- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.\n\nDo not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.\n\nThe generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.\n\n**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**",
  "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHrbOS5TBYO2PTUGQQe83FMtoClSGuEs3CMHxDhVXXtD6Q8XzFrHXPgkbU5ZTw6veuLZCUJb_Z09L5GiwaUC3J-kwOs7B82Ozvjhpo714oLH-iuyT-wYDT0d7mC-d2zOROsqqhO0BjDi0yZ-V5MpagVx-JmmN00IlCAQYKXm6V4NEY7kkmm9_engpBn74W/s1600/image.png",
  "tags": [
    "Boys",
    "Mahindra Thar",
    "Horse",
    "Sunset",
    "Golden Hour",
    "ChatGPT",
    "Gemini",
    "Trending",
    "Ai photo editing prompt for boys"
  ],
  "isPinned": true,
  "isTemplate": false,
  "likesCount": 142,
  "viewsCount": 520,
  "copyCount": 210,
  "aspectRatio": "4:5",
  "model": "ChatGPT / Gemini",
  "createdAt": "2026-11-09T22:00:00.000Z"
},
  {
  "id": "bw-cinematic-portrait-standing-mahindra-thar",
  "title": "Black & White Cinematic Portrait Standing on a Mahindra Thar",
  "category": "Boys",
  "description": "# Black & White Cinematic Portrait Standing on a Mahindra Thar Guide\n\nCreate an ultra-realistic, dramatic monochrome automotive fashion photoshoot standing confidently on the roof of a black Mahindra Thar SUV parked in an open roadside environment with trees and overcast sky using ChatGPT or Google Gemini.\n\n## Important Rules for Uploading Your Personal Photo\n- **Sharp Personal Picture:** Upload a clear photo of your face with distinct eyebrows, eyes, and natural skin tone.\n- **Preserve Facial Hair:** Original beard or moustache is preserved exactly as seen in your photo.\n- **Front Angle:** Face looking forward or slightly three-quarters.\n\n---\n\n## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini\n\n### Step 1: Select Your Clear Photo\nPrepare a high-quality photograph of your face.\n\n### Step 2: Open ChatGPT or Google Gemini\nOpen ChatGPT (GPT-4o) or Google Gemini on your phone or browser.\n\n### Step 3: Attach Your Face Reference\nUpload your photo into the prompt conversation.\n\n### Step 4: Copy the AI Prompt\nClick the **Copy Full Prompt** button above, wait for the countdown, and copy.\n\n### Step 5: Send Prompt & Review\nPaste the prompt into the chat box and generate a vertical 2:3 dramatic black-and-white portrait.\n\n### Step 6: Save Your 8K Editorial Photo\nDownload your timeless, high-contrast automotive fashion photo!\n\n---\n\n## Key Highlights of This Prompt\n- **Standing on Thar Roof:** Powerful fashion pose standing on top of the front roof section above the windshield.\n- **Monochrome Mastery:** Deep rich blacks, balanced midtones, and bright silver-grey highlights with authentic textures.\n- **Overcast Moody Sky:** Dramatic soft clouds with diffused natural lighting and tree reflections.\n\n---\n\n## SEO Keywords & Search Tags\nBlack and white Mahindra Thar photo prompt, boys Thar photoshoot prompt, automotive monochrome portrait, ChatGPT boys prompt, Gemini prompt for boys, AI photo editing prompt for boys.",
  "prompt": "Create an ultra-realistic, professional black-and-white cinematic DSLR photograph of a stylish young man standing confidently on the roof of a black Mahindra Thar SUV. The photograph should recreate a dramatic outdoor automotive fashion photoshoot, with a natural countryside roadside environment, beautiful trees, an overcast sky, and a second SUV parked in the background.\n\n**1. PERSON AND OVERALL APPEARANCE:**\n\nShow a young adult man standing on top of the front roof section of a black Mahindra Thar. His overall appearance should be stylish, naturally confident, relaxed, and fashionable.\n\nHis body is facing mostly toward the camera, while his head is turned slightly toward his left side. He is looking into the distance rather than directly at the camera.\n\nHis posture should look natural and effortless, like a professional fashion model posing during an outdoor automobile photoshoot.\n\n**2. HAIRSTYLE AND FACE:**\n\nThe man has thick, naturally curly, slightly messy dark hair with noticeable volume on top. His curls should look soft, textured, and naturally arranged, with a few loose curls around his forehead.\n\nHe wears stylish dark rectangular sunglasses with black frames and dark lenses.\n\nHis facial expression is calm, serious, confident, and relaxed. His lips are naturally closed, and his face is slightly turned toward the left.\n\nKeep his face realistic, with natural skin texture and authentic facial proportions.\n\n**3. CLOTHING AND OUTFIT:**\n\nHe is wearing a simple, stylish, plain black full-sleeved crew-neck sweatshirt. The sweatshirt has a relaxed fit, slightly loose fabric, and natural folds around the shoulders, arms, waist, and elbows.\n\nThe sleeves are casually pushed or folded slightly upward around the forearms, especially on the arm positioned near his waist.\n\nHe wears light grey, relaxed-fit denim jeans. The jeans have a natural straight-leg silhouette, subtle denim texture, realistic wrinkles around the knees and ankles, and a slightly loose fit.\n\nOn his feet, he wears clean white low-top casual sneakers with white laces, visible stitching, and realistic rubber soles.\n\nThe entire outfit should remain minimal, elegant, and monochromatic.\n\n**4. EXACT BODY POSITION AND STANDING POSTURE:**\n\nThe man is standing directly on the roof of the black Mahindra Thar, above the windshield area.\n\nBoth feet are placed naturally on the roof, approximately shoulder-width apart, with a comfortable amount of space between them.\n\nHis right leg is slightly relaxed, while his left leg supports his body naturally. Both knees remain almost straight but not unnaturally stiff.\n\nHis right hand is placed casually inside the front pocket of his jeans, with his right elbow slightly bent outward.\n\nHis left arm hangs naturally beside his body. His left hand is relaxed near his left thigh, with naturally curved fingers.\n\nHis shoulders are relaxed, and his upper body is upright with a slight natural shift of weight toward one side.\n\nHis head is turned slightly toward the left, creating a confident side-looking pose.\n\nBoth arms, hands, fingers, legs, and feet must have anatomically correct proportions. Do not create extra fingers, distorted limbs, unnatural joints, or floating feet.\n\n**5. MAIN VEHICLE – BLACK MAHINDRA THAR:**\n\nA black Mahindra Thar SUV occupies most of the lower half of the photograph.\n\nThe vehicle is parked on a paved outdoor road, facing directly toward the camera.\n\nIts front design should be clearly recognizable, featuring:\n\n- A distinctive black front grille with multiple vertical slots.\n- Two large round headlights with realistic glass details.\n- A sturdy black front bumper.\n- Two front fog lights.\n- Rectangular front indicators.\n- A wide windshield with realistic reflections of nearby trees.\n- Two visible windshield wipers.\n- A black side mirror.\n- Large rugged all-terrain tires.\n- Dark alloy wheels with detailed spokes.\n- A boxy SUV body with a rugged off-road appearance.\n\nThe manufacturer's small Mahindra branding should appear naturally above the front grille.\n\nA realistic Indian-style vehicle registration plate is visible on the front bumper, similar in placement and appearance to the reference photograph, without making the registration number a focal point.\n\nThe man is standing on the roof of this vehicle, and his shoes are clearly visible resting on the roof panel above the windshield.\n\n**6. SECOND VEHICLE IN THE BACKGROUND:**\n\nAnother dark-colored rugged SUV is parked behind the main Mahindra Thar, toward the right side of the frame.\n\nOnly part of its front section, windshield, hood, grille, and side body should be visible.\n\nIt should appear slightly farther away and partially hidden behind the main vehicle, creating a natural outdoor automobile gathering atmosphere.\n\n**7. BACKGROUND AND SURROUNDINGS:**\n\nThe setting is a quiet outdoor roadside location surrounded by mature green trees and dense natural vegetation.\n\nLarge leafy trees occupy much of the left side and middle background, with branches and leaves spreading naturally across the scene.\n\nSome additional trees and bushes are visible behind the vehicles, creating depth and a beautiful natural environment.\n\nThe road surface is grey, slightly rough, and realistic, with subtle dust and natural outdoor texture.\n\nA few small roadside elements may appear in the far background, but there should be no distracting crowds, buildings, or unnecessary objects.\n\n**8. SKY AND WEATHER:**\n\nThe upper portion of the photograph shows a wide, cloudy overcast sky.\n\nSoft grey clouds cover most of the sky, creating a dramatic and moody atmosphere.\n\nThere is no visible bright sunlight or colorful sunset. The lighting is soft, diffused, and natural, with gentle shadows and balanced contrast.\n\n**9. BLACK-AND-WHITE PHOTOGRAPHIC STYLE:**\n\nThe entire photograph must be strictly black and white.\n\nUse elegant monochrome photography with deep blacks, rich charcoal-grey tones, balanced midtones, and bright silver-grey highlights.\n\nThe black sweatshirt and black SUV should retain visible fabric and vehicle details rather than becoming completely dark.\n\nThe light grey jeans and white sneakers should remain clearly distinguishable.\n\nPreserve realistic contrast in the trees, sky, road, vehicle surfaces, and the person's face.\n\nCreate a timeless, dramatic, editorial black-and-white photography aesthetic.\n\n**10. CAMERA ANGLE AND FRAMING:**\n\nVertical portrait composition, 2:3 aspect ratio.\n\nUse a low-angle, front-facing camera perspective, positioned slightly below the man's standing height, so that the SUV looks powerful and the man appears naturally prominent.\n\nThe entire front of the Mahindra Thar should be visible, including both headlights, grille, bumper, and front tires.\n\nThe man's complete body must be visible from head to shoes. Do not crop his hair, head, hands, legs, or sneakers.\n\nKeep the man positioned near the center of the upper half of the frame, with the SUV dominating the lower half.\n\nThe second vehicle should remain visible in the background on the right side.\n\nMaintain the same overall composition, proportions, subject placement, and perspective as the reference image.\n\n**11. IMAGE QUALITY AND REALISM:**\n\nUltra-photorealistic professional DSLR photography, 8K detail, highly realistic human anatomy, natural facial texture, detailed curly hair, realistic denim fabric, accurate sweatshirt texture, detailed sneakers, authentic Mahindra Thar design, realistic tire textures, natural reflections on vehicle glass, detailed tree leaves, cinematic monochrome contrast, professional editorial photography, sharp subject focus, natural depth of field, and high dynamic range.\n\nThe final result must look like a genuine photograph taken by a professional automotive and fashion photographer, not an illustration, painting, CGI, or artificial 3D render.\n\nDo not introduce unnecessary objects, extra people, additional vehicles, colored elements, or changes to the original composition.\n\n**STRICT REFERENCE IMAGE COMPOSITION RULE:**\n\nUse the provided image as the visual reference for the entire scene. Reproduce the person's standing position, body posture, clothing style, hairstyle, sunglasses, hand placement, vehicle design, vehicle placement, background trees, cloudy sky, camera angle, framing, and black-and-white photographic appearance as closely as possible.",
  "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPgNUSHx9q6vv1JUyrhJ5WwbBeICdudtjDk6BIdFVIbk2qLP-WkCpQOpGbhL8D4TQH2VFSP27kT6c3jU8e_QW0Ul2fcc2aAcJMPSe_bmMq7_esipTNlXReyzdtdoSohPuJK4HyeLkHLi3AB9NeiutN5Q5hIL205khD-dJu24FOAg37gi2ffGO7MCAZqeTs/s1600/image.png",
  "tags": [
    "Boys",
    "Black & White",
    "Mahindra Thar",
    "Monochrome",
    "Automotive",
    "ChatGPT",
    "Gemini",
    "Trending",
    "Ai photo editing prompt for boys"
  ],
  "isPinned": true,
  "isTemplate": false,
  "likesCount": 128,
  "viewsCount": 480,
  "copyCount": 195,
  "aspectRatio": "2:3",
  "model": "ChatGPT / Gemini",
  "createdAt": "2026-11-09T21:45:00.000Z"
},
  {
  "id": "yellow-black-streetwear-racing-jacket-poster-54",
  "title": "Yellow & Black Streetwear Racing Jacket Poster – Number 54",
  "category": "Boys",
  "description": "# Yellow & Black Streetwear Racing Jacket Poster – Number 54 Guide\n\nCreate an ultra-realistic, high-end streetwear fashion campaign editorial poster wearing an oversized yellow and black racing jacket with large white '54' typography on a vibrant golden-yellow background using ChatGPT (GPT-4o) or Google Gemini.\n\n## Important Rules for Uploading Your Personal Photo\n- **Clean Lighting:** Evenly illuminated headshot without heavy shadows.\n- **Natural Hairstyle:** Original hairline and facial bone structure are respected.\n- **Authentic Features:** Realistic skin texture with your recognizable identity.\n\n---\n\n## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini\n\n### Step 1: Select Your Clear Photo\nChoose a high-resolution personal portrait photograph.\n\n### Step 2: Open ChatGPT or Google Gemini\nLaunch ChatGPT or Google Gemini on your smartphone or desktop.\n\n### Step 3: Attach Face Reference\nUpload your face photograph to the prompt chat box.\n\n### Step 4: Copy the AI Prompt\nClick **Copy Full Prompt** above, wait for the countdown, and copy the prompt text.\n\n### Step 5: Send Prompt & Review\nPaste the prompt into the chat and instruct the AI to generate a 2:3 vertical streetwear poster.\n\n### Step 6: Download Your Fashion Poster\nSave your high-contrast golden-yellow streetwear editorial poster!\n\n---\n\n## Key Highlights of This Prompt\n- **Oversized Racing Streetwear Jacket:** Vibrant golden-yellow and black panels, racing patches (22, 03, 929), straps, and buckles.\n- **Giant 54 Background Typography:** Enormous bold modern white '54' creating an iconic commercial brand poster look.\n- **Studio Lighting & Color Grading:** High-contrast saturated yellow, deep black, and crisp white graphic palette.\n\n---\n\n## SEO Keywords & Search Tags\nStreetwear racing jacket prompt, yellow fashion poster AI prompt, boys streetwear aesthetic, number 54 poster prompt, ChatGPT boys prompt, Gemini prompt for boys, AI photo editing prompt for boys.",
  "prompt": "Create an ultra-realistic, high-end fashion editorial poster featuring a stylish young adult man wearing a bold yellow and black oversized streetwear racing jacket against a vibrant solid golden-yellow background. The design should look like a premium professional fashion campaign poster, combining realistic studio photography with modern graphic design elements.\n\n**1. PERSON AND OVERALL APPEARANCE:**\n\nShow a handsome young adult man standing confidently in a fashionable three-quarter pose. His body is turned slightly toward the right side of the frame, while his face is turned back toward the camera.\n\nHis upper body is slightly angled, with one shoulder positioned closer to the camera. He has a slim, naturally proportioned physique and a relaxed, confident fashion-model presence.\n\nHis expression is calm, stylish, serious, and naturally attractive. His lips are gently closed, and his eyes look directly toward the camera.\n\n**2. HAIRSTYLE:**\n\nHe has thick, voluminous, naturally flowing dark black hair, styled in a modern medium-length hairstyle.\n\nThe hair is swept naturally backward and slightly toward one side, with soft layered strands and a subtle side part. The front section has natural volume, while the sides are neatly shaped and slightly curved around the ears.\n\nIndividual hair strands should be realistic, detailed, and naturally textured.\n\n**3. FACE AND EXPRESSION:**\n\nThe face has naturally balanced proportions, a defined jawline, realistic cheek structure, natural eyebrows, expressive eyes, a proportionate nose, and naturally shaped lips.\n\nHis expression should be confident and composed, without an exaggerated smile.\n\nMaintain realistic skin texture, subtle natural highlights, and authentic facial details.\n\n**4. OUTFIT – YELLOW AND BLACK STREETWEAR JACKET:**\n\nThe man wears a striking oversized yellow and black racing-inspired streetwear jacket.\n\nThe jacket features a predominantly vibrant golden-yellow body with contrasting black sections around the shoulders, upper chest, and sleeves.\n\nThe jacket is partially worn off the shoulders in a stylish fashion-editorial manner, revealing a plain black fitted crew-neck T-shirt underneath.\n\nThe jacket has:\n\n- Bright yellow fabric with realistic stitching.\n- Black shoulder and upper-sleeve panels.\n- Multiple decorative racing-inspired patches.\n- Large black and white racing numbers.\n- Bold number 22 printed on the upper sleeve.\n- Large number 03 printed on a lower front pocket.\n- Number 929 displayed on a small upper jacket patch.\n- Multiple black straps and adjustable buckles.\n- Metallic snap buttons and zipper details.\n- Oversized front pockets with flap closures.\n- Black-and-white geometric patch designs.\n- Small decorative typography and technical fashion labels.\n\nThe sleeves are oversized and slightly gathered, creating a layered streetwear silhouette.\n\nThe jacket should have realistic fabric folds, thick material, visible stitching, and detailed construction.\n\n**5. BODY POSITION AND HAND PLACEMENT:**\n\nThe man stands in a relaxed three-quarter pose.\n\nHis torso is slightly rotated toward the right side of the frame, while his head turns toward the camera.\n\nOne shoulder is slightly raised by the naturally draped jacket.\n\nHis arms remain relaxed and close to his body, with the oversized jacket sleeves naturally covering most of his arms.\n\nHis posture should appear effortless, confident, and fashionable, like a professional streetwear campaign model.\n\nMaintain anatomically correct shoulders, elbows, arms, hands, and body proportions.\n\n**6. BACKGROUND AND GRAPHIC DESIGN:**\n\nUse a completely vibrant golden-yellow background with a smooth, clean, studio-style appearance.\n\nBehind the model, place an enormous white number \"54\" in a bold, modern, extra-large sans-serif font.\n\nThe number should occupy most of the central background and extend beyond the model's body, with parts naturally hidden behind him.\n\nThe large number 5 should appear prominently on the left side, while the number 4 should occupy the right side.\n\nAdd a few small black graphic typography elements and minimal fashion-editorial decorative details near the edges.\n\nInclude a small black geometric fashion emblem in the upper-right corner and a subtle four-point star-shaped decorative element near the bottom-right corner.\n\nKeep the background clean and uncluttered.\n\n**7. LIGHTING AND PHOTOGRAPHY:**\n\nProfessional fashion studio lighting with soft directional illumination.\n\nThe model's face should be evenly illuminated, showing realistic skin texture, natural facial shadows, and detailed hair.\n\nThe yellow jacket should appear rich, vibrant, and highly detailed.\n\nUse subtle highlights on the black fabric and metallic jacket accessories.\n\nThe background should remain bright golden-yellow without unnecessary gradients or distracting shadows.\n\n**8. CAMERA ANGLE AND COMPOSITION:**\n\nVertical portrait poster, 2:3 aspect ratio.\n\nUse a medium-length fashion portrait composition, framing the model from approximately the upper thighs to slightly above his head.\n\nThe model should occupy most of the center of the image.\n\nHis head should be positioned slightly above the center, with the large white number 54 visible behind him.\n\nKeep the yellow jacket and its decorative patches clearly visible in the foreground.\n\nUse a straight-on studio camera perspective with a subtle three-quarter body angle.\n\n**9. COLOR GRADING AND VISUAL STYLE:**\n\nA bold yellow, black, and white color palette.\n\nExtremely vibrant golden-yellow background, rich black clothing sections, bright yellow jacket panels, and crisp white graphic typography.\n\nHigh contrast, premium fashion advertising aesthetic, modern urban streetwear editorial design, professional color grading, sharp details, and realistic material textures.\n\n**10. FINAL IMAGE QUALITY:**\n\nUltra-realistic professional fashion photography, 8K detail, natural human anatomy, realistic facial texture, individually detailed hair strands, highly detailed streetwear construction, accurate jacket stitching, realistic fabric folds, premium studio lighting, sharp focus, professional poster composition, and high-end commercial advertising quality.\n\nThe final result must look like a professionally photographed streetwear fashion campaign poster, not a painting, illustration, cartoon, or 3D render.",
  "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEicCk49irTEsOSh91Z2zCSZVF8DWc_SZ79OeFcyZd0hZuSnnNhzkhPGl2QMLhEV2prptxss5jcVHxFLEcccRtDzkqYvEWmCCAQdWlM2RUcdjr3r08_Db7BMPGGnAQ7YfUyxxcjhKfHJET2iSoPyZyTV8pMw_qlaYPja-CPOL5cD2zxfRHKnfZ-_uGESPG00/s1600/image.png",
  "tags": [
    "Boys",
    "Streetwear",
    "Racing Jacket",
    "Fashion Poster",
    "Number 54",
    "ChatGPT",
    "Gemini",
    "Trending",
    "Ai photo editing prompt for boys"
  ],
  "isPinned": false,
  "isTemplate": false,
  "likesCount": 115,
  "viewsCount": 410,
  "copyCount": 160,
  "aspectRatio": "2:3",
  "model": "ChatGPT / Gemini",
  "createdAt": "2026-11-09T21:30:00.000Z"
},
  {
  "id": "neon-cyberpunk-digital-transformation-futuristic-portrait",
  "title": "Neon Cyberpunk Digital Transformation – Purple & Orange Futuristic Portrait",
  "category": "Boys",
  "description": "# Neon Cyberpunk Digital Transformation – Purple & Orange Futuristic Portrait Guide\n\nCreate a cutting-edge futuristic side-profile portrait featuring your real face with vibrant purple neon lighting and glowing orange holographic pixel-glitch effects using ChatGPT (GPT-4o) or Google Gemini.\n\n## Important Rules for Uploading Your Personal Photo\n- **Side Profile or Front:** Upload a clear photo of your face; facial structure and beard/moustache are locked.\n- **Natural Beard & Moustache:** Exact preservation of your real facial hair without artificial modifications.\n- **High Clarity:** Sharp facial details and clean skin tone.\n\n---\n\n## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini\n\n### Step 1: Select Your Clear Photo\nPrepare a high-definition personal photo.\n\n### Step 2: Open ChatGPT or Google Gemini\nLaunch ChatGPT or Google Gemini on your smartphone or desktop.\n\n### Step 3: Attach Face Reference\nUpload your photo into the chat prompt box.\n\n### Step 4: Copy the AI Prompt\nClick **Copy Full Prompt** above, wait for the countdown, and copy.\n\n### Step 5: Send Prompt & Review\nPaste the prompt into the message box alongside your uploaded photo.\n\n### Step 6: Save Your Futuristic Portrait\nDownload your 8K cinematic neon cyberpunk digital portrait!\n\n---\n\n## Key Highlights of This Prompt\n- **Side-Profile Identity Preservation:** Authentic jawline, nose, and ear proportions adapted to the futuristic angle.\n- **Electric Neon Atmosphere:** Dual-tone deep purple and luminous neon orange lighting with floating digital glitch fragments.\n- **Holographic Transformation:** Seamless transition from realistic human skin to futuristic digital cyberspace.\n\n---\n\n## SEO Keywords & Search Tags\nCyberpunk neon portrait prompt, purple orange glitch AI photo, futuristic side profile prompt, ChatGPT boys prompt, Gemini prompt for boys, AI photo editing prompt for boys.",
  "prompt": "STRICT FACE IDENTITY, EXACT BEARD AND MOUSTACHE PRESERVATION:\nUse the uploaded personal face reference photo as the exclusive reference for the person's real facial identity.\nPreserve the person's natural facial structure as closely as possible, including the forehead, eyebrows, eyes, nose, lips, cheeks, jawline, chin, facial proportions, natural skin tone, and all distinctive facial characteristics.\nEXACT FACIAL HAIR MATCHING RULE:\nCarefully examine the original face reference photo and reproduce its natural facial hair exactly.\n- If the reference photo has a beard, reproduce the same beard style, shape, length, thickness, density, and natural growth pattern.\n- If the reference photo has a moustache, reproduce the same moustache style, thickness, shape, and length.\n- If the reference photo has both a beard and a moustache, reproduce both naturally and accurately.\n- If the reference photo has neither a beard nor a moustache, keep the face completely clean-shaven.\n- Never add a beard or moustache that is not present in the original reference.\n- Never remove, shorten, enlarge, or change existing facial hair into a different style.\nSTRICT SIDE-PROFILE IDENTITY PRESERVATION:\nAdapt the person's real facial identity naturally to the left-facing side-profile angle described in the main prompt.\nMaintain the original nose shape, forehead structure, lips, chin, jawline, and facial proportions from the reference photo.\nDo not generate a generic model face, replace the person's identity, artificially beautify the face, or modify the natural skin tone.\nThe realistic human face must remain clearly recognizable and must not be distorted by the digital glitch effects.\nIMPORTANT: The uploaded face reference determines the person's facial identity and exact beard or moustache. The main image prompt determines the hairstyle, clothing, pose, neon colors, digital transformation, background, lighting, and overall composition.",
  "imageUrl": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvTV7vDUr-XfPVNjPeIXO9u9reghM5APjgGKPbe735Lh9MIbn1W_c9xfqTqnYr4v_wdEFybMO20LpHifNCsm8LJAcBcFzIpOZbpUVkHWTp8YgbZgX6SJ0-zYIW1TuuurRcVZmiLIYxu2tLe_vbJ7ej_QB6X3H3WZXknPdqdCZt7lO2Y-bbPc56C7hTvzFV/s1600/image.png",
  "tags": [
    "Boys",
    "Cyberpunk",
    "Neon",
    "Futuristic",
    "Side Profile",
    "ChatGPT",
    "Gemini",
    "Trending",
    "Ai photo editing prompt for boys"
  ],
  "isPinned": false,
  "isTemplate": false,
  "likesCount": 134,
  "viewsCount": 465,
  "copyCount": 180,
  "aspectRatio": "3:4",
  "model": "ChatGPT / Gemini",
  "createdAt": "2026-11-09T21:15:00.000Z"
},
  {
    id: 'golden-hour-wildflower-hillside-korean-hair',
    title: 'Golden Hour Wildflower Hillside – Korean Messy Hair Aesthetic',
    category: 'Boys',
    description: `# Golden Hour Wildflower Hillside Guide – Korean Messy Hair Aesthetic

Create an ultra-realistic, cinematic outdoor portrait on a lush green hillside filled with colorful wildflowers during golden hour using your personal photo with ChatGPT (GPT-4o) or Google Gemini.

## Important Rules for Uploading Your Personal Photo
To achieve 100% facial identity preservation, you must follow these photo upload rules:
- **High Resolution:** Upload a sharp, high-resolution original photograph of yourself.
- **Front-Facing Angle:** Choose a front-facing or slight three-quarter angle where your natural facial structure, eyes, eyebrows, nose, lips, jawline, and natural hairline are clearly visible.
- **Good Lighting:** Ensure your face is evenly lit with natural lighting or soft indoor lights. Avoid harsh shadows or overexposed glares.
- **Facial Hair:** Your natural beard or moustache in the photo will be preserved exactly as you have it.
- **No Filters or Sunglasses:** Do not use photos with heavy beauty filters, sunglasses, masks, or extreme cartoon edits.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Select Your Clear Personal Photo
Select a clear, front-facing personal photo from your phone or computer following the rules above.

### Step 2: Open ChatGPT or Google Gemini
Launch the ChatGPT app/website (select GPT-4o with image generation) or Google Gemini on your smartphone or desktop.

### Step 3: Upload Your Face Reference Photo
Attach your personal picture to the chat prompt window so the AI algorithm locks your real identity.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait for the 7-second countdown, then click the green **Click to Copy Now** button to copy the prompt to your clipboard.

### Step 5: Paste & Instruct the AI
Paste the prompt into the message box alongside your uploaded photo. Instruct the AI model to generate a 3:4 vertical editorial portrait.

### Step 6: Review & Save
Verify that the AI preserved your facial identity, styled voluminous Korean textured hair, and placed you on the blooming wildflower hillside with giant golden clouds. Download your 8K photo!

---

## Key Highlights of This Prompt
- **Lush Wildflower Hillside:** Surrounded by vibrant poppies, white daisies, and purple blossoms creating a natural floral frame.
- **Korean Messy Hair Aesthetic:** Naturally voluminous textured hair with soft wavy strands and an effortlessly stylish look.
- **Dreamy Golden Hour Lighting:** Warm late afternoon sun with giant fluffy cumulus clouds illuminated with golden edges.

---

## SEO Keywords & Search Tags
Golden Hour Wildflower Hillside, Korean Messy Hair Aesthetic prompt, boys wildflower AI photo, boys golden hour portrait, ChatGPT boys prompt, Gemini prompt for boys, AI photo editing prompt for boys, boys aesthetic photography prompt, 8K realistic AI portrait.`,
    prompt: `Create an ultra-realistic, cinematic outdoor portrait inspired by the uploaded reference image. Preserve the original artistic concept, composition, sitting position, body posture, landscape, flowers, sky, lighting, and overall photographic atmosphere as closely as possible.
STRICT FACE IDENTITY LOCK: Use the separately uploaded face-reference photograph as the exclusive identity reference. Reproduce the same person's natural facial structure, eyes, eyebrows, nose, lips, skin tone, and all recognizable facial characteristics as closely as possible. Do not replace the face with another person's face. Avoid artificial beautification or unnecessary facial alterations.
FACIAL HAIR PRESERVATION: Follow the exact natural facial hair appearance in the face-reference photograph. If the person has a beard, preserve its original style, length, and thickness. If he has a moustache, maintain it naturally. If he has both, preserve both. If he is clean-shaven, do not add any beard or moustache. Never invent facial hair.
HAIRSTYLE: Create naturally messy, voluminous Korean-inspired textured hair with soft, slightly wavy strands and an effortlessly stylish appearance. Adapt the hairstyle naturally while maintaining the person's original hairline, natural hair color, and recognizable appearance.
POSE & BODY POSITION: Show the young man sitting naturally on a lush green hillside, looking peacefully upward toward the beautiful sky. One hand rests on the grassy ground for support, while the other arm rests casually on his raised knee. His legs are relaxed and naturally positioned, creating an elegant and effortless sitting pose. His expression is calm, thoughtful, and dreamy.
CLOTHING: Dress him in a premium, loose-fitting white linen button-down shirt with a relaxed open collar, natural fabric folds, and casually styled sleeves. Pair it with elegant dark charcoal or black straight-fit trousers. Add a simple, delicate silver chain necklace. Keep the outfit minimal, fresh, and sophisticated.
ENVIRONMENT & FLOWERS: Surround the person with a beautiful, lush green hillside covered in colorful wildflowers. Include vibrant orange-red poppies, delicate white daisies, tiny purple flowers, and other small seasonal blossoms. The foreground should be richly decorated with naturally growing flowers and green grass, creating a beautiful floral frame around the subject.
SKY & BACKGROUND: Create an impressive open sky filled with enormous, dramatic, fluffy cumulus clouds. The clouds should have beautiful golden sunlight illuminating their edges, with a soft blue sky visible behind them. Include distant rolling green hills along the horizon.
LIGHTING & ATMOSPHERE: Capture the scene during golden hour in the late afternoon. Use warm, soft natural sunlight, gentle highlights on the person's face and white shirt, realistic shadows, and a dreamy cinematic atmosphere. Create beautiful depth with softly blurred foreground flowers and background elements while keeping the subject perfectly sharp.
CAMERA & PHOTOGRAPHY: Professional DSLR fashion and lifestyle photography, medium portrait composition, natural perspective, shallow depth of field, realistic skin texture, intricate hair details, detailed linen fabric, lifelike flowers, cinematic color grading, warm earthy tones, HDR, ultra-realistic 8K quality.
STRICT PRESERVATION RULE: Maintain the original reference image's overall composition, sitting pose, upward gaze, green hillside, colorful wildflowers, giant golden clouds, and dreamy golden-hour atmosphere. Follow the separately supplied face-reference photograph for the person's identity and natural facial hair. Do not introduce unnecessary changes to the scene.
FINAL OUTPUT: Vertical 3:4 aspect ratio, ultra-realistic cinematic portrait, premium editorial photography, natural colors, extremely detailed, photorealistic. No text, no logo, no watermark.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7kPeetnarCdO0mj10jl6DboA39_SDpHv890CzEgKHIsRCBHRgSxwVhpZx-9A4Nf1pqgequp8UIUvyX_-lbG9ZKUWMGIu3aeTlXcl3Efsriu27336jd83WW14YsR2n0DRMu2at9SMoXbOlppaxZm7fzifvnZnq52wVrrAIVJJ6z3FxEzDaAAsfpTy7Iro/s1600/image.png',
    tags: [
      'Boys',
      'Wildflower',
      'Golden Hour',
      'Korean Aesthetic',
      'Hillside',
      'ChatGPT',
      'Gemini',
      'Trending',
      'Ai photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 95,
    viewsCount: 420,
    copyCount: 168,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T18:00:00.000Z',
  },
  {
    id: 'eternal-love-romantic-red-roses-shadow-silhouette',
    title: 'Eternal Love – Romantic Red Roses & Shadow Silhouette Portrait',
    category: 'Boys',
    description: `# Eternal Love Guide – Romantic Red Roses & Shadow Silhouette Portrait

Create an original, ultra-realistic cinematic full-body editorial portrait holding fresh red roses in a crisp white suit with a romantic shadow silhouette holding your hand using ChatGPT (GPT-4o) or Google Gemini.

## Important Rules for Uploading Your Personal Photo
- **Clear Face Portrait:** Upload a sharp personal photo showing your facial structure, jawline, and natural expression clearly.
- **Natural Beard & Moustache:** Your natural facial hair will be accurately preserved without changes.
- **Lighting:** Evenly illuminated photo without heavy shadows or sunglasses.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Select Your Clear Photo
Prepare a clear, front-facing personal picture.

### Step 2: Open ChatGPT or Google Gemini
Launch ChatGPT (GPT-4o) or Google Gemini on your device.

### Step 3: Attach Your Personal Photo
Upload your face photograph to the prompt box.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait for the 7-second countdown, then click the green **Click to Copy Now** button.

### Step 5: Send Prompt & Review
Paste the prompt into the message box alongside your uploaded photo and send.

### Step 6: Save Your 8K Editorial Photo
Review the white suit, red roses, and the graceful shadow silhouette hand-hold effect on the warm beige wall. Save your masterpiece!

---

## Key Highlights of This Prompt
- **Romantic Shadow Silhouette:** A delicate feminine silhouette on the wall holding the man's extended hand.
- **Tailored White Suit & Red Roses:** Crisp white formal blazer and trousers contrasted with a lush bouquet of deep-red roses.
- **Dramatic Golden Sunlight:** Diagonal beam of sunlight entering from the upper left creating realistic shadows.

---

## SEO Keywords & Search Tags
Eternal Love AI photo prompt, Romantic Red Roses Shadow Silhouette, boys white suit photo editing, boys red roses prompt, ChatGPT prompt for boys, Gemini AI photo prompt, boys romantic portrait prompt, 8K realistic full-body portrait.`,
    prompt: `Create an original, ultra-realistic, cinematic full-body editorial portrait inspired by the uploaded reference image. Preserve the same artistic concept, composition, pose, clothing, bouquet, dramatic lighting, shadow effects, and romantic atmosphere.
STRICT FACE IDENTITY LOCK: Use the separately uploaded face-reference photograph as the exclusive reference for the man's facial identity. Preserve his natural facial structure, eyes, eyebrows, nose, lips, skin tone, and all recognizable facial characteristics as closely as possible. Do not substitute another person's face or unnecessarily beautify his appearance.
NATURAL BEARD & MOUSTACHE: Match the facial hair exactly to the face-reference photograph. If he has a beard, preserve its natural style, length, and thickness. If he has a moustache, retain it naturally. If he has both, reproduce both. If he has no beard or moustache, keep his face completely clean-shaven. Never invent or remove facial hair.
HAIRSTYLE & BODY: Maintain the person's natural hair color, hairline, hairstyle, body build, and realistic body proportions according to the supplied reference photographs.
CLOTHING: Dress him in an elegant, perfectly tailored white formal suit with a white blazer and matching white trousers. Underneath, he wears a sophisticated black formal shirt with a black tie. Include a neatly folded black pocket square. Maintain the luxurious, clean, minimalist appearance of the original outfit.
POSE & EXPRESSION: Show the man standing confidently against a warm beige textured wall. His eyes are gently closed, with a peaceful, emotional, romantic expression. In one hand, he holds a beautiful, large bouquet of fresh, deep-red roses with rich green leaves, wrapped elegantly in transparent floral paper. His other arm extends naturally toward the right side, with his hand gently reaching out as if holding someone's hand.
ROMANTIC SHADOW SILHOUETTE: Create a beautiful, realistic shadow of a young woman on the wall to his right. The woman's silhouette should clearly show a graceful feminine profile, long flowing hair, and an elegant dress. Her shadow hand must connect naturally with the man's extended hand, creating the illusion that they are holding hands. The woman herself should not be physically visible; only her dramatic shadow silhouette should appear on the wall.
BACKGROUND & LIGHTING: Use a dark, warm-toned environment with a large diagonal beam of golden sunlight entering from the upper-left side. The sunlight illuminates the man's white suit, face, and red roses while creating long, dramatic, realistic shadows on the beige wall. Preserve the beautiful contrast between the illuminated area and the darker surroundings.
CAMERA & COMPOSITION: Professional cinematic full-body portrait photography, straight-on camera angle, vertical composition. Keep the man positioned on the left side of the frame and the woman's shadow silhouette on the right. Show the complete body, including both shoes, bouquet, extended hand, and the full shadow silhouette.
IMAGE QUALITY: Ultra-realistic skin texture, detailed white suit fabric, naturally textured red rose petals, realistic shadow physics, cinematic golden-hour lighting, rich contrast, warm earthy color grading, professional DSLR photography, HDR, extremely detailed 8K quality.
STRICT PRESERVATION RULE: Keep the original reference image's romantic concept, white suit, black shirt, red rose bouquet, closed eyes, extended hand, golden sunlight, diagonal light beam, beige wall, and woman's shadow holding his hand. Only adapt the man's facial identity and natural facial hair according to the separately supplied face-reference photograph.
FINAL OUTPUT: Vertical 3:4 aspect ratio, premium cinematic romantic portrait, photorealistic, full-body composition, professional editorial photography. No visible woman, no extra people, no unnecessary objects, no additional text, no logos, and no watermark.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqqaQMz9XCcCbaBtso6VCLDx5H7YF6LAl4Btx9XiNqEMoBR_aDv6eCn1hYNdG_NK5WROJejKeH6yiXyP_MDyL3bb0kvcqLQHQ-AaZ9MibUZsDBiZYihhwWLPfpGAODGvuAqM4P07TS8-VFKTlGUd-x43wbUY1BfQyNQe70Tz2y1uIG7t6hSkxX052LDos/s1600/image.png',
    tags: [
      'Boys',
      'Roses',
      'White Suit',
      'Shadow Silhouette',
      'Romantic',
      'ChatGPT',
      'Gemini',
      'Trending',
      'Ai photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 88,
    viewsCount: 390,
    copyCount: 154,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T17:50:00.000Z',
  },
  {
    id: 'vintage-golden-hour-retro-green-shirt-portrait',
    title: 'Vintage Golden Hour – Retro Green Shirt Cinematic Portrait',
    category: 'Boys',
    description: `# Vintage Golden Hour Guide – Retro Green Shirt Cinematic Portrait

Create a timeless, nostalgic analog film aesthetic portrait wearing a dark forest-green linen shirt with a red rose and warm golden hour light using your personal photo with ChatGPT (GPT-4o) or Google Gemini.

## Important Rules for Uploading Your Personal Photo
- **Clear Face Photo:** Upload a clear, front-facing photograph of yourself.
- **Natural Facial Hair:** Any beard or moustache in your photo will be accurately maintained.
- **Natural Hairstyle:** Maintain your original hairline and authentic hair texture.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Select Your Clear Photo
Prepare a sharp, clear personal picture.

### Step 2: Open ChatGPT or Google Gemini
Open ChatGPT (GPT-4o) or Google Gemini on your smartphone or PC.

### Step 3: Attach Face Reference Photo
Attach your picture to the AI prompt chat.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait 7 seconds, then click the green **Click to Copy Now** button.

### Step 5: Send & Generate
Paste the prompt into the message box with your uploaded photo and send.

### Step 6: Review & Download
Review the vintage golden-hour sunlight streaming through the window, the linen green shirt, and the single red rose. Save your 8K cinematic portrait!

---

## Key Highlights of This Prompt
- **Dark Forest-Green Linen Shirt:** Rolled-up sleeves, open collar, and a single fresh red rose pinned to the chest.
- **Retro Film Aesthetic:** Authentic 35mm film grain, warm golden-brown undertones, and delicate light leaks.
- **Diagonal Window Sunlight:** Cinematic golden rays creating bold natural shadows on a textured beige wall.

---

## SEO Keywords & Search Tags
Vintage Golden Hour prompt, Retro Green Shirt Cinematic Portrait, boys green shirt photo editing, boys retro photoshoot prompt, ChatGPT boys prompt, Gemini prompt for boys, AI photo editing prompt for boys, 35mm film grain aesthetic prompt.`,
    prompt: `Create an original, ultra-realistic cinematic retro portrait inspired by the uploaded reference image. Preserve the original composition, standing pose, clothing, accessories, background, lighting, shadows, and vintage photographic atmosphere as closely as possible.
STRICT FACE IDENTITY REFERENCE: Use the separately uploaded face-reference photograph as the exclusive reference for the person's facial identity. Preserve his natural facial structure, eyes, eyebrows, nose, lips, skin tone, and all recognizable facial characteristics as closely as possible. Do not replace his face with another person's face or apply unnecessary beautification.
NATURAL BEARD & MOUSTACHE PRESERVATION: Carefully follow the facial hair visible in the face-reference photograph. If he has a beard, reproduce its natural style, length, shape, and thickness. If he has a moustache, preserve it accurately. If he has both, maintain both naturally. If he has no beard or moustache, keep his face completely clean-shaven. Never add artificial facial hair or remove existing facial hair.
HAIRSTYLE & BODY: Maintain the person's natural hair color, hairline, hairstyle, hair texture, body build, and realistic body proportions according to the supplied reference photographs.
POSE & EXPRESSION: Show the man standing casually and confidently against a plain, warm beige textured wall. His arms are crossed naturally over his chest, with one forearm resting comfortably over the other. His shoulders are relaxed, and he looks directly toward the camera with a gentle, natural, confident expression and a subtle smile.
CLOTHING & ACCESSORIES: Dress him in a stylish dark forest-green linen button-down shirt with the top buttons slightly open and sleeves rolled up to the elbows. The shirt should have a natural relaxed fit with realistic linen texture and subtle fabric wrinkles. Pair it with elegant charcoal-black straight-fit trousers. Add a sophisticated silver wristwatch and a single beautiful, fresh red rose pinned naturally to the left side of his chest. Keep all clothing colors and accessories consistent with the original reference image.
BACKGROUND & SHADOWS: Use a simple beige indoor wall with a warm, slightly textured vintage appearance. Cast a strong, clearly visible natural shadow of the man's head and upper body onto the wall behind him, positioned slightly to his right. Maintain the original shadow shape and direction.
LIGHTING & ATMOSPHERE: Create a beautiful cinematic golden-hour lighting effect, with warm sunlight streaming diagonally through an unseen window from the upper-left side. The sunlight should illuminate parts of his face, green shirt, and the beige wall while producing dramatic natural shadows. Add subtle vintage light leaks, soft highlights, gentle dark corners, and a nostalgic warm atmosphere.
RETRO FILM AESTHETIC: Apply authentic analog film photography characteristics, including subtle film grain, slightly faded colors, warm golden-brown undertones, soft contrast, delicate light leaks, and natural skin tones. Maintain a timeless editorial portrait aesthetic without making the image look artificially aged or excessively blurred.
CAMERA & IMAGE QUALITY: Professional DSLR portrait photography, medium full-body composition, natural camera perspective, realistic skin texture, detailed linen fabric, sharp subject focus, soft background depth, cinematic color grading, HDR, ultra-realistic 8K photographic quality.
STRICT PRESERVATION RULE: Keep the original reference image's dark green shirt, crossed-arm pose, charcoal trousers, silver wristwatch, single red rose, beige wall, strong wall shadow, golden sunlight, and nostalgic vintage atmosphere as close as possible. Only adapt the person's facial identity and natural facial hair according to the separately supplied face-reference photograph. Do not introduce unnecessary changes to the original scene.
FINAL OUTPUT: Vertical 3:4 aspect ratio, premium cinematic retro portrait, photorealistic, natural colors, professional editorial photography. No extra people, no additional flowers, no text, no logos, and no watermark.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRTNZUoPOOwaZhWY5imlfOxI3eQeYuoHYPo8N_F_cKzsghkKzgnZwxDMDHCI_ffFA0Fs-v0iAPYtaLE23fzT1l5h3O8MkEp1meMNlDFIUrKBqGchefN08E6wmB_W5N67-RxBwB5N2XUE1Mq3tFuQt6ElghXYz8mbB6rvQ-rTuK8KTZxSOCX6oIG-_mRqw/s1600/image.png',
    tags: [
      'Boys',
      'Green Shirt',
      'Golden Hour',
      'Cinematic',
      'ChatGPT',
      'Gemini',
      'Trending',
      'Ai photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 82,
    viewsCount: 360,
    copyCount: 140,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T17:40:00.000Z',
  },
  {
    id: 'electric-blue-pixel-stretch-water-boat-portrait',
    title: 'Electric Blue Pixel Stretch – Cinematic Water Boat Portrait',
    category: 'Boys',
    description: `# Electric Blue Pixel Stretch Guide – Cinematic Water Boat Portrait

Create an avant-garde luxury digital artwork featuring dynamic flowing electric-blue pixel-stretch ribbons on a serene water lily lake using your personal photo with ChatGPT (GPT-4o) or Google Gemini.

## Important Rules for Uploading Your Personal Photo
- **Sharp Personal Picture:** Upload a clear, high-resolution original photo.
- **Natural Beard & Moustache:** Your natural facial hair will be reproduced accurately.
- **Natural Hair & Build:** Preserves your authentic facial structure and natural hair.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Select Your Clear Photo
Prepare a high-quality personal photograph.

### Step 2: Open ChatGPT or Google Gemini
Launch ChatGPT (GPT-4o) or Google Gemini.

### Step 3: Attach Face Reference Photo
Attach your face picture to the chat prompt box.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait 7 seconds, then click the green **Click to Copy Now** button.

### Step 5: Send & Create
Paste the prompt into the message box with your uploaded photo and send.

### Step 6: Review & Save
Verify the wooden boat, purple flower bouquet, and the spectacular electric-blue pixel stretch trails radiating into the sky. Save your 8K masterpiece!

---

## Key Highlights of This Prompt
- **Electric Blue Pixel Stretch Sky:** Flowing dynamic ribbons in sapphire, cyan, navy, and brilliant white forming a tunnel of motion.
- **Wooden Boat & Lily-Pad Lake:** Relaxed sitting pose on a traditional wooden boat surrounded by water lily pads.
- **Purple Flower Bouquet:** Vibrant purple blossoms adding rich color harmony to the black outfit.

---

## SEO Keywords & Search Tags
Electric Blue Pixel Stretch prompt, Cinematic Water Boat Portrait, boys boat photoshoot prompt, pixel stretch art prompt, ChatGPT prompt for boys, Gemini AI photo prompt, boys purple flower boat prompt, 8K realistic digital artwork.`,
    prompt: `Transform the uploaded reference image into a premium, ultra-realistic cinematic Pixel Stretch digital artwork. Preserve the original visual composition, subject placement, sitting pose, clothing, wooden boat, purple flower bouquet, lily-pad lake, dramatic blue sky, and overall artistic style as closely as possible.
STRICT FACE IDENTITY REFERENCE: Use the separately uploaded face-reference photograph as the exclusive identity reference for the person. Preserve his natural facial structure, eyes, eyebrows, nose, lips, skin tone, and recognizable facial characteristics as closely as possible. Do not substitute another person's face or unnecessarily beautify his appearance.
FACIAL HAIR PRESERVATION: Carefully match the natural beard and moustache from the face-reference photograph. If he has a beard, preserve its original shape, length, and thickness. If he has a moustache, maintain it naturally. If he has both, reproduce both accurately. If he has no beard or moustache, keep his face completely clean-shaven. Never add artificial facial hair or remove existing facial hair.
HAIRSTYLE & BODY: Maintain the person's natural hair color, hairline, hairstyle, hair texture, body build, and proportions according to the supplied reference photographs.
POSE & COMPOSITION: Show the person sitting naturally in the center of a long, narrow wooden boat floating across a vast lake covered with lush green lily pads. One leg extends toward the camera, while the other knee is bent upward. His left hand rests casually on the left edge of the wooden boat for support. His right hand holds a beautiful bouquet of vibrant purple flowers with long green stems. He looks directly toward the camera with a calm, confident expression. Keep the entire subject sharply focused and naturally proportioned.
CLOTHING: He wears a fitted black full-sleeve sweatshirt, black straight-fit trousers, white socks, and stylish black-and-white athletic sneakers. Preserve the original outfit, colors, and clothing details.
ENVIRONMENT: The long wooden boat extends from the bottom foreground toward the center of the composition. Surround both sides of the boat with countless fresh green floating lily pads stretching toward the distant horizon. Preserve the beautiful natural water landscape and its reflective surface.
BACKGROUND & PIXEL STRETCH EFFECT: Create a spectacular deep electric-blue and sapphire-blue sky featuring dramatic flowing pixel-stretch ribbons. Extend the blue, cyan, navy, and brilliant white colors into long, silky, dynamic light streaks that radiate outward from behind the subject. The streaks should form elegant curved lines, creating a powerful tunnel-like visual effect with a sense of motion and depth.
PIXEL STRETCH ART DIRECTION: Apply a sophisticated Adobe Photoshop-inspired pixel stretch effect. Extract colors and visual textures from the original sky and landscape and extend them into smooth, flowing ribbons. Create seamless transitions between the original scene and the stretched areas. Avoid harsh edges, random glitches, distorted objects, or excessive visual noise.
Keep the person's face, body, clothing, bouquet, and wooden boat perfectly sharp, detailed, and realistic. Apply the strongest stretching effect to the sky and surrounding landscape rather than the person.
LIGHTING & COLOR GRADING: Maintain bright natural daylight, realistic shadows, vibrant blue tones, rich green lily pads, warm natural wooden textures, and beautiful purple flowers. Use cinematic contrast, HDR lighting, balanced saturation, and professional color harmony.
IMAGE QUALITY: Ultra-realistic photography combined with luxury digital art styling, extremely sharp details, realistic textures, smooth pixel transitions, cinematic depth, professional digital finishing, gallery-quality artwork, and ultra-high-resolution 8K.
STRICT PRESERVATION RULE: Keep the original image's central subject position, sitting pose, extended leg, bent knee, hand placement, black outfit, purple flower bouquet, wooden boat, green lily-pad lake, and dramatic blue pixel-stretch sky as close as possible. Only adapt the person's facial identity and natural facial hair according to the separately supplied face-reference photograph. Do not change the original artistic concept or introduce unnecessary objects.
FINAL OUTPUT: Vertical 3:4 aspect ratio, premium cinematic pixel-stretch artwork, ultra-realistic full-body portrait, vibrant electric-blue atmosphere, professional social-media-ready digital masterpiece. No golden elements, no text, no logos, and no watermark.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjiRn63yNyABdTSZo9Kq4mkmwb_uz64JT4W5ijjseKCCisxZ7ffcXlVY7XhIdKmXZLINZa1QvYyyDct36aFD4nHoQlix0ZIJOF_3vjbaEKZTNlz1FjFEE8HsL4z5qLnsFT187Q6VoDzh4HYVK4AL6QZYiQi4t_eHpfu2ecH9-BEZxt5aFPNf4jQekfcOVo/s1600/image.png',
    tags: [
      'Boys',
      'Pixel Stretch',
      'Boat',
      'Lily Pad Lake',
      'Electric Blue',
      'ChatGPT',
      'Gemini',
      'Trending',
      'Ai photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 92,
    viewsCount: 410,
    copyCount: 162,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T17:30:00.000Z',
  },
  {
    id: 'ajmal-bold-red-editorial-magazine-cover',
    title: 'AJMAL – Bold Red Editorial Magazine Cover',
    category: 'Boys',
    description: `# AJMAL Bold Red Editorial Magazine Cover Guide

Create an original, high-end editorial magazine cover poster in a bold, modern graphic design style using your own facial reference photo with ChatGPT (GPT-4o) or Google Gemini.

## Important Rules for Uploading Your Personal Photo
To achieve 100% facial identity preservation, you must follow these photo upload rules:
- **High Resolution:** Upload a sharp, high-resolution original photograph of yourself.
- **Front-Facing Angle:** Choose a front-facing or slight three-quarter angle where both eyes, eyebrows, nose, lips, jawline, and natural hairline are clearly visible.
- **Good Lighting:** Ensure your face is evenly lit with natural lighting or soft indoor lights. Avoid harsh shadows or overexposed glares.
- **Natural Hairstyle:** Use a photo with your authentic, natural hairstyle and natural hair texture.
- **No Filters or Sunglasses:** Do not use photos with heavy beauty filters, sunglasses, masks, or extreme cartoon edits.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Select Your Clear Personal Photo
Select a clear, front-facing personal photo from your phone or computer following the rules above.

### Step 2: Open ChatGPT or Google Gemini
Launch the ChatGPT app/website (select GPT-4o with image generation) or Google Gemini on your smartphone or desktop.

### Step 3: Upload Your Face Reference Photo
Attach your personal picture to the chat prompt window so the AI algorithm locks your real identity.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait for the 7-second countdown, then click the green **Click to Copy Now** button to copy the prompt to your clipboard.

### Step 5: Paste & Instruct the AI
Paste the prompt into the message box alongside your uploaded photo. Instruct the AI model to generate a 3:4 vertical editorial portrait.

### Step 6: Review & Save
Verify that the AI preserved your facial identity, textured dark hair, and realistic shirt fabric against the crimson background and magazine typography. Download your 4K magazine cover!

---

## Key Highlights of This Prompt
- **Editorial Graphic Layout:** High-contrast crimson red studio backdrop with bold typography, magazine headlines, and barcode accents.
- **Sophisticated Stance:** Confident contrapposto posture with natural fabric folds on an elegant button-down shirt.
- **Photographic Realism:** Crisp 35mm portrait lighting, realistic skin pores, and natural hair strands without plastic smoothing.

---

## SEO Keywords & Search Tags
Ai photo editing prompt, AI photo editing prompt for boys, AI image editing prompt, AI image editing prompt for boys, AI photo editing prompt for boy, AI image editing prompt for boy, AI prompt, boys prompt, boy AI prompt, boys AI prompt, boy prompt, chat GPT prompt, Gemini prompt, Chat gpt prompt for boys, Gemini prompt for boys, chat GPT prompt boy, Gemini prompt boy, AJMAL magazine cover prompt, bold red editorial AI photo, boy magazine cover photo editing, ChatGPT prompt for boys, Gemini prompt for boys`,
    prompt: `Create an original, high-end editorial magazine cover poster in a bold, modern graphic design style, using the uploaded poster as the primary visual reference.
FACE IDENTITY REFERENCE: Use the separately uploaded face-reference photograph for the person's facial identity. Preserve the person's natural facial structure, eyes, eyebrows, nose, lips, skin tone, and other recognizable facial characteristics as closely as possible. Do not create a different-looking person.
SUBJECT & POSE: Show the person in a confident, sophisticated contrapposto stance, with the upper body slightly turned and the head looking off-camera. Give him naturally styled, thick, dark black, textured swept-back hair and a calm, confident expression. He wears a fitted, elegant, light beige-white button-down shirt with natural fabric folds and realistic details.
BACKGROUND & COLOR: Create a vibrant, deep crimson-red background featuring subtle vintage halftone dot textures, high-contrast typography, and bold magazine headline lettering.
TYPOGRAPHY & GRAPHICS: Bold editorial masthead text "AJMAL" positioned across the top with minimalist magazine subtitles, barcodes, and date stamp accents.
LIGHTING & AESTHETIC: High-contrast studio lighting, sharp rim highlights, clean soft shadows, 35mm crisp photographic realism with graphic poster sensibilities.
CAMERA & COMPOSITION: Vertical 3:4 portrait aspect ratio, medium-to-full-body framing, subject positioned centrally, razor-sharp focus on facial details, authentic skin texture without artificial plastic smoothing.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjPe61bVEkpQwCqSyEiuJaO3-Q0KTPdzXl2gXFadvfE1lZtejQxWOHBxBMYHwzkRGqp7OxHSQWBT0zBe2GwcqU8mBmd4Nfu47rscPhBy-SAr4oXulC9tHTKLh_3Tp-xMvJscb87_jaBMgfLddy0NDwVyKZK7pXPMlchp_iFOA8rCCTluF0PPE2kMayrJlk/s1600/image.png',
    tags: [
      'Boys',
      'Editorial',
      'Magazine Cover',
      'AJMAL',
      'Red Theme',
      'Trending',
      'ChatGPT',
      'Gemini',
      'Ai photo editing prompt',
      'AI photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 142,
    viewsCount: 1280,
    copyCount: 384,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T10:00:00.000Z',
  },
  {
    id: 'romantic-pink-roses-blue-sky-portrait',
    title: 'Romantic Pink Roses – Blue Sky Portrait Photography',
    category: 'Boys',
    description: `# Romantic Pink Roses & Blue Sky Portrait Guide

Create a stunning, ultra-realistic aesthetic portrait holding a bouquet of fresh pink roses against a deep blue sky with gentle clouds using your personal photo with ChatGPT (GPT-4o) or Google Gemini.

## Important Rules for Uploading Your Personal Photo
To make sure the AI generates an authentic likeness:
- **Sharp & Well-Lit:** Use a clear, well-focused photo taken in bright daylight or crisp indoor lighting.
- **Frontal View:** Ensure your face, jawline, eyes, nose, and lips are clearly visible without being blocked.
- **Preserve Hairstyle:** Use a photo displaying your current hairstyle and natural hair volume.
- **No Heavy Filters:** Avoid pre-filtered or heavily edited photos; natural camera shots provide the best reference.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Prepare Your Face Photo
Choose a clear, front-facing personal photo where your facial features and hair are distinct.

### Step 2: Open ChatGPT or Google Gemini
Open ChatGPT (GPT-4o) or Google Gemini in your mobile app or browser.

### Step 3: Attach Your Face Reference Photo
Click the attach image icon and upload your photo directly to the conversation.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait for the 7-second countdown, then click the green **Click to Copy Now** button.

### Step 5: Send the Prompt
Paste the copied prompt into the message box with your uploaded photo and press Send.

### Step 6: Download & Share
Review the natural facial realism, soft petal textures, and brilliant blue sky with fluffy clouds. Save the vertical image in high resolution!

---

## Key Highlights of This Prompt
- **Aesthetic Floral Theme:** Lush bouquet of fresh pink blooming roses wrapped neatly in neutral kraft paper.
- **Sunny Blue Sky Background:** Deep azure blue sky with soft white clouds and golden sunlight rim lighting.
- **Authentic Portrait Details:** Natural skin tones, authentic hair texture, and relaxed casual styling.

---

## SEO Keywords & Search Tags
Ai photo editing prompt, AI photo editing prompt for boys, AI image editing prompt, AI image editing prompt for boys, AI photo editing prompt for boy, AI image editing prompt for boy, AI prompt, boys prompt, boy AI prompt, boys AI prompt, boy prompt, chat GPT prompt, Gemini prompt, Chat gpt prompt for boys, Gemini prompt for boys, chat GPT prompt boy, Gemini prompt boy, Pink roses boy portrait, Blue sky aesthetic prompt`,
    prompt: `Create an ultra-realistic, cinematic portrait photograph of a young man holding a lush bouquet of delicate pink roses against a brilliant clear blue sky with fluffy white clouds, using the uploaded photograph as the facial identity reference.
FACE IDENTITY REFERENCE: Use the uploaded photo to preserve the person's exact facial structure, eyes, eyebrows, nose, lips, jawline, natural skin tone, and recognizable facial features. Retain his natural dark hair texture and realistic facial expression. Do not create a different-looking person or apply excessive beautification.
SUBJECT & POSE: The young man stands outdoors with an elegant, gentle expression, holding a fresh bouquet of blooming pink roses wrapped neatly in kraft paper in front of his chest. He wears a stylish relaxed casual outfit with natural fabric folds and authentic textile detail.
BACKGROUND & LIGHTING: A bright open sky with vibrant azure blue tones, gentle sunlit white clouds, and soft golden-hour daylight casting warm natural highlights on his hair, shoulders, and rose petals. Beautiful shallow depth-of-field with creamy background bokeh.
CAMERA & COMPOSITION: Vertical 3:4 portrait composition, crisp 8K DSLR portrait quality, realistic skin pores and texture, natural eye reflections, vibrant lifelike colors, and fine botanical details on the roses.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyRhtPmUoWFSRJDeNEyFBLrDZG7blZuRS9rvfQhtPemXHocLJ4qGijezErko6CQ2nBNE6Uw34u3OIvO0lzsHXXu_9WromTngXVi2WVKn7UuooYMJijyKmeLS4mNbgTCN4QdmWg52gAy3izWaetEDtKfc8cRzYQ-eCtylhTdsZeNsDN9zWalmbOOKGiugs/s1600/image.png',
    tags: [
      'Boys',
      'Pink Roses',
      'Blue Sky',
      'Romantic Portrait',
      'Trending',
      'ChatGPT',
      'Gemini',
      'Ai photo editing prompt',
      'AI photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 168,
    viewsCount: 1420,
    copyCount: 420,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T09:50:00.000Z',
  },
  {
    id: 'dreamy-blue-pixel-stretch-cinematic-art',
    title: 'Dreamy Blue Pixel Stretch – Cinematic Back View Art',
    category: 'Boys',
    description: `# Dreamy Blue Pixel Stretch: Cinematic Back View Art Guide

Generate an avant-garde, ultra-modern digital art portrait featuring dramatic cyan and sapphire blue pixel-stretch trails and back-profile aesthetics using ChatGPT (GPT-4o) or Google Gemini with your reference photo.

## Important Rules for Uploading Your Personal Photo
- **Clear Head & Profile View:** Upload a photo where your profile or three-quarter view, hairstyle, ear contours, and jawline are clearly visible.
- **Accurate Hairstyle:** Ensure your natural haircut and hairline are clearly shown so the AI accurately reconstructs your hair in the back view.
- **High Clarity:** Do not use pixelated or compressed photos; clean input produces pristine art.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Select Your Personal Photo
Choose a high-clarity photo showing your facial structure and hairstyle.

### Step 2: Open ChatGPT or Google Gemini
Launch ChatGPT (GPT-4o) or Google Gemini on your phone or web browser.

### Step 3: Attach Your Personal Photo
Attach the reference photo into the AI prompt box.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait for the 7-second countdown, then click the green **Click to Copy Now** button.

### Step 5: Paste & Submit
Paste the prompt into the chat together with your attached photo and submit.

### Step 6: Download Your Artwork
Inspect the smooth horizontal pixel streak gradients, neon rim highlights, and deep shadows. Download your high-res digital artwork!

---

## Key Highlights of This Prompt
- **Avant-Garde Pixel Stretch:** Slit-scan motion streaks flowing in electric blue, cyan, and deep navy tones across the frame.
- **Cinematic Moody Aesthetic:** Atmospheric neon rim lighting, rich shadows, and album-cover-grade visual styling.
- **Streetwear Fashion:** Contemporary jacket/hoodie textures and textured hair detailing.

---

## SEO Keywords & Search Tags
Ai photo editing prompt, AI photo editing prompt for boys, AI image editing prompt, AI image editing prompt for boys, AI photo editing prompt for boy, AI image editing prompt for boy, AI prompt, boys prompt, boy AI prompt, boys AI prompt, boy prompt, chat GPT prompt, Gemini prompt, Chat gpt prompt for boys, Gemini prompt for boys, chat GPT prompt boy, Gemini prompt boy, Blue pixel stretch prompt, Cinematic back view art boy`,
    prompt: `Create an artistic, ultra-modern cinematic digital portrait featuring a dramatic blue pixel-stretch and motion distortion effect, using the uploaded photograph as reference.
SUBJECT & COMPOSITION: A young man captured in a moody, cinematic back-three-quarter view or profile angle, looking into the distance with contemplative energy. He sports modern textured dark hair and wears an oversized dark streetwear jacket or minimalist hoodie with realistic fabric textures.
ARTISTIC VISUAL EFFECT: An avant-garde horizontal pixel stretch and slit-scan chromatic streak effect radiating from the subject across the background in vivid sapphire blue, cyan, and deep midnight navy tones, blending digital glitch art with high-fashion portraiture.
ATMOSPHERE & LIGHTING: Moody cinematic neon rim lighting highlighting his silhouette, jawline, and shoulders, with deep rich shadows and atmospheric haze.
CAMERA & QUALITY: Vertical 3:4 aspect ratio, high-resolution digital artwork, sharp foreground details contrasting with artistic fluid pixel trails, professional album cover aesthetic.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKMr6Gm0sbDyRE0TsSkSnk4SHEaTGi4ay4Nq9xJnBvKzZUCx8jdQJ9c1XsxqbYd01fjW0N1xhv61zfHkQjeOxdIiN3IBSgVz1_BCqfLUolni6-dZjIVI5OtwfVcBNeJ0NMu-7XhGar6w7BXmew9u4damP7URLrHlhlMC84pASSS3gLBOYgC-ySR6BEov0/s1600/image.png',
    tags: [
      'Boys',
      'Pixel Stretch',
      'Cinematic Art',
      'Back View',
      'Blue Aesthetic',
      'Trending',
      'ChatGPT',
      'Gemini',
      'Ai photo editing prompt',
      'AI photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 195,
    viewsCount: 1590,
    copyCount: 460,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T09:40:00.000Z',
  },
  {
    id: 'dreamy-wildflower-paradise-golden-hour-portrait',
    title: 'Dreamy Wildflower Paradise – Golden Hour Cinematic Portrait',
    category: 'Boys',
    description: `# Dreamy Wildflower Paradise: Golden Hour Portrait Guide

Create a magnificent, ultra-realistic portrait standing inside an endless wildflower meadow during golden hour using ChatGPT (GPT-4o) or Google Gemini with your facial identity reference.

## Important Rules for Uploading Your Personal Photo
- **Clear Face Shot:** Choose a sharp photo showing your eyes, smile or serene expression, jawline, and natural skin tone.
- **Natural Light:** Photos taken with even daylight help the AI match golden-hour sunlight naturally.
- **Real Hair:** Ensure your natural haircut and hair texture are easily visible.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Select Your Photo
Choose a high-definition personal portrait photo following the rules above.

### Step 2: Open ChatGPT or Google Gemini
Launch ChatGPT (GPT-4o) or Google Gemini on your mobile device or web browser.

### Step 3: Attach the Photo
Upload your face reference picture to the prompt input.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait for the 7-second countdown, then click the green **Click to Copy Now** button.

### Step 5: Paste & Generate
Paste the prompt into the AI chat box alongside your photo and generate.

### Step 6: Download in High Resolution
Check the soft flower petals, warm golden sunlight flares, and crisp facial details. Download your 4K portrait!

---

## Key Highlights of This Prompt
- **Panoramic Wildflower Field:** Carpet of yellow, purple, coral, and white blooming blossoms stretching to the horizon.
- **Golden Hour Backlighting:** Warm golden sunset rays creating natural lens flares and glowing bokeh.
- **Casual Linen Style:** Relaxed cream linen button-down shirt with natural textile textures.

---

## SEO Keywords & Search Tags
Ai photo editing prompt, AI photo editing prompt for boys, AI image editing prompt, AI image editing prompt for boys, AI photo editing prompt for boy, AI image editing prompt for boy, AI prompt, boys prompt, boy AI prompt, boys AI prompt, boy prompt, chat GPT prompt, Gemini prompt, Chat gpt prompt for boys, Gemini prompt for boys, chat GPT prompt boy, Gemini prompt boy, Wildflower golden hour prompt, Boys meadow photoshoot AI`,
    prompt: `Create a breathtaking, ultra-realistic cinematic portrait of a young man immersed in a dreamy wildflower meadow during golden hour, using the uploaded photograph as the facial identity reference.
FACE IDENTITY REFERENCE: Preserve the person's exact facial structure, eyes, eyebrows, nose, lips, skin tone, and authentic facial proportions. Keep his natural dark hair styled naturally in the gentle outdoor breeze.
SUBJECT & POSE: The young man stands amidst a dense sea of vibrant blooming wildflowers, surrounded by colorful blossoms in shades of yellow, purple, white, and coral. He wears a stylish earth-toned or cream relaxed-fit linen shirt with rolled-up sleeves. His expression is serene and contemplative, looking towards the warm sun.
BACKGROUND & LIGHTING: A magical panoramic wildflower field under a warm golden sunset sky, with glowing sun rays piercing through the blossoms, creating lens flares, dust motes, and soft glowing bokeh.
CAMERA & COMPOSITION: Vertical 3:4 portrait, professional 85mm f/1.4 lens aesthetic, rich dynamic range, lifelike skin texture, and razor-sharp focal clarity on the subject.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwMo2xARdrEB7yyDiZIBprmWdrQBK1g7x62vG5y5Q0fxBXKpvdRMsA_p2nI4hSSwl3eEOkj5hIK_b7gkeQOsBwnAsbKpVd7OHtZgAq-XzRuVYybnf30O4BxAt1kvWJU_oOgIsVdZuYR4fYJC0Ovoo_r_f5_L4brG5_HehRMhRrMP-taD1rtZlb-sBodfM/s1600/image.png',
    tags: [
      'Boys',
      'Wildflower Paradise',
      'Golden Hour',
      'Meadow Portrait',
      'Trending',
      'ChatGPT',
      'Gemini',
      'Ai photo editing prompt',
      'AI photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 182,
    viewsCount: 1350,
    copyCount: 395,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T09:30:00.000Z',
  },
  {
    id: 'purple-water-lilies-cinematic-boat-portrait',
    title: 'Purple Water Lilies – Cinematic Boat Portrait in Sapphire Blue Sky',
    category: 'Boys',
    description: `# Purple Water Lilies & Boat Portrait Guide

Create an enchanting, ultra-realistic portrait of a young man on a handcrafted wooden boat floating across a serene lake filled with blooming purple water lilies under a sapphire sky using ChatGPT (GPT-4o) or Google Gemini.

## Important Rules for Uploading Your Personal Photo
- **Front Face Clarity:** Provide a sharp photo showing clear facial features, eyes, nose, and lips.
- **Authentic Hair:** Make sure hair length and styling are visible for realistic reproduction.
- **Even Illumination:** Avoid extreme dark shadows across one half of the face.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Select Your Clear Photo
Choose a high-quality picture where your face is clearly visible.

### Step 2: Open ChatGPT or Google Gemini
Open ChatGPT (GPT-4o) or Google Gemini on your device.

### Step 3: Attach the Face Reference Photo
Upload the photo into the message input field.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait for the 7-second countdown, then click the green **Click to Copy Now** button.

### Step 5: Paste & Generate
Paste the prompt alongside your photo and send.

### Step 6: Download Your Photo
Verify the vivid purple water lilies, sparkling water reflections, and natural skin details. Save your high-resolution portrait!

---

## Key Highlights of This Prompt
- **Scenic Lake Environment:** Traditional wooden canoe surrounded by green lily pads and vivid purple water lilies.
- **Sapphire Sky & Water Reflections:** Crystal water caustics, soft morning clouds, and lush horizon landscape.
- **Crisp Casual Attire:** Clean white button-down shirt with natural fabric creases.

---

## SEO Keywords & Search Tags
Ai photo editing prompt, AI photo editing prompt for boys, AI image editing prompt, AI image editing prompt for boys, AI photo editing prompt for boy, AI image editing prompt for boy, AI prompt, boys prompt, boy AI prompt, boys AI prompt, boy prompt, chat GPT prompt, Gemini prompt, Chat gpt prompt for boys, Gemini prompt for boys, chat GPT prompt boy, Gemini prompt boy, Purple water lily prompt, Boat lake portrait prompt`,
    prompt: `Create an enchanting, ultra-realistic cinematic portrait of a young man sitting aboard a traditional wooden boat floating across a calm serene lake completely covered with blooming purple water lilies, using the uploaded photo as the facial identity reference.
FACE IDENTITY REFERENCE: Faithfully preserve the subject's exact facial features, natural skin tone, eyes, eyebrows, nose, lips, jawline, and authentic hairstyle from the reference photo.
SUBJECT & POSE: The young man is seated gracefully at the front of a handcrafted wooden boat, wearing a stylish crisp white or light blue casual button-down shirt. One hand rests on the boat edge or gently touches a water lily blossom. He has a calm, introspective gaze toward the horizon.
SETTING & WATER: A vast tranquil lake overflowing with lush green lily pads and vivid purple and violet lotus flowers floating gracefully on crystal-clear water reflections. In the background, a breathtaking sapphire-blue sky with soft wispy clouds and calm distant mountains or tree lines.
CAMERA & LIGHTING: Vertical 3:4 framing, natural morning daylight with soft sparkling water caustics, cinematic color grading, rich vibrant colors, high-detail water ripples, and crisp photographic depth.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwTIUdam1AEB85BbGrpPk3sH_5P-AJgcxSU7Rb1QqMHSwPQdP2vvOMQlNdIcfXgOUJ7I4p1Z8pABqovvu5e-Iz_ZNiSvodg2-SM3CbawFZ8eYRxl8jH6XBFYByjFl6Dsyn2OL0Dzo6ykmNGS-s0QkUyrEf33zA9s6r_mFcfa8PbmhEp9iD4LSWwqn8WhI/s1600/image.png',
    tags: [
      'Boys',
      'Water Lilies',
      'Boat Portrait',
      'Sapphire Sky',
      'Lake Scenery',
      'Trending',
      'ChatGPT',
      'Gemini',
      'Ai photo editing prompt',
      'AI photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 174,
    viewsCount: 1410,
    copyCount: 412,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T09:20:00.000Z',
  },
  {
    id: 'pink-bougainvillea-garden-yellow-shirt-portrait',
    title: 'Pink Bougainvillea Garden – Elegant Yellow Shirt Portrait',
    category: 'Boys',
    description: `# Pink Bougainvillea Garden Portrait Guide

Create a stunning, sun-drenched outdoor portrait leaning against a Mediterranean stone wall covered with cascading pink bougainvillea flowers wearing an elegant pastel yellow shirt using ChatGPT (GPT-4o) or Google Gemini.

## Important Rules for Uploading Your Personal Photo
- **High Quality:** Use an original photo from your camera gallery, not a blurry screenshot.
- **Visible Facial Features:** Ensure both eyes, eyebrows, nose bridge, lips, and facial contours are sharp.
- **Natural Hairstyle:** Keep hair unhidden so the AI matches your exact haircut.

---

## Step-by-Step Tutorial: How to Generate with ChatGPT & Google Gemini

### Step 1: Select Your Clear Photo
Choose a high-resolution front-facing photo showing your natural features.

### Step 2: Open ChatGPT or Google Gemini
Launch the ChatGPT application (GPT-4o) or Google Gemini.

### Step 3: Attach the Photo
Upload your personal reference photo to the prompt input.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button above. Wait for the 7-second countdown, then click the green **Click to Copy Now** button.

### Step 5: Paste & Submit
Paste the prompt into the conversation and request a 3:4 portrait.

### Step 6: Review & Download
Admire the sun-dappled shadows, rich bougainvillea blossoms, and lifelike skin pores. Download your 4K portrait!

---

## Key Highlights of This Prompt
- **Vibrant Bougainvillea Floral Wall:** Dense cascades of hot pink and magenta flowers against sun-warmed stone.
- **Summer Fashion:** Tailored pastel yellow/mustard linen shirt with rolled sleeves and classic wristwatch.
- **Dappled Sunlight:** Warm Mediterranean morning lighting filtering through the petals.

---

## SEO Keywords & Search Tags
Ai photo editing prompt, AI photo editing prompt for boys, AI image editing prompt, AI image editing prompt for boys, AI photo editing prompt for boy, AI image editing prompt for boy, AI prompt, boys prompt, boy AI prompt, boys AI prompt, boy prompt, chat GPT prompt, Gemini prompt, Chat gpt prompt for boys, Gemini prompt for boys, chat GPT prompt boy, Gemini prompt boy, Bougainvillea flower prompt, Yellow shirt boy photoshoot AI`,
    prompt: `Create an ultra-realistic, aesthetically pleasing outdoor portrait of a young man standing beside an overflowing wall of vibrant pink bougainvillea flowers, using the uploaded photograph as the facial identity reference.
FACE IDENTITY REFERENCE: Accurately replicate the person's authentic facial identity, facial structure, eyes, eyebrows, nose, lips, and natural skin tone. Keep his natural dark hairstyle with realistic strands and texture.
SUBJECT & POSE: The young man stands in a relaxed, handsome pose leaning gently against an ancient sun-bleached stone archway or white stucco wall draped in cascades of blooming pink and magenta bougainvillea. He wears an elegant, fitted pastel yellow or mustard linen shirt with the top buttons unbuttoned and sleeves rolled up, paired with stylish trousers and a classic watch.
ATMOSPHERE & LIGHTING: Mediterranean summer morning sunlight filtering through the bougainvillea petals, casting soft dappled shadows and a warm luminous glow across the subject.
CAMERA & QUALITY: Vertical 3:4 composition, 8K professional DSLR photography, natural skin pores, realistic textile folds, vibrant floral tones, and creamy bokeh in the background.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnbflFXxTuX2sQ4-e0lfClbTSwO9nprf3mPKYgwPFk4OikmbhhdDgf5h_J-KkgDp11IHv_JHWHO5iRmbw7St786uFFR7QPshW_R7GXcm2Po_Da4kprr0ZWFDTxZ6Uc61b3UA9YuBgg7FKMye5s5XJBcJbSUpITMXTztzk4uRb3hbTi74_qgunzxRWClv0/s1600/image.png',
    tags: [
      'Boys',
      'Bougainvillea',
      'Yellow Shirt',
      'Garden Portrait',
      'Trending',
      'ChatGPT',
      'Gemini',
      'Ai photo editing prompt',
      'AI photo editing prompt for boys',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 161,
    viewsCount: 1390,
    copyCount: 378,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-08T09:10:00.000Z',
  },
  {
    id: 'royal-diwali-navy-blue-sherwani-palace',
    title: 'Royal Diwali Portrait – Elegant Navy Blue Sherwani & Palace Courtyard Look',
    category: 'Boys',
    description: `# Royal Diwali Portrait: Navy Blue Sherwani & Palace Courtyard Guide

Learn how to create an ultra-realistic, premium-quality 4K royal festive portrait featuring an elegant deep navy-blue traditional sherwani with antique-gold embroidery and a silk stole in a majestic palace courtyard using ChatGPT (GPT-4o) or Google Gemini with your own reference photograph.

## What Is This AI Photo Editing Prompt?
This prompt captures the grand majesty of a royal Diwali celebration. Positioned inside an authentic traditional palace courtyard with carved sandstone pillars, decorative arches, glowing clay diyas, and hanging lanterns at dusk, it turns your portrait into an editorial-grade royal festive photoshoot while preserving 100% of your real facial features.

## Step-by-Step Tutorial: How to Create This Photo

### Step 1: Select Your Personal Photo
Choose a clear, front-facing photograph where your face structure, eyes, eyebrows, nose, lips, jawline, and natural hairstyle are clearly visible.

### Step 2: Open ChatGPT or Google Gemini
Launch ChatGPT (GPT-4o image generation) or Google Gemini on your smartphone or web browser.

### Step 3: Attach Your Face Reference
Upload your personal picture to the chat prompt box so the AI uses your real identity as the facial anchor.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button. Wait 7 seconds for the countdown, then click the green **Click to Copy Now** button to copy the complete prompt to your clipboard.

### Step 5: Paste & Generate
Paste the prompt into the message box alongside your uploaded photo. Instruct the AI to generate a vertical 3:4 portrait.

### Step 6: Review & Download
Verify the intricate antique-gold embroidery, realistic fabric folds, warm lantern reflections, and dusk atmosphere. Download your 4K royal festive portrait!

---

## Key Highlights of This Prompt
- **Royal Sherwani Outfit:** Deep navy-blue sherwani with elaborate antique-gold embroidery and matching silk stole.
- **Palace Courtyard Setting:** Carved sandstone pillars, traditional arches, clay diyas along pathways, and glowing brass lanterns.
- **Atmospheric Dusk Lighting:** Soft purple-blue dusk sky combined with warm golden flame illumination.
- **Face Identity Preservation:** Locks your natural skin tone, facial proportions, hairline, and expression.

---

## SEO Keywords & Search Tags
Diwali prompt for boys, Royal Diwali portrait, Navy blue sherwani AI photo, Palace courtyard Diwali photoshoot, Boys Diwali prompt, Diwali AI photo editing prompt, Best Diwali prompt for boys, Indian royal traditional portrait, ChatGPT Diwali prompt, Gemini Diwali prompt`,
    prompt: `Generate an ultra-realistic, premium-quality 4K royal festive portrait using the uploaded personal photograph as the facial identity reference.

**1. FACIAL IDENTITY PRESERVATION**

Reproduce the exact same person from the uploaded personal photograph. Preserve his original facial structure, eyes, eyebrows, nose, lips, jawline, natural skin tone, hairstyle, hairline, and hair texture. Maintain his authentic facial appearance and recognizable identity. Do not replace his face, change his hairstyle, apply artificial beautification, or modify his natural expression.

**2. ROYAL TRADITIONAL OUTFIT**

Dress him in a luxurious deep navy-blue traditional Indian sherwani featuring elaborate antique-gold embroidery along the collar, front panel, chest, and sleeve cuffs. Add a matching navy-blue silk stole draped elegantly over his shoulders. The fabric should have a premium woven texture with intricate embroidery and realistic natural folds.

**3. POSE AND BODY LANGUAGE**

Show him standing confidently in a graceful royal pose, facing the camera. One hand rests naturally near his waist while the other hangs comfortably beside his body. His posture should look elegant, relaxed, and dignified. Maintain natural body proportions and realistic hand positioning.

**4. PALACE-STYLE BACKGROUND**

Place him inside a magnificent traditional palace courtyard featuring beautifully carved sandstone pillars, decorative arches, ornate stone railings, and elegant architectural details.

Decorate the courtyard with numerous traditional clay diyas arranged along the pathways, railings, and architectural edges. Include beautiful hanging decorative lanterns emitting warm golden light. The entire environment should feel luxurious, festive, and visually captivating.

**5. SKY AND ATMOSPHERE**

Create a beautiful dusk atmosphere with a soft blue and purple evening sky visible through the palace architecture. Warm lights from the diyas and lanterns should illuminate the surrounding stone surfaces, creating a magical yet natural festive environment.

**6. CINEMATIC PHOTOGRAPHY**

Professional DSLR portrait photography, realistic facial texture, natural skin tones, intricate clothing details, cinematic golden lighting, balanced shadows, realistic depth of field, sharp focus, lifelike colors, and premium photographic quality.

**7. IMAGE COMPOSITION**

Vertical 3:4 portrait aspect ratio, elegant medium-to-full-body framing, subject positioned centrally, with palace architecture and decorative lights clearly visible in the background.

**FINAL INSTRUCTIONS:**

Prioritize authentic facial identity and photographic realism. The personal photograph must determine the person's face and hairstyle. Avoid facial distortion, artificial skin smoothing, unrealistic anatomy, extra fingers, cartoon effects, or excessive visual enhancement.

The final result should resemble a genuine professional royal Diwali photoshoot captured with a high-end DSLR camera.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjsOPQ-pN-BZIvKlkFHrgH_kHSf2ltWw7c86bpN4ooTzhglgzOsZqEAqoyX1IBAN0udLAnAIFFW580TziPwYvrbwvNHzALPsCz3K8euKekchKigVX7SkPV66E2ZcF8aVvcqakB9Agojl2TkBseDyvnv5oHw6HcrapZejbHf8nDQfQdt3-HCf0kynkiE_g/s1600/image.png',
    tags: [
      'Boys',
      'Diwali',
      'Diwali prompt for boys',
      'Diwali AI photo editing prompt',
      'Royal Sherwani',
      'Palace Courtyard',
      'Navy Blue',
      'Trending',
      'ChatGPT',
      'Gemini',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '3:4',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-06T17:30:00.000Z',
  },
  {
    id: 'vintage-motorcycle-classic-denim',
    title: 'Vintage Denim Motorcycle Portrait – Classic Bike Street Style',
    category: 'Boys',
    description: `# Vintage Denim Motorcycle Portrait: Classic Bike Style Guide

Create an authentic, ultra-realistic 8K vintage-inspired street-style portrait leaning casually against a classic black motorcycle in full acid-wash denim with 35mm film aesthetics using ChatGPT (GPT-4o) or Google Gemini with your own reference photograph.

## What Is This AI Photo Editing Prompt?
This prompt captures an iconic street portrait leaning against an authentic classic Japanese commuter bike in an oversized acid-wash denim jacket, vintage graphic tee, and dark sunglasses, crafting a genuine 35mm film photograph with warm sepia daylight and subtle analog film grain while preserving your true facial features and hairstyle.

## Step-by-Step Tutorial: How to Create This Photo

### Step 1: Select Your Personal Photo
Select a clear photograph of yourself with natural lighting showing your face, hairline, eyes, and natural facial hair.

### Step 2: Open ChatGPT or Google Gemini
Launch ChatGPT (GPT-4o image generation) or Google Gemini on your smartphone or web browser.

### Step 3: Attach Your Personal Photo
Upload your reference photo into the chatbox so the AI model preserves your exact facial structure and identity.

### Step 4: Copy the AI Prompt
Click the **Copy Full Prompt** button. Wait 7 seconds for the countdown, then click the green **Click to Copy Now** button to copy the complete prompt to your clipboard.

### Step 5: Paste & Generate
Paste the prompt into the message box alongside your uploaded photo. Instruct the AI to generate a vertical 4:5 portrait.

### Step 6: Review & Download
Examine the authentic faded denim fabric texture, chrome motorcycle reflections, and analog 35mm film tone. Download your high-resolution vintage street portrait!

---

## Key Highlights of This Prompt
- **Vintage Street Fashion:** Oversized acid-wash denim jacket with rolled sleeves, graphic tee, matching jeans, dark sunglasses, and leather belt.
- **Classic Vintage Motorcycle:** Black 1980s Japanese-style commuter bike with visible chrome details, round headlight, and engine.
- **Analog 35mm Film Aesthetic:** Warm sepia daylight, gentle photographic grain, faded highlights, and realistic street roadside setting.
- **Identity Lock:** Preserves natural skin texture, hair length, and recognizable facial characteristics without digital smoothing.

---

## SEO Keywords & Search Tags
Vintage denim prompt, Vintage motorcycle portrait, Vintage denim AI photo, 90s street style AI prompt, Classic bike portrait prompt, 35mm film aesthetic AI photo, Vintage motorcycle photoshoot, Boys AI photo editing prompt, ChatGPT vintage prompt, Gemini vintage prompt`,
    prompt: `Create an ultra-realistic 8K vintage-inspired 1990s street-style portrait using the uploaded personal photograph as the facial identity reference.
FACE AND HAIRSTYLE PRESERVATION:
Use the uploaded reference photo to maintain the person's authentic facial identity. Preserve his original facial structure, eyes, nose, lips, jawline, natural skin tone, and recognizable facial characteristics. Give special attention to maintaining his natural hairstyle and facial hair as closely as possible. Do not replace his identity with a different person or apply artificial facial beautification.
90s VINTAGE STREET FASHION:
Dress him in a classic acid-wash denim outfit inspired by authentic 1990s street fashion. Include:
- A slightly oversized blue vintage denim jacket with rolled-up sleeves.
- A plain white casual T-shirt featuring a small original vintage-inspired graphic without any brand logo.
- Matching high-waisted acid-wash denim jeans.
- A classic dark leather belt.
- Stylish vintage dark-tinted sunglasses.
- A simple vintage wristwatch.
The clothing should have authentic faded denim textures, natural wrinkles, and a relaxed vintage fit.
POSE AND MOTORCYCLE:
Position him casually leaning against a classic black 1980s-style vintage motorcycle inspired by the traditional Japanese commuter bikes of that era. Keep the motorcycle's fuel tank, chrome details, round headlight, engine, handlebars, and seat clearly visible.
Both hands should rest naturally inside his front jean pockets. His body should lean slightly against the motorcycle, with a relaxed and confident posture. His head should turn slightly to one side, creating a stylish candid street-photography expression.
BACKGROUND AND SETTING:
Create a nostalgic outdoor roadside environment inspired by small-town streets in the 1990s. Include an old-fashioned roadside building, faded painted signboards with original generic wording, distant trees, and a quiet dusty road. Keep the environment authentic, simple, and naturally aged.
VINTAGE PHOTOGRAPHIC STYLE:
Use warm faded sepia tones mixed with muted earthy colors, subtle analog film grain, gentle photographic imperfections, slightly faded highlights, soft natural daylight, and realistic shadows.
Give the photograph the appearance of an authentic 35mm film photograph captured with a classic analog camera during the 1990s. Include subtle aged-film texture and delicate vintage print borders without making the image look artificially damaged.
CAMERA AND COMPOSITION:
Vertical 4:5 portrait composition, medium-to-full-body framing, subject prominently positioned in the center, motorcycle clearly visible beside and behind him. Professional vintage street photography, realistic anatomy, detailed skin texture, authentic denim fabric, natural lighting, and exceptionally lifelike details.
FINAL REQUIREMENTS:
The final image must capture the genuine charm of 1990s youth fashion and motorcycle culture. Maintain the person's recognizable identity, natural appearance, and realistic proportions. Avoid modern fashion elements, cartoon effects, excessive digital sharpening, distorted hands, artificial skin, and recognizable third-party brand logos.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfHGavzFK-xB5wCGq3k80KcNrzYHd3RmEy1HlC8-rngXHf7255HxUFGqeU727RGXKlHChGH8eUi1-jCGJXwEBdT_FoMRFLPFIHRkRsd3ZBI2cmVXCnbSlQ3Y2CBo0TN8t0zAChhGQpnkfo-11wXRI6XhmAXz4sfqsljm8mwmTbLv5Ddl54ZdCPDD3kJGE/s1600/image.png',
    tags: [
      'Boys',
      'Vintage',
      'Motorcycle',
      'Classic Bike',
      'Acid Wash Denim',
      '35mm Film',
      'Trending',
      'ChatGPT',
      'Gemini',
    ],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '4:5',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-06T17:20:00.000Z',
  },
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
Click the **Copy Full Prompt** button. Wait 7 seconds for the countdown, then click the green **Click to Copy Now** button to copy the complete prompt to your clipboard.

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
The final result should closely recreate the first reference photograph while featuring the real person from the personal face reference. It must look like an authentic professional photograph, not an AI-generated illustration.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
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
    createdAt: '2026-11-06T16:00:00.000Z',
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
Click the **Copy Full Prompt** button. Wait 7 seconds for the countdown, then click the green **Click to Copy Now** button to copy the full prompt to your clipboard.

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
Final Requirements: The result must resemble a genuine professional festive photograph. Preserve the person's real facial identity and original hairstyle. Avoid artificial facial modifications, cartoon effects, distorted hands, unrealistic anatomy, or excessive visual effects. Prioritize photographic realism and an elegant traditional Diwali atmosphere.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
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
    createdAt: '2026-11-06T15:50:00.000Z',
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
Click the **Copy Full Prompt** button. Wait 7 seconds for the countdown, then click the green **Click to Copy Now** button to copy the full prompt to your clipboard.

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
The final image must look like an authentic high-end festive photoshoot rather than an illustration or artificial digital artwork. Keep the person's real face and original hairstyle recognizable. Avoid distorted fingers, incorrect hand positions, unnatural facial features, excessive skin smoothing, or unrealistic lighting. Prioritize facial identity, photographic realism, and traditional Diwali elegance.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
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
    createdAt: '2026-11-06T15:40:00.000Z',
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
Click the **Copy Full Prompt** button. Wait 7 seconds for the countdown, then click the green **Click to Copy Now** button to copy the complete prompt to your clipboard.

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
The uploaded personal photograph determines the person's real face and hairstyle. Do not generate a different identity. Avoid facial alterations, distorted hands, extra fingers, artificial skin smoothing, incorrect body proportions, or cartoon-like effects. The final output must look like an authentic professional nighttime portrait.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
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
    createdAt: '2026-11-06T15:30:00.000Z',
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
Click the **Copy Full Prompt** button. Wait 7 seconds for the countdown, then click the green **Click to Copy Now** button to copy the complete English prompt to your clipboard.

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
Important: The final result must look like a genuine professional photograph, not a digital painting, cartoon, or artificial-looking AI portrait. Maintain the original person's real face and hairstyle with maximum identity consistency.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
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
    createdAt: '2026-11-06T15:20:00.000Z',
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
Click the **Copy Full Prompt** button (wait 7 seconds for the countdown, then click **Click to Copy Now**) to copy the complete English prompt text.

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
Create a completely original photographic composition.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
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
    createdAt: '2026-11-06T15:10:00.000Z',
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
ASPECT RATIO: 9:16

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://piktrio.vercel.app/assets/aistudio/image_615815aa.png',
    tags: ['Boys', 'Automotive', 'Monochrome', 'SUV', 'Streetwear', 'TopDown', 'Trending'],
    isPinned: true,
    isTemplate: false,
    likesCount: 0,
    viewsCount: 0,
    copyCount: 0,
    aspectRatio: '9:16',
    model: 'ChatGPT / Gemini',
    createdAt: '2026-11-05T12:00:00.000Z',
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
The person must have a completely natural, thick, stylish modern hairstyle, regardless of whether the original reference photo shows a bald head. Preserve the person's original facial identity while transforming the hairstyle and creating a stunning cinematic movie-premiere atmosphere.

**STRICT FACE IDENTITY AND NATURAL FACIAL HAIR PRESERVATION:**

Use the uploaded personal reference photo as the exclusive facial identity reference for the person in the generated image. Preserve the person's real facial identity as closely as possible, including their natural facial structure, face shape, forehead, eyebrows, eyes, nose, lips, jawline, chin, cheeks, skin tone, and all distinctive facial characteristics.

**IMPORTANT FACIAL HAIR MATCHING RULE:**

Carefully examine the original face reference photo and reproduce its facial hair exactly as it naturally appears:

- If the reference photo has a beard, include the same natural beard style, shape, density, length, and placement.
- If the reference photo has a moustache, include the same natural moustache style, thickness, shape, and placement.
- If the reference photo has both a beard and a moustache, reproduce both naturally.
- If the reference photo has neither a beard nor a moustache, do not add either one. Keep the face completely clean-shaven.
- Never invent, remove, exaggerate, or alter facial hair that does not match the reference photo.

Do not replace the person's real facial characteristics with a generic model face. Avoid artificial beautification, facial reshaping, unnecessary skin smoothing, or changes to the natural skin tone.

The generated person must look recognizably like the person in the uploaded face reference photo while maintaining the hairstyle, sunglasses, expression, head direction, clothing, body posture, and entire environment described in the main prompt.

**Preserve the reference person's natural identity and facial hair without introducing any unwanted changes.**
`,
    imageUrl: 'https://piktrio.vercel.app/assets/aistudio/image_ad502c62.png',
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
    createdAt: '2026-11-05T10:00:00.000Z',
  },
];
