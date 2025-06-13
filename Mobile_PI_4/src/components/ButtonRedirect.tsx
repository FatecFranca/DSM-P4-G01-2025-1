import React from 'react';
import { TouchableOpacity, Text , StyleSheet } from 'react-native';

type ButtonRedirect = {
  onPress: () => void;
};

export default function ButtonRedirect({ onPress }: ButtonRedirect) {
  return (
      <TouchableOpacity
        style={[styles.button]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>DASHBOARD</Text>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#4da6ff',
      borderRadius: 20,
      paddingVertical: 12,
      paddingHorizontal: 8,
      alignItems: 'center',
      marginBottom: 12,
    },
    text: {
      color: 'white',
      fontSize: 16,
    },
  });