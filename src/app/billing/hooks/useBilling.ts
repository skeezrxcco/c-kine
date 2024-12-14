import { useState, useEffect } from 'react';
import { Bill } from '../types';
import { prisma } from '@/lib/prisma';

export function useBilling() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setIsLoading(true);
        const data = await prisma.bill.findMany({
          include: {
            patient: true,
            session: true
          }
        });
        setBills(data);
      } catch (err) {
        setError('Erreur lors du chargement des factures');
        console.error('Error fetching bills:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBills();
  }, []);

  return {
    bills,
    isLoading,
    error,
  };
}