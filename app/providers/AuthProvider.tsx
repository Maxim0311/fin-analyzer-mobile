import axios from 'axios';
import { createContext, FC, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import {
  IOperationResult,
  OperationCode,
} from '../api/interfaces/operationResult';
import {
  IAuthRequest,
  IAuthResponse,
  IPerson,
  IRegistrationRequest,
} from '../api/interfaces/auth';
import { API_URL } from '../api';
import * as Keychain from 'react-native-keychain';
import * as SecureStore from 'expo-secure-store';

interface IContext {
  user: IPerson | null | undefined;
  isLoading: boolean;
  login: (authRequest: IAuthRequest) => Promise<void>;
  register: (regRequest: IRegistrationRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IPerson | null>();

  const [isLoading, setIsLoading] = useState(false);

  const register = async (
    regRequest: IRegistrationRequest
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      const { data } = await axios
        .post<IOperationResult<number>>(
          `${API_URL}/auth/registration`,
          regRequest
        )
        .then(resp => resp);

      if (data.success) {
        return true;
      }

      return false;
    } catch (e: any) {
      Alert.alert('Ошибка авторизации', e?.response?.data?.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (authRequest: IAuthRequest) => {
    try {
      setIsLoading(true);
      const { data } = await axios
        .post<IOperationResult<IAuthResponse>>(
          `${API_URL}/auth/authenticate`,
          authRequest
        )
        .then(resp => resp);

      if (data.success) {
        setUser(data?.result?.person);

        await SecureStore.setItemAsync('token', data.result!.token);
      }
    } catch (e: any) {
      Alert.alert('Ошибка авторизации', e?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);

    await SecureStore.deleteItemAsync('token');
  };

  const getToken = async (): Promise<string | null> => {
    try {
      const token = await SecureStore.getItemAsync('token');
      return token;
    } catch (e: any) {
      console.log(e);
      return null;
    }
  };

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout, getToken }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
