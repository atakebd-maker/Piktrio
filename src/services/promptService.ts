import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { PromptItem, CategoryItem } from '../types/prompt';
import { PROMPTPIN_CATEGORIES } from '../data/initialPrompts';

const PROMPTS_COLLECTION = 'prompts';
const CATEGORIES_COLLECTION = 'categories';

/**
 * Ensures strictly the 5 requested categories are available in Firestore
 */
export async function seedCategoriesIfEmpty(): Promise<void> {
  try {
    const categoriesRef = collection(db, CATEGORIES_COLLECTION);
    const existingCategories = await getDocs(categoriesRef);

    // Delete any old categories like templates, anime, cinematic, etc.
    const validIds = new Set(PROMPTPIN_CATEGORIES.map((c) => c.id));
    for (const d of existingCategories.docs) {
      if (!validIds.has(d.id)) {
        await deleteDoc(d.ref);
      }
    }

    // Ensure the 5 active categories exist
    for (const cat of PROMPTPIN_CATEGORIES) {
      await setDoc(doc(db, CATEGORIES_COLLECTION, cat.id), cat);
    }
  } catch (err) {
    console.warn('Categories init notice:', err);
  }
}

/**
 * Real-time listener for all prompts from Firestore
 */
export function subscribeToPrompts(
  onData: (prompts: PromptItem[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const promptsRef = collection(db, PROMPTS_COLLECTION);
  const q = query(promptsRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: PromptItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as PromptItem;
        items.push({
          ...data,
          id: docSnap.id,
        });
      });
      onData(items);
    },
    (error) => {
      console.error('Subscription error on prompts:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, PROMPTS_COLLECTION);
    }
  );
}

/**
 * Real-time listener for categories from Firestore
 */
export function subscribeToCategories(
  onData: (categories: CategoryItem[]) => void
): Unsubscribe {
  const categoriesRef = collection(db, CATEGORIES_COLLECTION);
  return onSnapshot(
    categoriesRef,
    (snapshot) => {
      if (snapshot.empty) {
        onData(PROMPTPIN_CATEGORIES);
        return;
      }
      const items: CategoryItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as CategoryItem;
        items.push({
          ...data,
          id: docSnap.id,
        });
      });
      onData(items.length > 0 ? items : PROMPTPIN_CATEGORIES);
    },
    (error) => {
      console.warn('Categories subscription notice:', error);
      onData(PROMPTPIN_CATEGORIES);
    }
  );
}

/**
 * Increment like counter for a prompt in Firestore
 */
export async function likePrompt(promptId: string): Promise<void> {
  const docRef = doc(db, PROMPTS_COLLECTION, promptId);
  try {
    await updateDoc(docRef, {
      likesCount: increment(1),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PROMPTS_COLLECTION}/${promptId}`);
  }
}

/**
 * Increment copy counter for a prompt in Firestore
 */
export async function recordPromptCopy(promptId: string): Promise<void> {
  const docRef = doc(db, PROMPTS_COLLECTION, promptId);
  try {
    await updateDoc(docRef, {
      copyCount: increment(1),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PROMPTS_COLLECTION}/${promptId}`);
  }
}

/**
 * Increment view counter for a prompt in Firestore
 */
export async function recordPromptView(promptId: string): Promise<void> {
  const docRef = doc(db, PROMPTS_COLLECTION, promptId);
  try {
    await updateDoc(docRef, {
      viewsCount: increment(1),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PROMPTS_COLLECTION}/${promptId}`);
  }
}
