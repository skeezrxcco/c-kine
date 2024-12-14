import React, { useState } from 'react';
import { TeleTransmissionStats } from './components/stats/TeleTransmissionStats';
import { FileUploader } from './components/upload/FileUploader';
import { ClaimsList } from './components/claims/ClaimsList';
import { ClaimDetails } from './components/claims/ClaimDetails';
import { useTeletransmission } from './hooks/useTeletransmission';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { TeleClaim } from '@/types/teletransmission';
import { PaymentTransaction } from '@/features/payments/types';

export function Teletransmission() {
  const {
    claims,
    stats,
    isLoading,
    error,
    handleFileUpload,
    handleClaimSelection,
    handlePaymentComplete
  } = useTeletransmission();

  const [selectedClaim, setSelectedClaim] = useState<TeleClaim | null>(null);

  const handleClaimClick = (claim: TeleClaim) => {
    setSelectedClaim(claim);
    handleClaimSelection(claim);
  };

  const handlePaymentSuccess = (claimId: string, transaction: PaymentTransaction) => {
    handlePaymentComplete(claimId, transaction);
    // Refresh the selected claim
    const updatedClaim = claims.find(c => c.id === claimId);
    if (updatedClaim) {
      setSelectedClaim(updatedClaim);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Télétransmission</h1>
      </div>

      <TeleTransmissionStats stats={stats} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <FileUploader
            onFileSelect={handleFileUpload}
            isLoading={isLoading}
          />
        </div>
        
        <div className="col-span-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <div className="space-y-6">
              {selectedClaim && (
                <ClaimDetails
                  claim={selectedClaim}
                  onPaymentComplete={handlePaymentSuccess}
                />
              )}
              <ClaimsList
                claims={claims}
                onClaimSelect={handleClaimClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}