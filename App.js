import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Button,
  Linking,
  Alert,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import WalletConnectProvider, {
  useWalletConnect,
  withWalletConnect,
  RenderQrcodeModalProps,
  WalletService,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

// docs: https://docs.walletconnect.org/quick-start/dapps/react-native

function Container() {
  const connector = useWalletConnect();
  if (!connector.connected) {
    /**
     *  Connect! 🎉
     */
    return <Button title="Connect" onPress={() => connector.connect()} />;
  }
  return (
    <Button title="Kill Session" onPress={() => connector.killSession()} />
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <WalletConnectProvider
      clientMeta={{description: 'Connect with WalletConnect'}}
      redirectUrl={
        Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.darker}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Container />
      </SafeAreaView>
    </WalletConnectProvider>
  );
}

export default App;
