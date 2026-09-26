import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Profile, Allergy, Condition, Medication, Vital } from '../types/database.types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string): string {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function calculateAge(dobString?: string): number {
  if (!dobString) return 0;
  const dob = new Date(dobString);
  const diffMs = Date.now() - dob.getTime();
  const ageDate = new Date(diffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export interface PassportCompletionMetrics {
  totalPercent: number;
  completedItems: { title: string; completed: boolean; points: number }[];
}

export function calculatePassportCompletion(
  profile: Profile | null,
  allergies: Allergy[],
  conditions: Condition[],
  medications: Medication[],
  vitals: Vital[]
): PassportCompletionMetrics {
  const items = [
    { title: 'Basic Bio & Blood Group', completed: Boolean(profile?.full_name && profile?.blood_group), points: 20 },
    { title: 'Emergency Contact Phone', completed: Boolean(profile?.emergency_contact_phone), points: 20 },
    { title: 'Allergies & Reactions Listed', completed: allergies.length > 0, points: 20 },
    { title: 'Active Medications / Doses', completed: medications.length > 0, points: 15 },
    { title: 'Chronic Conditions History', completed: conditions.length > 0, points: 15 },
    { title: 'Recent Vitals Logged', completed: vitals.length > 0, points: 10 },
  ];

  const totalPercent = items.reduce((acc, item) => (item.completed ? acc + item.points : acc), 0);

  return {
    totalPercent,
    completedItems: items,
  };
}

export function speakText(text: string, onEnd?: () => void): SpeechSynthesisUtterance | null {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return null;
  }

  window.speechSynthesis.cancel(); // Stop any active speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95; // Slightly slower for clarity
  utterance.pitch = 1.0;
  if (onEnd) utterance.onend = onEnd;

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeech(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
