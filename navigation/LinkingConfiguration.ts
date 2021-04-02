import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          ReadQR: {
            screens: {
              ReadQRScreen: 'read-qr',
            },
          },
          ListQR: {
            screens: {
              ListQRScreen: 'list-qr',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
