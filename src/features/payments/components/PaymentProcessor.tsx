import React, { useState } from 'react';
import { PaymentMethod, PaymentTransaction } from '../types';
import { CardReader } from './readers/CardReader';
import { QRScanner } from './readers/QRScanner';
import { ManualEntry } from './readers/ManualEntry';
import { PaymentStatus } from './status/PaymentStatus';
import { usePaymentProcessor } from '../hooks/usePaymentProcessor';
import { Shield, CreditCard, QrCode, Keyboard } from 'lucide-react';

interface PaymentProcessorProps {
  amount: number;
  onSuccess: (transaction: PaymentTransaction) => void;
  onError: (error: Error) => void;
}

export function PaymentProcessor({ amount, onSuccess, onError }: PaymentProcessorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const { processPayment, isProcessing, currentTransaction } = usePaymentProcessor();

  const paymentMethods = [
    {
      id: 'card_reader',
      label: 'Lecteur de carte',
      icon: <CreditCard className="w-6 h-6" />,
      component: CardReader,
    },
    {
      id: 'qr_code',
      label: 'Scanner QR Code',
      icon: <QrCode className="w-6 h-6" />,
      component: QRScanner,
    },
    {
      id: 'manual',
      label: 'Saisie manuelle',
      icon: <Keyboard className="w-6 h-6" />,
      component: ManualEntry,
    },
  ];

  const handlePaymentSubmit = async (paymentData: any) => {
    try {
      const result = await processPayment({
        method: selectedMethod!,
        amount,
        data: paymentData,
      });

      if (result.success) {
        onSuccess(result.transaction);
      } else {
        onError(new Error(result.error?.message));
      }
    } catch (error) {
      onError(error as Error);
    }
  };

  const PaymentComponent = selectedMethod
    ? paymentMethods.find(m => m.id === selectedMethod)?.component
    : null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Paiement</h3>
        <div className="flex items-center text-green-600">
          <Shield className="w-5 h-5 mr-2" />
          <span className="text-sm">Paiement sécurisé</span>
        </div>
      </div>

      {!selectedMethod ? (
        <div className="grid grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id as PaymentMethod)}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                {method.icon}
                <span className="text-sm font-medium">{method.label}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">
              {paymentMethods.find(m => m.id === selectedMethod)?.label}
            </h4>
            <button
              onClick={() => setSelectedMethod(null)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Changer de méthode
            </button>
          </div>

          {PaymentComponent && (
            <PaymentComponent
              amount={amount}
              onSubmit={handlePaymentSubmit}
              isProcessing={isProcessing}
            />
          )}

          {currentTransaction && (
            <PaymentStatus transaction={currentTransaction} />
          )}
        </div>
      )}
    </div>
  );
}