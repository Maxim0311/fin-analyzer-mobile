import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { BOX_SHADOW } from '../../styles';

interface IField {
  onChange: (value: string) => void;
  value?: string;
  placeholder: string;
  isSecure?: boolean;
  style?: any;
}

const Field: FC<IField> = ({ onChange, value = '', placeholder, isSecure }) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      secureTextEntry={isSecure}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    borderColor: 'black',
    backgroundColor: '#D9D9D9',
    fontSize: 17,
    padding: 10,
    width: '100%',
    marginTop: 10,
  },
});

export default Field;
