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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const url = 'https://metamask.app.link/dapp/paintswap.finance/';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  function callback(response) {
    console.log({response});
  }

  useEffect(() => {
    Linking.addEventListener('url', callback);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.darker}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Button title="Login Metamask" onPress={handlePress} />
      <Text
        style={{
          color: Colors.light,
        }}>
        Hello
      </Text>
    </SafeAreaView>
  );
};

export default App;
