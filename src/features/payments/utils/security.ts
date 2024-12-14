import { PaymentConfig } from '../types';

const ENCRYPTION_KEY = 'your-encryption-key';

export async function encryptPaymentData(data: any): Promise<string> {
  // In production, use proper encryption
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(JSON.stringify(data));
  
  // Simulate encryption
  return btoa(String.fromCharCode(...new Uint8Array(dataBuffer)));
}

export function generateTransactionId(): string {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function validatePaymentConfig(config: PaymentConfig): boolean {
  return !!(
    config.merchantId &&
    config.terminalId &&
    config.environment &&
    config.timeout > 0 &&
    config.retryAttempts > 0
  );
}

export function sanitizePaymentData(data: any): any {
  // Remove sensitive data before logging
  const { cvv, cardNumber, ...sanitized } = data;
  return {
    ...sanitized,
    cardNumber: cardNumber ? `****${cardNumber.slice(-4)}` : undefined
  };
}