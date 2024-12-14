import React, { useState, useEffect } from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';
import { useCardReader } from '../../hooks/useCardReader';

interface CardReaderProps {
  amount: number;
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

export function CardReader({ amount, onSubmit, isProcessing }: CardReaderProps) {
  const { initializeReader, readCard, status, error } = useCardReader();
  const [isReaderReady, setIsReaderReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeReader();
        setIsReaderReady(true);
      } catch (err) {
        console.error('Failed to initialize card reader:', err);
      }
    };

    init();
  }, []);

  const handleReadCard = async () => {
    try {
      const cardData = await readCard();
      onSubmit(cardData);
    } catch (err) {
      console.error('Card read error:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-6 border-2 border-dashed rounded-lg text-center">
        {!isReaderReady ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            <p className="text-sm text-gray-600">Initialisation du lecteur...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center space-y-2 text-red-600">
            <AlertCircle className="w-8 h-8" />
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <CreditCard className="w-12 h-12 text-gray-400" />
            <div>
              <p className="font-medium">Présentez votre carte</p>
              <p className="text-sm text-gray-500 mt-1">
                Insérez, glissez ou posez votre carte sur le lecteur
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Montant à payer: {amount.toFixed(2)} €</p>
        <p className="mt-1">Status: {status}</p>
      </div>
    </div>
  );
}