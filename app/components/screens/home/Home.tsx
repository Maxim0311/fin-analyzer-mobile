import { View, Text } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

const Home: FC = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>Привет, {user?.login}</Text>
    </View>
  );
};

export default Home;
