import { qrType } from '../types';

function isURL(str: string): boolean {
  const pattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i');
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

export const checkQRType = (decoded_data: string): qrType => {
  if (isURL(decoded_data)) {
    return { dataType: 'URL', icon: 'web' };
  } else if (isContactCard(decoded_data)) {
    return { dataType: 'Contact', icon: 'contacts' };
  } else if (isEmail(decoded_data)) {
    return { dataType: 'Email', icon: 'email' };
  } else if (isSms(decoded_data)) {
    return { dataType: 'SMS', icon: 'cellphone-text' };
  } else if (isWifi(decoded_data)) {
    return { dataType: 'WiFi', icon: 'wifi' };
  } else if (isCalendar(decoded_data)) {
    return { dataType: 'Calendar', icon: 'calendar' };
  } else if (isGeo(decoded_data)) {
    return { dataType: 'GPS coordinates', icon: 'map-marker' };
  }

  return { dataType: 'Text', icon: 'qrcode' };
};
