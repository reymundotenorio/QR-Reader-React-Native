import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Path, Svg, SvgProps } from 'react-native-svg';
import Constants from 'expo-constants';

import { useDispatch } from 'react-redux';
import { addQRData } from '../store/qrCodeAction';

import { View } from './Themed';
import { MonoText } from './StyledText';

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

import { NavigationProps, handleBarCodeScannedProps } from '../types';

export default function ReadQRScreenInfo({ navigation }: NavigationProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    } catch (errr) {
      console.error('Error getting Camera persission');
    }
  }, []);

  const handleBarCodeScanned = ({ type, data }: handleBarCodeScannedProps) => {
    setScanned(true);
    QRDetected(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const saveQRData = (data: string) => {
    dispatch(addQRData(data, `${new Date()}`));
  };

  const QRDetected = (data: string) => {
    Alert.alert(
      'QR Code detected',
      `${data}`,
      [
        {
          text: 'Read again',
          onPress: () => setScanned(false),
          style: 'cancel',
        },
        {
          text: 'Save information',
          onPress: () => {
            saveQRData(data);
            // Save in Redux and redirect to list

            navigation.navigate('ListQR');

            setTimeout(() => {
              setScanned(false);
            }, 1000);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (hasPermission === null) {
    return (
      <MonoText style={styles.permissions} lightColor='rgba(0,0,0,0.8)' darkColor='rgba(255,255,255,0.8)'>
        Requesting for camera permission
      </MonoText>
    );
  }

  if (hasPermission === false) {
    return (
      <MonoText style={styles.permissions} lightColor='rgba(0,0,0,0.8)' darkColor='rgba(255,255,255,0.8)'>
        No access to camera
      </MonoText>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {hasPermission && (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} style={[StyleSheet.absoluteFillObject, styles.container]}>
          <MonoText style={styles.title}>Scan your QR code</MonoText>
          <QRFocusIcon style={styles.qrFocusIcon} />
        </BarCodeScanner>
      )}
    </View>
  );
}

function QRFocusIcon(props: SvgProps) {
  return (
    <Svg width={258} height={258} viewBox='0 0 258 258' fill='none' {...props}>
      <Path
        d='M211 250a4 4 0 000 8v-8zm47-39a4 4 0 00-8 0h8zm-11.5 34l-2.948-2.703L246.5 245zM211 258c6.82 0 14.15-.191 20.795-1.495 6.629-1.3 13.067-3.799 17.653-8.802l-5.896-5.406c-2.944 3.21-7.457 5.212-13.297 6.358C224.433 249.798 217.777 250 211 250v8zm38.448-10.297c4.209-4.59 6.258-10.961 7.322-17.287 1.076-6.395 1.23-13.307 1.23-19.416h-8c0 6.056-.162 12.398-1.119 18.089-.969 5.759-2.669 10.306-5.329 13.208l5.896 5.406zM250 47a4 4 0 008 0h-8zM211 0a4 4 0 000 8V0zm34 11.5l-2.703 2.948L245 11.5zM258 47c0-6.82-.191-14.15-1.495-20.795-1.3-6.629-3.799-13.067-8.802-17.653l-5.406 5.896c3.21 2.944 5.212 7.457 6.358 13.297C249.798 33.568 250 40.223 250 47h8zM247.703 8.552c-4.59-4.209-10.961-6.258-17.287-7.322C224.021.154 217.109 0 211 0v8c6.056 0 12.398.162 18.089 1.119 5.759.969 10.306 2.67 13.208 5.33l5.406-5.897zM8 211a4 4 0 00-8 0h8zm39 47a4 4 0 000-8v8zm-34-11.5l2.703-2.948L13 246.5zM0 211c0 6.82.19 14.15 1.495 20.795 1.3 6.629 3.799 13.067 8.802 17.653l5.406-5.896c-3.21-2.944-5.212-7.457-6.358-13.297C8.202 224.433 8 217.777 8 211H0zm10.297 38.448c4.59 4.209 10.961 6.258 17.287 7.322C33.98 257.846 40.892 258 47 258v-8c-6.056 0-12.398-.162-18.088-1.119-5.76-.969-10.307-2.669-13.209-5.329l-5.406 5.896zM47 8a4 4 0 000-8v8zM0 47a4 4 0 008 0H0zm11.5-34l2.948 2.703L11.5 13zM47 0c-6.82 0-14.15.19-20.795 1.495-6.629 1.3-13.067 3.799-17.653 8.802l5.896 5.406c2.944-3.21 7.457-5.212 13.297-6.358C33.568 8.202 40.223 8 47 8V0zM8.552 10.297c-4.209 4.59-6.258 10.961-7.322 17.287C.154 33.98 0 40.892 0 47h8c0-6.056.162-12.398 1.119-18.088.969-5.76 2.67-10.307 5.33-13.209l-5.897-5.406z'
        fill='#FFFFFF'
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
    padding: 0,
    borderWidth: 0,
    minWidth: '100%',
  },
  title: {
    fontSize: width * 0.05,
    marginTop: 0,
    textAlign: 'center',
    width: 'auto',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  qrFocusIcon: {
    marginTop: '5%',
    marginBottom: '35%',
    width: qrSize,
    height: qrSize,
  },
  flashButton: {
    fontSize: width * 0.05,
    textAlign: 'center',
    width: 'auto',
    color: '#FFFFFF',
    marginBottom: '10%',
  },
  permissions: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 30,
  },
});
