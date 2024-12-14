'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Treatment } from '@/types';

export async function getTreatments(patientId?: string) {
  try {
    const treatments = await prisma.treatment.findMany({
      where: patientId ? { patientId } : undefined,
      include: {
        patient: true,
        exercises: true,
        objectives: true
      }
    });

    return { data: treatments };
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return { error: 'Failed to fetch treatments' };
  }
}

export async function createTreatment(data: Partial<Treatment>) {
  try {
    const treatment = await prisma.treatment.create({
      data: data as any,
      include: {
        patient: true,
        exercises: true,
        objectives: true
      }
    });
    
    revalidatePath('/treatments');
    return { data: treatment };
  } catch (error) {
    console.error('Error creating treatment:', error);
    return { error: 'Failed to create treatment' };
  }
}

export async function updateTreatment(id: string, data: Partial<Treatment>) {
  try {
    const treatment = await prisma.treatment.update({
      where: { id },
      data: data as any,
      include: {
        patient: true,
        exercises: true,
        objectives: true
      }
    });
    
    revalidatePath('/treatments');
    return { data: treatment };
  } catch (error) {
    console.error('Error updating treatment:', error);
    return { error: 'Failed to update treatment' };
  }
}

export async function deleteTreatment(id: string) {
  try {
    await prisma.treatment.delete({
      where: { id }
    });
    
    revalidatePath('/treatments');
    return { success: true };
  } catch (error) {
    console.error('Error deleting treatment:', error);
    return { error: 'Failed to delete treatment' };
  }
}

export async function addExerciseToTreatment(treatmentId: string, exerciseData: any) {
  try {
    const treatment = await prisma.treatment.update({
      where: { id: treatmentId },
      data: {
        exercises: {
          create: exerciseData
        }
      },
      include: {
        exercises: true
      }
    });
    
    revalidatePath('/treatments');
    return { data: treatment };
  } catch (error) {
    console.error('Error adding exercise:', error);
    return { error: 'Failed to add exercise' };
  }
}

export async function addObjectiveToTreatment(treatmentId: string, objectiveData: any) {
  try {
    const treatment = await prisma.treatment.update({
      where: { id: treatmentId },
      data: {
        objectives: {
          create: objectiveData
        }
      },
      include: {
        objectives: true
      }
    });
    
    revalidatePath('/treatments');
    return { data: treatment };
  } catch (error) {
    console.error('Error adding objective:', error);
    return { error: 'Failed to add objective' };
  }
}
