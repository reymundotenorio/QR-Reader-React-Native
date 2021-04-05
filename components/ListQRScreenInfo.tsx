/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  Clipboard,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { checkQRType } from '../qr-type';

import { QRState, QRDataType } from '../types';

export default function ListQRScreenInfo(): JSX.Element {
  const QRData = useSelector((state: QRState) => state.QRData);
  const [dataFiltered, setdataFiltered] = useState<Array<QRDataType>>(QRData);

  useEffect(() => {
    setdataFiltered(QRData);
  }, [QRData]);

  const colorScheme = useColorScheme();
  const { tabActiveColor, inputPlaceholderColor } = Colors[colorScheme];

  const copyQRData = (text: string) => {
    Clipboard.setString(text);

    Alert.alert(
      '',
      'The QR code decoded has been copied to the clipboard',
      [
        {
          text: 'OK',
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onPress: () => {},
        },
      ],
      { cancelable: true },
    );
  };

  const searchData = (e: string) => {
    const searchText = e.trim().toLowerCase();

    const dataSearch = dataFiltered.filter(item => {
      return item.decodedInfo.toLowerCase().match(searchText);
    });

    if (!searchText || searchText === '') {
      setdataFiltered(QRData);
    } else if (Array.isArray(dataSearch)) {
      setdataFiltered(dataSearch);
    }
  };

  return (
    <View style={styles(Colors[colorScheme]).container}>
      {QRData.length === 0 && (
        <MonoText style={styles(Colors[colorScheme]).noData}>
          No QR Data has been saved
        </MonoText>
      )}
      {QRData.length > 0 && (
        <View>
          <SafeAreaView style={styles(Colors[colorScheme]).inputSafeArea}>
            <TextInput
              style={styles(Colors[colorScheme]).inputSearch}
              placeholderTextColor={inputPlaceholderColor}
              onChangeText={searchData}
              placeholder="Search QR Data"
              keyboardType="default"
            />
            <SearchIcon name="search" color={tabActiveColor} />
          </SafeAreaView>

          <FlatList
            data={dataFiltered.sort(
              (a, b) =>
                new Date(b.decodedDatetime).getTime() -
                new Date(a.decodedDatetime).getTime(),
            )}
            keyExtractor={(item, index) => `key_${index}`}
            renderItem={({ item, index }) => (
              <View>
                {index !== 0 && (
                  <View
                    style={styles(Colors[colorScheme]).separator}
                    lightColor="rgba(0,0,0,0.3)"
                    darkColor="rgba(255,255,255,0.3)"
                  />
                )}

                <TouchableOpacity
                  style={styles(Colors[colorScheme]).itemTouchable}
                  onPress={() => copyQRData(item.decodedInfo)}
                >
                  <View style={styles(Colors[colorScheme]).itemInformation}>
                    <QRIcon
                      name={checkQRType(item.decodedInfo).icon}
                      color={tabActiveColor}
                    />

                    <View style={styles(Colors[colorScheme]).itemQRInfo}>
                      <Text style={styles(Colors[colorScheme]).itemType}>
                        {checkQRType(item.decodedInfo).dataType}
                      </Text>
                      <Text>{item.decodedInfo}</Text>
                      <Text
                        style={styles(Colors[colorScheme]).itemDateTime}
                      >{`Saved at ${Moment(
                        new Date(item.decodedDatetime),
                      ).format('DD MMM YYYY - H:mm:ss')}`}</Text>
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

function QRIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  const colorScheme = useColorScheme();

  return (
    <MaterialCommunityIcons
      size={35}
      style={styles(Colors[colorScheme]).itemQRIcon}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

function SearchIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  const colorScheme = useColorScheme();

  return (
    <MaterialIcons
      size={35}
      style={styles(Colors[colorScheme]).inputSearchIcon}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

const styles = colorScheme =>
  StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'flex-start',
      // justifyContent: 'flex-start',
      // backgroundColor: 'transparent',
      height: '100%',
    },
    inputSearch: {
      height: 45,
      backgroundColor: colorScheme.inputBackground,
      color: colorScheme.inputText,
      fontSize: 16,
      fontFamily: 'poppins-regular',

      paddingTop: 5,
      paddingBottom: 0,
      paddingLeft: 20,
      paddingRight: 55,
      borderRadius: 100,
    },
    inputSafeArea: {
      position: 'relative',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 30,
      marginBottom: 50,
    },
    inputSearchIcon: {
      position: 'absolute',
      right: 15,
      top: 5,
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
