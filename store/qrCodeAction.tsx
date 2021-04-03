import { ADD_QR_DATA } from './qrCodeTypes';

export const addQRData = (decoded_info: string, decoded_datetime: string) => ({
  type: ADD_QR_DATA,
  decoded_info: decoded_info,
  decoded_datetime: decoded_datetime,
});
