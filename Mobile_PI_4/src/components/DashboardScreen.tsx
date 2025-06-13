import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';

export default function DashboardScreen() {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://lookerstudio.google.com/u/0/reporting/14699bb1-d3a1-44e4-8d66-d88243dbcd2c/page/nEsNF' }}
          style={styles.webview}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 40, // evita sobreposição no iOS
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});
