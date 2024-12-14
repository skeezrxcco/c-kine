'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Appointment } from '@/types';

export async function getAppointments(date: Date) {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        kine: true
      },
      where: {
        datetime: {
          gte: startOfDay,
          lt: endOfDay
        }
      },
      orderBy: {
        datetime: 'asc'
      }
    });

    return { data: appointments };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { error: 'Failed to fetch appointments' };
  }
}

export async function createAppointment(data: Partial<Appointment>) {
  try {
    const appointment = await prisma.appointment.create({
      data: data as any,
      include: {
        patient: true,
        kine: true
      }
    });
    
    revalidatePath('/appointments');
    return { data: appointment };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return { error: 'Failed to create appointment' };
  }
}

export async function updateAppointment(id: string, data: Partial<Appointment>) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: data as any,
      include: {
        patient: true,
        kine: true
      }
    });
    
    revalidatePath('/appointments');
    return { data: appointment };
  } catch (error) {
    console.error('Error updating appointment:', error);
    return { error: 'Failed to update appointment' };
  }
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: { id }
    });
    
    revalidatePath('/appointments');
    return { success: true };
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return { error: 'Failed to delete appointment' };
  }
}
