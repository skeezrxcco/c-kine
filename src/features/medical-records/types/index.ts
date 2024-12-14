import { Patient } from '@/features/patients/types';
import { Treatment } from '@/features/treatments/types';

export interface MedicalRecord {
  id: string;
  patient: Patient;
  bloodType: string;
  allergies: string[];
  medicalHistory: string;
  documents: Document[];
  treatments: Treatment[];
  notes: Note[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  url: string;
}

export interface Note {
  id: string;
  date: string;
  content: string;
  author: string;
}