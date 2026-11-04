import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const config = JSON.parse(readFileSync(resolve(process.cwd(), 'firebase-applet-config.json'), 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId || '(default)');

const PROMPT_TEXT = `SUBJECT & IDENTITY PRESERVATION:
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
ASPECT RATIO: 9:16`;

async function run() {
  await setDoc(doc(db, 'prompts', 'orUmpTSCFTyOAc9HOMhV'), {
    title: 'Monochrome Momentum',
    category: 'Boys',
    description: 'Cinematic black-and-white top-down automotive fashion portrait sitting on the bonnet of a glossy black SUV.',
    prompt: PROMPT_TEXT,
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
  });

  console.log('Successfully updated prompt orUmpTSCFTyOAc9HOMhV in Firestore');
  process.exit(0);
}

run().catch((err) => {
  console.error('Error updating prompt:', err);
  process.exit(1);
});
