import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { AuthProvider } from './AuthProvider';
import { RoomServiceProvider } from '../api/service/room-service';

export const HeadProvider: FC = ({ children }) => {
  return (
    <AuthProvider>
      <RoomServiceProvider>{children}</RoomServiceProvider>
    </AuthProvider>
  );
};

export default HeadProvider;
