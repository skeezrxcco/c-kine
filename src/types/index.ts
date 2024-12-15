import {Prisma} from "@prisma/client"

// Types communs
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'kine' | 'secretary' | 'admin';
  imageUrl?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  socialSecurityNumber: string;
  prescribingDoctor: string;
  medicalHistory: string;
  notes: string;
}

export type Appointment = Prisma.AppointmentGetPayload<{
  include: {kine:true, patient:true} 
}>
export interface Treatment {
  id: string;
  patientId: string;
  startDate: string;
  endDate?: string;
  diagnosis: string;
  objectives: string[];
  prescriptionDetails: string;
  prescriptionFile?: string;
  sessions: Session[];
}

export interface Session {
  id: string;
  treatmentId: string;
  date: string;
  exercises: Exercise[];
  notes: string;
  progress: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number;
  repetitions: number;
  sets: number;
  instructions?: string;
}

export interface Bill {
  id: string;
  patientId: string;
  sessionId: string;
  amount: number;
  status: 'pending' | 'paid' | 'rejected';
  date: string;
  paymentMethod?: string;
  insuranceDetails?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'done';
  assignedTo?: string;
}