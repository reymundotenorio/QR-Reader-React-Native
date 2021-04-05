import { QRType } from '../types';

function isURL(str: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return pattern.test(str);
}

function isContactCard(str: string): boolean {
  return str.startsWith('BEGIN:VCARD') || str.startsWith('MECARD:N:');
}

function isEmail(str: string) {
  return str.startsWith('MAILTO:') || str.startsWith('MATMSG:');
}

function isSms(str: string) {
  return str.startsWith('SMSTO:');
}

function isWifi(str: string) {
  return str.startsWith('WIFI:T:');
}

function isCalendar(str: string) {
  return str.startsWith('BEGIN:VCALENDAR');
}

function isGeo(str: string) {
  return str.startsWith('geo:');
}

// eslint-disable-next-line import/prefer-default-export
export const checkQRType = (decodedData: string): QRType => {
  if (isURL(decodedData)) {
    return { dataType: 'URL', icon: 'web' };
  }
  if (isContactCard(decodedData)) {
    return { dataType: 'Contact', icon: 'contacts' };
  }
  if (isEmail(decodedData)) {
    return { dataType: 'Email', icon: 'email' };
  }
  if (isSms(decodedData)) {
    return { dataType: 'SMS', icon: 'cellphone-text' };
  }
  if (isWifi(decodedData)) {
    return { dataType: 'WiFi', icon: 'wifi' };
  }
  if (isCalendar(decodedData)) {
    return { dataType: 'Calendar', icon: 'calendar' };
  }
  if (isGeo(decodedData)) {
    return { dataType: 'GPS coordinates', icon: 'map-marker' };
  }

  return { dataType: 'Text', icon: 'qrcode' };
};
