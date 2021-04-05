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

import { checkQRType } from '../qr-types';

import { QRState, QRDataType, ColorScheme } from '../types';

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

  if (QRData.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MonoText
          style={styles(Colors[colorScheme]).noData}
          lightColor="#000000"
          darkColor="#FFFFFF"
        >
          No QR data has been saved
        </MonoText>
      </View>
    );
  }

  return (
    <View style={styles(Colors[colorScheme]).container}>
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

          {dataFiltered.length === 0 && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MonoText
                style={styles(Colors[colorScheme]).noDataFound}
                lightColor="#000000"
                darkColor="#FFFFFF"
              >
                No QR data found with the search criteria
              </MonoText>
            </View>
          )}

          <FlatList
            style={styles(Colors[colorScheme]).list}
            data={dataFiltered.sort(
              (a, b) =>
                new Date(b.decodedDatetime).getTime() -
                new Date(a.decodedDatetime).getTime(),
            )}
            keyExtractor={(item, index) => `key_${index}`}
            renderItem={({ item, index }) => (
              <View>
                <TouchableOpacity
                  style={styles(Colors[colorScheme]).itemTouchable}
                  activeOpacity={0.7}
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
                      <Text style={styles(Colors[colorScheme]).itemData}>
                        {item.decodedInfo}
                      </Text>
                      <Text
                        style={styles(Colors[colorScheme]).itemDateTime}
                      >{`${Moment(new Date(item.decodedDatetime)).format(
                        'DD MMM YYYY - H:mm',
                      )}`}</Text>
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

const styles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
      marginBottom: 30,
    },
    inputSearchIcon: {
      position: 'absolute',
      right: 15,
      top: 5,
    },
    noDataFound: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 88,
      marginLeft: 15,
      marginRight: 15,
      padding: 15,
      borderRadius: 15,
      backgroundColor: colorScheme.itemTouchableBackground,
    },
    noData: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 15,
      marginRight: 15,
      padding: 15,
      borderRadius: 15,
      backgroundColor: colorScheme.itemTouchableBackground,
    },
    list: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    itemTouchable: {
      backgroundColor: colorScheme.itemTouchableBackground,
      width: '100%',
      borderRadius: 15,
      padding: 5,
      marginBottom: 15,
    },
    itemInformation: {
      backgroundColor: 'transparent',
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'nowrap',

      paddingTop: 10,
      paddingBottom: 2,
      paddingLeft: 15,
      paddingRight: 15,
      minWidth: '100%',
    },
    itemQRIcon: {
      padding: 5,
      marginTop: 5,
      marginRight: 15,
      backgroundColor: colorScheme.background,
      borderRadius: 7,
    },
    itemQRInfo: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    itemType: {
      fontSize: 16,
      fontFamily: 'poppins-semibold',
      color: colorScheme.itemTypeColor,
      paddingBottom: 2,
    },
    itemData: {
      color: colorScheme.itemDataColor,
      fontFamily: 'poppins-regular',
    },
    itemDateTime: {
      color: colorScheme.itemDataColor,
      textAlign: 'right',
      fontSize: 10,
      fontFamily: 'poppins-regular',
      paddingTop: 5,
    },
  });
