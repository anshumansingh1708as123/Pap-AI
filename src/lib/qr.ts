import QRCode from 'qrcode';

export type QRTargetType = 'web_passport' | 'direct_phone' | 'vcard_contact';

export const generateEmergencyQRDataUrl = async (
  token: string,
  targetType: QRTargetType = 'web_passport',
  contactPhone?: string,
  contactName?: string,
  fullName?: string
): Promise<string> => {
  let content = `${window.location.origin}/emergency/${token}`;

  const cleanPhone = (contactPhone || '+919876500000').replace(/\s+/g, '');

  if (targetType === 'direct_phone') {
    content = `tel:${cleanPhone}`;
  } else if (targetType === 'vcard_contact') {
    content = `BEGIN:VCARD
VERSION:3.0
N:${contactName || 'Emergency Contact'};;;
FN:ICE - ${contactName || 'Emergency Contact'} (${fullName || 'Rahul'})
TEL;TYPE=CELL,VOICE:${cleanPhone}
NOTE:Emergency contact for HEALINK Passport holder ${fullName || 'Rahul Sharma'}
END:VCARD`;
  }

  try {
    const dataUrl = await QRCode.toDataURL(content, {
      width: 360,
      margin: 2,
      color: {
        dark: targetType === 'direct_phone' ? '#e11d48' : '#0f766e',
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
