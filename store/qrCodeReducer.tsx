import { ADD_QR_DATA } from './qrCodeTypes';
import { QRCodeAction } from '../types';

const initialState = {
  QRData: [
    { decoded_info: 'HTML I', decoded_datetime: `${new Date()}` },
    { decoded_info: 'CSS', decoded_datetime: `${new Date()}` },
    { decoded_info: 'Responsive design', decoded_datetime: `${new Date()}` },
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
            decoded_datetime: action.decoded_datetime,
          },
        ],
      };

    default:
      return state;
  }
};

export default qrCodeReducer;
