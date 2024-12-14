'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Patient } from '@/types';

export async function getPatients(searchQuery?: string) {
  try {
    const patients = await prisma.patient.findMany({
      where: searchQuery ? {
        OR: [
          { firstName: { contains: searchQuery, mode: 'insensitive' } },
          { lastName: { contains: searchQuery, mode: 'insensitive' } },
          { email: { contains: searchQuery, mode: 'insensitive' } }
        ]
      } : undefined,
      include: {
        appointments: true,
        treatments: true,
        medicalRecord: {
          include: {
            documents: true,
            notes: true
          }
        }
      }
    });

    return { data: patients };
  } catch (error) {
    console.error('Error fetching patients:', error);
    return { error: 'Failed to fetch patients' };
  }
}

export async function createPatient(data: Partial<Patient>) {
  try {
    const patient = await prisma.patient.create({
      data: data as any,
      include: {
        appointments: true,
        treatments: true,
        medicalRecord: {
          include: {
            documents: true,
            notes: true
          }
        }
      }
    });
    
    revalidatePath('/patients');
    return { data: patient };
  } catch (error) {
    console.error('Error creating patient:', error);
    return { error: 'Failed to create patient' };
  }
}

export async function updatePatient(id: string, data: Partial<Patient>) {
  try {
    const patient = await prisma.patient.update({
      where: { id },
      data: data as any,
      include: {
        appointments: true,
        treatments: true,
        medicalRecord: {
          include: {
            documents: true,
            notes: true
          }
        }
      }
    });
    
    revalidatePath('/patients');
    return { data: patient };
  } catch (error) {
    console.error('Error updating patient:', error);
    return { error: 'Failed to update patient' };
  }
}

export async function deletePatient(id: string) {
  try {
    await prisma.patient.delete({
      where: { id }
    });
    
    revalidatePath('/patients');
    return { success: true };
  } catch (error) {
    console.error('Error deleting patient:', error);
    return { error: 'Failed to delete patient' };
  }
}
