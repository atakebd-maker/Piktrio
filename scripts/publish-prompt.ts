/**
 * Helper script to publish new prompts directly to Firestore for Piktrio.
 * Usage:
 *   npx tsx scripts/publish-prompt.ts \
 *     --title "Prompt Title" \
 *     --category "Boys" \
 *     --image "/assets/aistudio/image.jpg" \
 *     --prompt "Full prompt description..." \
 *     --description "Short description..." \
 *     --tags "tag1,tag2"
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const configPath = resolve(process.cwd(), 'firebase-applet-config.json');
if (!existsSync(configPath)) {
  console.error('firebase-applet-config.json not found!');
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId || '(default)');

async function main() {
  const args = process.argv.slice(2);
  const getArg = (flag: string) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
  };

  const title = getArg('--title');
  const category = getArg('--category') || 'All';
  const imageUrl = getArg('--image');
  const prompt = getArg('--prompt');
  const description = getArg('--description') || '';
  const tagsStr = getArg('--tags') || '';
  const isPinned = args.includes('--pinned');
  const isTemplate = args.includes('--template');

  if (!title || !imageUrl || !prompt) {
    console.error('Error: --title, --image, and --prompt are required.');
    process.exit(1);
  }

  const tags = tagsStr ? tagsStr.split(',').map((t) => t.trim()) : [category.toLowerCase()];

  const docData = {
    title,
    description,
    prompt,
    imageUrl,
    category,
    tags,
    isPinned,
    isTemplate,
    views: 0,
    copies: 0,
    createdAt: serverTimestamp(),
    aspectRatio: '1:1',
  };

  const docRef = await addDoc(collection(db, 'prompts'), docData);
  console.log(`Successfully published prompt to Piktrio! ID: ${docRef.id}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Publish error:', err);
  process.exit(1);
});
