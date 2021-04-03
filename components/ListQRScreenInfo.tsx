import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Moment from 'moment';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { QRState } from '../types';

export default function ListQRScreenInfo() {
  const QRData = useSelector((state: QRState) => state.QRData);

  return (
    <View style={styles.container}>
      {QRData.length === 0 && <MonoText style={styles.noData}>No data saved</MonoText>}
      {QRData.length > 0 && (
        <FlatList
          data={QRData}
          keyExtractor={(item, index) => `key_${index}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.itemTouchable} onPress={() => alert('Yes')}>
              {index != 0 && <View style={styles.separator} lightColor='rgba(0,0,0,0.3)' darkColor='rgba(255,255,255,0.3)' />}

              <View style={styles.itemInformation}>
                <View></View>
                <View>
                  <Text style={styles.itemType}>Contact</Text>
                  <MonoText>{item.decoded_info}</MonoText>
                  <Text>{`Saved at ${Moment(item.decoded_datetime).format('DD MMM YYYY - H:mm:ss')}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync('https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet');
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  noData: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 30
  },
  itemTouchable: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  itemInformation: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',

    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    minWidth: '100%',
  },
  itemType: {
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
});
