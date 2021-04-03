import { ADD_QR_DATA } from './qrCodeTypes';

export const add_qr_data = (decoded_info: string, decoded_type: string) => ({
  type: ADD_QR_DATA,
  decoded_info: decoded_info,
  decoded_type: decoded_type,
});
