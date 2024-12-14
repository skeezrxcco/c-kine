import { useState, useEffect } from 'react';
import { MedicalRecord } from '../types';
import { prisma } from '@/lib/prisma';

export function useMedicalRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setIsLoading(true);
        const data = await prisma.medicalRecord.findMany({
          include: {
            patient: true,
            notes: true
          }
        });
        setRecords(data);
      } catch (err) {
        setError('Erreur lors du chargement des dossiers médicaux');
        console.error('Error fetching medical records:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return {
    records,
    isLoading,
    error,
  };
}