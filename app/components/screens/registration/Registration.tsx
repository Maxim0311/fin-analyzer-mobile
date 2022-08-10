import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { FC, useState } from 'react';
import Field from '../../ui/Field';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';
import { IRegistrationRequest } from '../../../api/interfaces/auth';
import Button from '../../ui/Button';

const Registration: FC = () => {
  const { register, isLoading } = useAuth();

  const navigation = useNavigation();

  const [data, setData] = useState<IRegistrationRequest>(
    {} as IRegistrationRequest
  );

  const [confirmPassword, setConfirmPassword] = useState('');

  const isPasswordConfirm = (): boolean => data.password === confirmPassword;

  const registerHandler = async () => {
    if (!isPasswordConfirm()) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    if (await register(data)) navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Зарегистрироваться</Text>
        <Text style={styles.text}></Text>
        <Field
          onChange={value => {
            setData({ ...data, login: value });
          }}
          value={data.login}
          placeholder="Логин"
        />
        <Field
          onChange={value => {
            setData({ ...data, firstname: value });
          }}
          value={data.firstname}
          placeholder="Имя"
        />
        <Field
          onChange={value => {
            setData({ ...data, lastname: value });
          }}
          value={data.lastname}
          placeholder="Фамилия"
        />
        <Field
          onChange={value => {
            setData({ ...data, middlename: value });
          }}
          value={data.middlename}
          placeholder="Отчество"
        />
        <Field
          onChange={value => {
            setData({ ...data, password: value });
          }}
          value={data.password}
          placeholder="Пароль"
          isSecure={true}
        />
        <Field
          onChange={value => {
            setConfirmPassword(value);
          }}
          value={confirmPassword}
          placeholder="Повторите пароль"
          isSecure={true}
        />
        <Button
          disabled={isLoading}
          title="Зарегистрироваться"
          onPress={() => registerHandler()}
        />
      </View>

      <TouchableOpacity
        style={{ width: '80%' }}
        onPress={() => navigation.navigate('Auth')}
      >
        <Text style={styles.bottomText}>Войти</Text>
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

export default Registration;
