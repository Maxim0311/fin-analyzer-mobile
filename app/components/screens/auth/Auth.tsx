import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Field from '../../ui/Field';
import { useNavigation } from '@react-navigation/native';
import Button from '../../ui/Button';
import { IAuthRequest } from '../../../api/interfaces/auth';

const Auth: FC = () => {
  const { isLoading, login } = useAuth();

  const navigation = useNavigation();

  const [data, setData] = useState<IAuthRequest>({
    login: '',
    password: '',
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Войти</Text>
        <Field
          onChange={value => {
            setData({ ...data, login: value });
          }}
          value={data.login}
          placeholder="Логин"
        />
        <Field
          onChange={value => {
            setData({ ...data, password: value });
          }}
          value={data.password}
          placeholder="Пароль"
          isSecure={true}
        />
        <Button
          disabled={isLoading}
          title="Войти"
          onPress={() => login(data)}
        />
      </View>

      <TouchableOpacity
        style={{ width: '80%' }}
        onPress={() => navigation.navigate('Registration')}
      >
        <Text style={styles.bottomText}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
  bottomText: {
    marginTop: 10,
    textAlign: 'right',
    opacity: 0.5,
    fontSize: 15,
  },
});

export default Auth;
