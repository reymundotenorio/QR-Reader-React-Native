import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView, Clipboard, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { checkQRType } from '../qr-type';

import { QRState, QRData } from '../types';

export default function ListQRScreenInfo() {
  const QRData = useSelector((state: QRState) => state.QRData);
  const [dataFiltered, setdataFiltered] = useState<Array<QRData>>(QRData);

  useEffect(() => {
    setdataFiltered(QRData);
  }, [QRData]);

  const colorScheme = useColorScheme();
  const tabActiveColor = Colors[colorScheme].tabActiveColor;

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
      return item.decoded_info.toLowerCase().match(searchText);
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
            data={dataFiltered.sort((a, b) => new Date(b.decoded_datetime).getTime() - new Date(a.decoded_datetime).getTime())}
            keyExtractor={(item, index) => `key_${index}`}
            renderItem={({ item, index }) => (
              <View>
                {index != 0 && <View style={styles.separator} lightColor='rgba(0,0,0,0.3)' darkColor='rgba(255,255,255,0.3)' />}

                <TouchableOpacity style={styles.itemTouchable} onPress={() => copyQRData(item.decoded_info)}>
                  <View style={styles.itemInformation}>
                    <QRIcon name={checkQRType(item.decoded_info).icon} color={tabActiveColor} />

                    <View style={styles.itemQRInfo}>
                      <Text style={styles.itemType}>{checkQRType(item.decoded_info).dataType}</Text>
                      <Text>{item.decoded_info}</Text>
                      <Text style={styles.itemDateTime}>{`Saved at ${Moment(new Date(item.decoded_datetime)).format('DD MMM YYYY - H:mm:ss')}`}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

function QRIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  return <MaterialCommunityIcons size={35} style={styles.itemQRIcon} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // backgroundColor: 'transparent',
    height: '100%',
  },
  inputSearch: {
    height: 45,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  inputSeparator: {
    height: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    marginTop: 0,
    marginBottom: 10,
    // backgroundColor: 'transparent',
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
    flexDirection: 'row',
    flexWrap: 'nowrap',

    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    minWidth: '100%',
  },
  itemQRIcon: {
    paddingRight: 15,
    paddingBottom: 20,
    marginBottom: 0,
  },
  itemQRInfo: {
    flex: 1,
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
    width: '92%',
  },
});
