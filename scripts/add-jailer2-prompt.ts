import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const config = JSON.parse(readFileSync(resolve(process.cwd(), 'firebase-applet-config.json'), 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId || '(default)');

const TITLE = 'Jailer 2 AI Photo Prompt – Create Realistic Boys AI Photos with ChatGPT & Gemini';

const PROMPT_TEXT = `Create an ultra-realistic, cinematic DSLR photograph using the uploaded image as the face reference. Show the same young man from the reference photo standing confidently outside a luxurious Indian multiplex cinema on 15 October 2026, in front of a massive, spectacularly illuminated JAILER 2 movie promotional billboard.
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
The person must have a completely natural, thick, stylish modern hairstyle, regardless of whether the original reference photo shows a bald head. Preserve the person's original facial identity while transforming the hairstyle and creating a stunning cinematic movie-premiere atmosphere.`;

const DESCRIPTION = `# How to Create Jailer 2 AI Photo Using AI

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
Jailer 2 AI Photo Prompt, Jailer 2 AI Image Prompt, Jailer 2 Photo Editing, Jailer 2 AI Photo Editing Prompt, Jailer 2 Movie Poster AI Prompt, Boys AI Photo Prompt, Boys AI Image Prompt, Boys Photo Editing Prompt, Boys AI Photo Editing, Boys Stylish Photo Prompt, Boys Cinematic AI Photo, Boys New Hairstyle AI Prompt, AI Photo Prompt, AI Image Prompt, AI Photo Editing Prompt, Best AI Prompts, Realistic AI Photo Prompt, Cinematic AI Image Prompt, DSLR AI Photo Prompt, Ultra Realistic AI Photography, AI Portrait Prompt, AI Face Reference Prompt, ChatGPT AI Photo Prompt, ChatGPT Image Prompt, ChatGPT Photo Editing Prompt, ChatGPT Image Generation Prompt, ChatGPT Boys Photo Prompt, Gemini AI Photo Prompt, Gemini AI Image Prompt, Gemini Photo Editing Prompt, Gemini Boys Photo Prompt, Google Gemini Image Generation Prompt, How to Create Jailer 2 AI Photo, Jailer 2 Photo Prompt Copy Paste, Create Movie Poster AI Photo, AI Photo Prompt for Bald Men, AI Hair Style Change Prompt, Realistic Movie Theatre Photo Prompt, AI Photo Editing Using Own Face.`;

async function publish() {
  const docRef = await addDoc(collection(db, 'prompts'), {
    title: TITLE,
    category: 'Boys',
    description: DESCRIPTION,
    prompt: PROMPT_TEXT,
    imageUrl: '/assets/aistudio/jailer2_cinema_prompt.jpg',
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
  });

  console.log('Successfully added Jailer 2 prompt to Firestore! ID:', docRef.id);
  process.exit(0);
}

publish().catch((e) => {
  console.error('Publish error:', e);
  process.exit(1);
});
