import { prisma } from '../prisma';
import type { Treatment, Prisma } from '@prisma/client';

export async function getTreatments() {
  try {
    return await prisma.treatment.findMany({
      include: {
        patient: true,
        kine: true,
        sessions: {
          include: {
            exercises: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching treatments:', error);
    throw new Error('Failed to fetch treatments');
  }
}

export async function getTreatmentById(id: string) {
  try {
    return await prisma.treatment.findUnique({
      where: { id },
      include: {
        patient: true,
        kine: true,
        sessions: {
          include: {
            exercises: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching treatment ${id}:`, error);
    throw new Error('Failed to fetch treatment');
  }
}

export async function createTreatment(data: Prisma.TreatmentCreateInput) {
  try {
    return await prisma.treatment.create({
      data,
      include: {
        sessions: {
          include: {
            exercises: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error creating treatment:', error);
    throw new Error('Failed to create treatment');
  }
}

export async function updateTreatment(id: string, data: Prisma.TreatmentUpdateInput) {
  try {
    return await prisma.treatment.update({
      where: { id },
      data,
      include: {
        sessions: {
          include: {
            exercises: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error updating treatment ${id}:`, error);
    throw new Error('Failed to update treatment');
  }
}

export async function deleteTreatment(id: string) {
  try {
    return await prisma.treatment.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting treatment ${id}:`, error);
    throw new Error('Failed to delete treatment');
  }
}