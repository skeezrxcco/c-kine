// Note: In production, use proper encryption libraries and secure key management
export async function encryptPaymentData(data: any): Promise<string> {
  // Simulate encryption
  return btoa(JSON.stringify(data));
}

export async function decryptPaymentData(encryptedData: string): Promise<any> {
  // Simulate decryption
  return JSON.parse(atob(encryptedData));
}