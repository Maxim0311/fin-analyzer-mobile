import axios from 'axios';
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { API_URL } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import { IOperationResult } from '../interfaces/operationResult';
import { IPagination } from '../interfaces/pagination';
import { IRoom } from '../interfaces/room';

interface IContext {
  isLoading: boolean;
  error: string | null | undefined;
  clearError: () => void;
  getAllRooms: (
    skip?: number,
    take?: number,
    searchText?: string
  ) => Promise<IPagination<IRoom> | null | undefined>;
}

const RoomServiceContext = createContext<IContext>({} as IContext);

export const RoomServiceProvider: FC = ({ children }) => {
  const { getToken } = useAuth();

  const [token, setToken] = useState<string | null>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    getToken().then(jwt => setToken(jwt));
  }, []);

  const clearError = () => setError(null);

  const getAllRooms = async (
    skip?: number,
    take?: number,
    searchText?: string
  ): Promise<IPagination<IRoom> | null | undefined> => {
    try {
      setIsLoading(true);

      const { data } = await axios.get<IOperationResult<IPagination<IRoom>>>(
        `${API_URL}/rooms?skip=${skip}&take=${take}&searchText=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        return data.result!;
      } else {
        setError(data.message);
      }
    } catch (e: any) {
      Alert.alert('Ошибка', e?.response?.data?.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({ isLoading, error, clearError, getAllRooms }),
    [isLoading]
  );

  return (
    <RoomServiceContext.Provider value={value}>
      {children}
    </RoomServiceContext.Provider>
  );
};

export const useRoomService = () => useContext(RoomServiceContext);
