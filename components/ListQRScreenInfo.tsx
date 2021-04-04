import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView, Clipboard, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Moment from 'moment';
// import Clipboard from '@react-native-community/clipboard';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { QRState, QRData } from '../types';

export default function ListQRScreenInfo() {
  const QRData = useSelector((state: QRState) => state.QRData);
  const [dataFiltered, setdataFiltered] = useState<Array<QRData>>(QRData);

  useEffect(() => {
    setdataFiltered(QRData);
  }, [QRData]);

  const copyQRData = (text: string) => {
    Clipboard.setString(text);

    Alert.alert(
      '',
      'The QR code decoded has been copied to the clipboard',
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      { cancelable: true }
    );
  };

  const searchData = (e: String) => {
    const searchText = e.trim().toLowerCase();

    let dataSearch = dataFiltered.filter((item) => {
      return item.decoded_info.trim().toLowerCase().match(searchText);
    });

    if (!searchText || searchText === '') {
      setdataFiltered(QRData);
    } else if (Array.isArray(dataSearch)) {
      setdataFiltered(dataSearch);
    }
  };

  return (
    <View style={styles.container}>
      {QRData.length === 0 && <MonoText style={styles.noData}>No QR Data has been saved</MonoText>}
      {QRData.length > 0 && (
        <View>
          <SafeAreaView>
            <TextInput style={styles.inputSearch} onChangeText={searchData} placeholder='Search QR Data' keyboardType='default' />
            <View style={styles.inputSeparator} lightColor='rgba(0,0,0,0.3)' darkColor='rgba(255,255,255,0.3)' />
          </SafeAreaView>
          <FlatList
            data={dataFiltered.reverse()}
            keyExtractor={(item, index) => `key_${index}`}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.itemTouchable} onPress={() => copyQRData(item.decoded_info)}>
                {index != 0 && <View style={styles.separator} lightColor='rgba(0,0,0,0.3)' darkColor='rgba(255,255,255,0.3)' />}

                <View style={styles.itemInformation}>
                  <View></View>
                  <View style={styles.itemQRInfo}>
                    <Text style={styles.itemType}>Contact</Text>
                    <MonoText>{item.decoded_info}</MonoText>
                    <Text style={styles.itemDateTime}>{`Saved at ${Moment(new Date(item.decoded_datetime)).format('DD MMM YYYY - H:mm:ss')}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  inputSearch: {
    height: 45,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  inputSeparator: {
    height: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  noData: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 30,
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
  itemQRInfo: {
    flex: 1,
    width: '100%',
  },
  itemType: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 8,
  },
  itemDateTime: {
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: 12,
    paddingTop: 8,
  },
  separator: {
    height: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
});
