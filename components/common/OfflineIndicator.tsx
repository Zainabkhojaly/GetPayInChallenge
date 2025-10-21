import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useIsConnected } from 'react-native-offline';

const OfflineIndicator = () => {
  const isConnected = useIsConnected();

  if (isConnected === true || isConnected === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are offline</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dc3545',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OfflineIndicator;
