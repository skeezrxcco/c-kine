import { prisma } from '../prisma';
import type { TeleClaim, Prisma } from '@prisma/client';

export async function getTeleClaims() {
  try {
    return await prisma.teleClaim.findMany({
      include: {
        patient: true,
        bill: true,
      },
    });
  } catch (error) {
    console.error('Error fetching tele-claims:', error);
    throw new Error('Failed to fetch tele-claims');
  }
}

export async function getTeleClaimById(id: string) {
  try {
    return await prisma.teleClaim.findUnique({
      where: { id },
      include: {
        patient: true,
        bill: true,
      },
    });
  } catch (error) {
    console.error(`Error fetching tele-claim ${id}:`, error);
    throw new Error('Failed to fetch tele-claim');
  }
}

export async function createTeleClaim(data: Prisma.TeleClaimCreateInput) {
  try {
    return await prisma.teleClaim.create({
      data,
      include: {
        patient: true,
        bill: true,
      },
    });
  } catch (error) {
    console.error('Error creating tele-claim:', error);
    throw new Error('Failed to create tele-claim');
  }
}

export async function updateTeleClaim(id: string, data: Prisma.TeleClaimUpdateInput) {
  try {
    return await prisma.teleClaim.update({
      where: { id },
      data,
      include: {
        patient: true,
        bill: true,
      },
    });
  } catch (error) {
    console.error(`Error updating tele-claim ${id}:`, error);
    throw new Error('Failed to update tele-claim');
  }
}

export async function deleteTeleClaim(id: string) {
  try {
    return await prisma.teleClaim.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting tele-claim ${id}:`, error);
    throw new Error('Failed to delete tele-claim');
  }
}