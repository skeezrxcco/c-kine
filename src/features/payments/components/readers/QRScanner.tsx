import React, { useState, useRef } from 'react';
import { Camera, XCircle } from 'lucide-react';

interface QRScannerProps {
  amount: number;
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

export function QRScanner({ amount, onSubmit, isProcessing }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Impossible d\'accéder à la caméra');
    }
  };

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        {isScanning ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={stopScanning}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm"
            >
              <XCircle className="w-6 h-6 text-gray-600" />
            </button>
          </>
        ) : (
          <div
            className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer"
            onClick={startScanning}
          >
            <Camera className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Cliquez pour scanner un QR code</p>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        <p>Montant à payer: {amount.toFixed(2)} €</p>
      </div>
    </div>
  );
}