import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import QRCode from 'qrcode.react';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [qrValue, setQrValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Simulate getting QR code from server
    const generateQR = () => {
      const randomValue = Math.random().toString(36).substring(7);
      setQrValue(`whatsapp-web-${randomValue}`);
      setIsLoading(false);
    };

    generateQR();

    // Refresh QR code every minute
    const interval = setInterval(generateQR, 60000);

    return () => clearInterval(interval);
  }, []);

  // Simulate QR code scanning
  useEffect(() => {
    if (!qrValue) return;

    const checkLogin = setInterval(() => {
      // Simulate successful scan after random time
      if (Math.random() > 0.95) {
        clearInterval(checkLogin);
        localStorage.setItem('authToken', 'dummy-token');
        onLogin();
      }
    }, 2000);

    return () => clearInterval(checkLogin);
  }, [qrValue, onLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-whatsapp-dark-secondary p-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-whatsapp-dark-sidebar-bg p-6 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-whatsapp rounded-full flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            WhatsApp Web
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            To use WhatsApp on your computer:
          </p>
          <ol className="mt-4 text-sm text-left text-gray-600 dark:text-gray-400 space-y-2">
            <li>1. Open WhatsApp on your phone</li>
            <li>2. Tap Menu or Settings and select WhatsApp Web</li>
            <li>3. Point your phone to this screen to capture the QR code</li>
          </ol>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-whatsapp-dark-secondary rounded-lg">
          {isLoading ? (
            <div className="animate-pulse w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ) : (
            <div className="p-4 bg-white rounded-lg">
              <QRCode
                value={qrValue}
                size={192}
                level="H"
                includeMargin={true}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={toggleTheme}
            className="text-sm text-whatsapp hover:text-whatsapp-dark focus:outline-none"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;