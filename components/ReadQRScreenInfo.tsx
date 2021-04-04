/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Path, Svg, SvgProps } from 'react-native-svg';
import Constants from 'expo-constants';

import { useDispatch } from 'react-redux';
import { addQRData } from '../store/qrCodeAction';

import { View } from './Themed';
import { MonoText } from './StyledText';

import { NavigationProps, handleBarCodeScannedProps } from '../types';

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

function QRFocusIcon(props: SvgProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Svg width="280" height="280" viewBox="0 0 200 200" fill="none" {...props}>
      <Path
        d="M0 66.0714V10.7143C0 4.77679 4.77679 0 10.7143 0H66.0714C69.0179 0 71.4286 2.41071 71.4286 5.35714V8.92857C71.4286 11.875 69.0179 14.2857 66.0714 14.2857H14.2857V66.0714C14.2857 69.0179 11.875 71.4286 8.92857 71.4286H5.35714C2.41071 71.4286 0 69.0179 0 66.0714ZM133.929 0H189.286C195.223 0 200 4.77679 200 10.7143V66.0714C200 69.0179 197.589 71.4286 194.643 71.4286H191.071C188.125 71.4286 185.714 69.0179 185.714 66.0714V14.2857H133.929C130.982 14.2857 128.571 11.875 128.571 8.92857V5.35714C128.571 2.41071 130.982 0 133.929 0ZM200 133.929V189.286C200 195.223 195.223 200 189.286 200H133.929C130.982 200 128.571 197.589 128.571 194.643V191.071C128.571 188.125 130.982 185.714 133.929 185.714H185.714V133.929C185.714 130.982 188.125 128.571 191.071 128.571H194.643C197.589 128.571 200 130.982 200 133.929ZM66.0714 200H10.7143C4.77679 200 0 195.223 0 189.286V133.929C0 130.982 2.41071 128.571 5.35714 128.571H8.92857C11.875 128.571 14.2857 130.982 14.2857 133.929V185.714H66.0714C69.0179 185.714 71.4286 188.125 71.4286 191.071V194.643C71.4286 197.589 69.0179 200 66.0714 200Z"
        fill="#FE7D55"
      />
    </Svg>
  );
}

export default function ReadQRScreenInfo({
  navigation,
}: NavigationProps): JSX.Element {
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
      // console.error('Error getting Camera persission');
    }
  }, []);

  const saveQRData = (data: string) => {
    dispatch(addQRData(data.trim(), `${new Date()}`));
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
      { cancelable: false },
    );
  };

  const handleBarCodeScanned = ({ type, data }: handleBarCodeScannedProps) => {
    setScanned(true);
    QRDetected(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return (
      <MonoText
        style={styles.permissions}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        Requesting for camera permission
      </MonoText>
    );
  }

  if (hasPermission === false) {
    return (
      <MonoText
        style={styles.permissions}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
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
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={[StyleSheet.absoluteFillObject, styles.container]}
        >
          <QRFocusIcon style={styles.qrFocusIcon} />
        </BarCodeScanner>
      )}
    </View>
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
    marginTop: '10%',
    marginBottom: '10%',
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
