export type CardReaderStatus = 'initializing' | 'ready' | 'reading' | 'error';

export interface CardData {
  type: 'credit' | 'debit' | 'healthcare';
  lastFourDigits: string;
  expiryDate?: string;
  cardholderName?: string;
}

export interface CardReaderConfig {
  timeout: number;
  retryAttempts: number;
  enableContactless: boolean;
}