'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import { Appointment } from '@/types';

export async function getAppointments(date: Date) {
  try {
    const currentDate = new Date(date);
    
    // Calculate start of the week (Monday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7);
    startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day

    // Calculate end of the week (Sunday)
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (7 - (currentDate.getDay() + 6) % 7 - 1));
    endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day

    console.log('Start of Week:', startOfWeek.toLocaleString());
    console.log('End of Week:', endOfWeek.toLocaleString());

    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        kine: true
      },
      where: {
        datetime: {
          gte: startOfWeek,
          lte: endOfWeek
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

export async function createAppointment(
  data: Omit<Prisma.AppointmentUncheckedCreateInput, 'createdAt' | 'updatedAt'>
) {
  try {
    console.log(data);
    const appointment = await prisma.appointment.create({
      data,
    });
    
    revalidatePath('/appointments');
    return { data: appointment };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return { error: 'Failed to create appointment' };
  }
}

export async function updateAppointment(id: string, data: Appointment) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {kine, patient, ...rest} = data;
    const appointment = await prisma.appointment.update({
      where: { id },
      data: rest
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
