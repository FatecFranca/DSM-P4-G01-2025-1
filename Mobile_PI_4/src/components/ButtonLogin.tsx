import React from 'react';
import { TouchableOpacity, Text , StyleSheet } from 'react-native';

type ButtonLoginProps = {
  onPress: () => void;
  disabled?: boolean;
};

export default function ButtonLogin({ onPress, disabled }: ButtonLoginProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>ENTRAR</Text>
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
  disabled: {
    backgroundColor: '#a3c9ff',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});