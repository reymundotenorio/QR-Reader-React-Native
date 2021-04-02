import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { Camera } from 'expo-camera';
const flashOff = Camera.Constants.FlashMode.off;
const flashOn = Camera.Constants.FlashMode.torch;

import { Path, Svg, SvgProps } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { Text, View } from './Themed';
import { MonoText } from './StyledText';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

import { handleBarCodeScannedProps } from '../types';

export default function ReadQRScreenInfo() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [flash, setFlash] = useState<string | number | undefined>(flashOff);

  const colorScheme = useColorScheme();
  const tabBackgroundColor = Colors[colorScheme].tabBackgroundColor;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: handleBarCodeScannedProps) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const toggleFlash = () => {
    if (flash === flashOn) {
      setFlash(flashOff);
    } else {
      setFlash(flashOn);
    }
  };

  if (hasPermission === null) {
    return (
      <Text lightColor='rgba(0,0,0,0.8)' darkColor='rgba(255,255,255,0.8)'>
        Requesting for camera permission
      </Text>
    );
  }

  if (hasPermission === false) {
    return (
      <Text lightColor='rgba(0,0,0,0.8)' darkColor='rgba(255,255,255,0.8)'>
        No access to camera
      </Text>
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
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        autoFocus={Camera.Constants.AutoFocus.on}
        type={Camera.Constants.Type.back}
        flashMode={flash}
        style={[StyleSheet.absoluteFillObject, stylesQRReader.container]}
      >
        <MonoText style={stylesQRReader.title}>Scan your QR code</MonoText>
        <QRFocusIcon style={stylesQRReader.qrFocusIcon} />
        <TouchableOpacity onPress={toggleFlash} style={stylesQRReader.flashButton}>
          {flash === flashOn && <FlashIcon name='flash' color={'#FFFFFF'} />}
          {flash === flashOff && <FlashIcon name='flash-outline' color={'#FFFFFF'} />}
        </TouchableOpacity>
      </Camera>

      {/* <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFillObject, stylesQRReader({ tabBackgroundColor }).container]}>
        <MonoText style={stylesQRReader.title}>Scan your QR code</MonoText>
        <QRFocusIcon style={stylesQRReader.qrFocusIcon} />
      </BarCodeScanner> */}
      {scanned && <Button title={'Scan Again'} onPress={() => setScanned(false)} />}
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

function FlashIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: 0 }} {...props} />;
}

const stylesQRReader = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
    padding: 0,
    borderWidth: 0,
  },
  title: {
    fontSize: width * 0.05,
    marginTop: '10%',
    textAlign: 'center',
    width: 'auto',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  qrFocusIcon: {
    marginTop: '20%',
    marginBottom: '20%',
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
});
