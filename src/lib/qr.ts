import QRCode from 'qrcode';

export const generateEmergencyQRDataUrl = async (token: string): Promise<string> => {
  const publicUrl = `${window.location.origin}/emergency/${token}`;
  try {
    const dataUrl = await QRCode.toDataURL(publicUrl, {
      width: 360,
      margin: 2,
      color: {
        dark: '#0f766e', // Teal color for QR code pattern
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    });
    return dataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
};

export const getPublicEmergencyUrl = (token: string): string => {
  return `${window.location.origin}/emergency/${token}`;
};
