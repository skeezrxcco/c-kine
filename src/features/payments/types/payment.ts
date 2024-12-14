export type PaymentMethod = 'card_reader' | 'qr_code' | 'manual';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  timestamp: string;
  reference?: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  transaction?: PaymentTransaction;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaymentConfig {
  environment: 'test' | 'production';
  merchantId: string;
  terminalId: string;
  timeout: number;
  retryAttempts: number;
}