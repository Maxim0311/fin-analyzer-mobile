import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import React, { FC } from 'react';

interface IButton {
  title: string;
  onPress: () => void;
  colors?: [string, string];
  disabled?: boolean;
}

const Button: FC<IButton> = ({
  title,
  onPress,
  colors = ['#3346FF', 'white'],
  disabled = false,
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: colors[0],
        opacity: disabled ? 0.5 : 1,
      }}
      disabled={disabled}
    >
      <Text style={{ ...styles.text, color: colors[1] }}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 55,
    marginTop: 10,
    borderRadius: 25,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
});

export default Button;
