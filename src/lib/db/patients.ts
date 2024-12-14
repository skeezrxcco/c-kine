import { prisma } from '../prisma';
import type { Patient, Prisma } from '@prisma/client';

export async function getPatients() {
  try {
    return await prisma.patient.findMany({
      include: {
        appointments: true,
        treatments: true,
        medicalRecord: true,
      },
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw new Error('Failed to fetch patients');
  }
}

export async function getPatientById(id: string) {
  try {
    return await prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: true,
        treatments: true,
        medicalRecord: {
          include: {
            documents: true,
            notes: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching patient ${id}:`, error);
    throw new Error('Failed to fetch patient');
  }
}

export async function createPatient(data: Prisma.PatientCreateInput) {
  try {
    return await prisma.patient.create({
      data,
      include: {
        medicalRecord: true,
      },
    });
  } catch (error) {
    console.error('Error creating patient:', error);
    throw new Error('Failed to create patient');
  }
}

export async function updatePatient(id: string, data: Prisma.PatientUpdateInput) {
  try {
    return await prisma.patient.update({
      where: { id },
      data,
      include: {
        medicalRecord: true,
      },
    });
  } catch (error) {
    console.error(`Error updating patient ${id}:`, error);
    throw new Error('Failed to update patient');
  }
}

export async function deletePatient(id: string) {
  try {
    return await prisma.patient.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting patient ${id}:`, error);
    throw new Error('Failed to delete patient');
  }
}