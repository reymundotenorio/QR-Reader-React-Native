import { ADD_QR_DATA } from './qrCodeTypes';
import { QRCodeAction } from '../types';

const initialState = {
  QRData: [],
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
