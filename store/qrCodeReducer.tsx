import { AnyAction, Reducer } from 'redux';
import { ADD_QR_DATA } from './qrCodeTypes';

const initialState = {
  QRData: [{ decodedInfo: 'Hello World', decodedDatetime: new Date() }],
};

const qrCodeReducer: Reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_QR_DATA:
      return {
        ...state,
        QRData: [
          ...state.QRData,
          {
            decodedInfo: action.decodedInfo,
            decodedDatetime: action.decodedDatetime,
          },
        ],
      };

    default:
      return state;
  }
};

export default qrCodeReducer;
