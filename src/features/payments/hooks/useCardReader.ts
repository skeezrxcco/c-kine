import { useState, useCallback } from 'react';
import { CardReaderStatus } from '../types';

export function useCardReader() {
  const [status, setStatus] = useState<CardReaderStatus>('initializing');
  const [error, setError] = useState<string | null>(null);

  const initializeReader = useCallback(async () => {
    try {
      setStatus('initializing');
      // Simulate reader initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('ready');
      return true;
    } catch (err) {
      setError('Failed to initialize card reader');
      setStatus('error');
      return false;
    }
  }, []);

  const readCard = useCallback(async () => {
    try {
      setStatus('reading');
      // Simulate card reading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const cardData = {
        type: 'credit',
        lastFourDigits: '4242',
        expiryDate: '12/25',
        cardholderName: 'JOHN DOE'
      };

      setStatus('ready');
      return cardData;
    } catch (err) {
      setError('Failed to read card');
      setStatus('error');
      throw err;
    }
  }, []);

  return {
    status,
    error,
    initializeReader,
    readCard
  };
}