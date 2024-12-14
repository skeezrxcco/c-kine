import { useState } from 'react';
import { PaymentTransaction, PaymentResult } from '../types';
import { encryptPaymentData } from '../utils/encryption';
import { validatePaymentData } from '../utils/validation';
import { prisma } from '@/lib/prisma';

interface ProcessPaymentParams {
  method: string;
  amount: number;
  data: any;
  patientId: string;
  billId: string;
}

export function usePaymentProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<PaymentTransaction | null>(null);

  const processPayment = async ({ method, amount, data, patientId, billId }: ProcessPaymentParams): Promise<PaymentResult> => {
    try {
      setIsProcessing(true);

      // Validate payment data
      const validationResult = validatePaymentData(data);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error);
      }

      // Encrypt sensitive data
      const encryptedData = await encryptPaymentData(data);

      // Create transaction in database
      const transaction = await prisma.payment.create({
        data: {
          amount,
          currency: 'EUR',
          method,
          status: 'PROCESSING',
          patientId,
          billId,
          encryptedData: encryptedData,
        },
      });

      setCurrentTransaction(transaction);

      // Process payment with payment provider
      // ... payment processing logic ...

      // Update transaction status in database
      const updatedTransaction = await prisma.payment.update({
        where: { id: transaction.id },
        data: {
          status: 'COMPLETED',
          reference: `PAY-${Math.random().toString(36).substr(2, 9)}`,
        },
      });

      // Update bill status
      await prisma.bill.update({
        where: { id: billId },
        data: { status: 'PAID' },
      });

      setCurrentTransaction(updatedTransaction);
      setIsProcessing(false);

      return {
        success: true,
        transactionId: updatedTransaction.id,
        reference: updatedTransaction.reference!,
      };

    } catch (error) {
      if (currentTransaction) {
        // Update transaction status to failed in database
        await prisma.payment.update({
          where: { id: currentTransaction.id },
          data: { status: 'FAILED' },
        });
      }

      setIsProcessing(false);
      throw error;
    }
  };

  return {
    processPayment,
    isProcessing,
    currentTransaction,
  };
}