import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const config = JSON.parse(readFileSync(resolve(process.cwd(), 'firebase-applet-config.json'), 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId || '(default)');

const NEW_TITLE = 'Black & White Luxury Car Photoshoot AI Prompt – Create Ultra Realistic Mahindra Scorpio Portrait with ChatGPT & Gemini';

const NEW_DESCRIPTION = `# How to Create a Black & White Luxury Car Photoshoot Using AI

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

**Note:** AI-generated results may vary. Always review the final image and follow the image generator's terms regarding commercial use and intellectual property.`;

async function update() {
  const docRef = doc(db, 'prompts', 'orUmpTSCFTyOAc9HOMhV');
  await updateDoc(docRef, {
    title: NEW_TITLE,
    description: NEW_DESCRIPTION,
    updatedAt: new Date().toISOString(),
  });
  console.log('Successfully updated title and description in Firestore!');
  process.exit(0);
}

update().catch((err) => {
  console.error('Update error:', err);
  process.exit(1);
});
