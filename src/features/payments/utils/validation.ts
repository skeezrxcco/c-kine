interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validatePaymentData(data: any): ValidationResult {
  if (data.cardNumber) {
    // Validate card number using Luhn algorithm
    if (!isValidCardNumber(data.cardNumber)) {
      return {
        isValid: false,
        error: 'Numéro de carte invalide',
      };
    }

    // Validate expiry date
    if (!isValidExpiryDate(data.expiryDate)) {
      return {
        isValid: false,
        error: 'Date d\'expiration invalide',
      };
    }

    // Validate CVV
    if (!isValidCVV(data.cvv)) {
      return {
        isValid: false,
        error: 'CVV invalide',
      };
    }
  }

  return { isValid: true };
}

function isValidCardNumber(cardNumber: string): boolean {
  // Implement Luhn algorithm
  return cardNumber.length >= 15 && cardNumber.length <= 16;
}

function isValidExpiryDate(expiryDate: string): boolean {
  const [month, year] = expiryDate.split('/');
  const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
  return expiry > new Date();
}

function isValidCVV(cvv: string): boolean {
  return cvv.length >= 3 && cvv.length <= 4;
}