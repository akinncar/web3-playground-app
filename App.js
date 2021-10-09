import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  Button,
  Linking,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import WalletConnectProvider, {
  useWalletConnect,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useMount = func => useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });

  return {url, processing};
};

function Container() {
  const connector = useWalletConnect();
  if (!connector.connected) {
    /**
     *  Connect! 🎉
     */
    return <Button title="Connect" onPress={() => connector.connect()} />;
  }

  console.log(connector.accounts);

  return (
    <Button title="Kill Session" onPress={() => connector.killSession()} />
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const {url: initialUrl, processing} = useInitialURL();

  return (
    <WalletConnectProvider
      clientMeta={{description: 'Connect with WalletConnect'}}
      redirectUrl={
        Platform.OS === 'web' ? window.location.origin : 'web3playgroundapp://'
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.darker}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Container />
        <Text style={{color: Colors.white}}>
          {processing
            ? 'Processing the initial url from a deep link'
            : `The deep link is: ${initialUrl || 'None'}`}
        </Text>
      </SafeAreaView>
    </WalletConnectProvider>
  );
}

export default App;
