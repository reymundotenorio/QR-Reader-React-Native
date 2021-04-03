import { ADD_QR_DATA } from './qrCodeTypes';
import { QRCodeAction } from '../types';

const initialState = {
  QRData: [
    { decoded_info: 'HTML I', decoded_type: '256bits' },
    { decoded_info: 'CSS', decoded_type: '256bits' },
    { decoded_info: 'Responsive design', decoded_type: '256bits' },
  ],
};

const qrCodeReducer = (state = initialState, action: QRCodeAction) => {
  switch (action.type) {
    case ADD_QR_DATA:
      return {
        ...state,
        QRData: [
          ...state.QRData,
          {
            decoded_info: action.decoded_info,
            decoded_type: action.decoded_type,
          },
        ],
      };

    default:
      return state;
  }
};

export default qrCodeReducer;
