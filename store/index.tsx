import { createStore } from 'redux';
import qrCodeReducer from './qrCodeReducer';

const store = createStore(qrCodeReducer);

export default store;
