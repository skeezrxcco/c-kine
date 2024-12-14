export function validateCardNumber(cardNumber: string): boolean {
  // Implement Luhn algorithm
  if (!cardNumber) return false;
  
  // Remove spaces and non-numeric characters
  const sanitizedNumber = cardNumber.replace(/\D/g, '');
  
  if (sanitizedNumber.length < 15 || sanitizedNumber.length > 16) {
    return false;
  }

  // Luhn algorithm implementation
  let sum = 0;
  let isEven = false;

  for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedNumber[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

export function validateExpiryDate(month: string, year: string): boolean {
  const currentDate = new Date();
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  return expiryDate > currentDate;
}

export function validateCVV(cvv: string): boolean {
  const cvvNumber = cvv.replace(/\D/g, '');
  return cvvNumber.length >= 3 && cvvNumber.length <= 4;
}

export function formatCardNumber(cardNumber: string): string {
  const sanitized = cardNumber.replace(/\D/g, '');
  const groups = sanitized.match(/.{1,4}/g) || [];
  return groups.join(' ');
}

export function formatExpiryDate(input: string): string {
  const sanitized = input.replace(/\D/g, '');
  if (sanitized.length >= 2) {
    return `${sanitized.slice(0, 2)}/${sanitized.slice(2, 4)}`;
  }
  return sanitized;
}