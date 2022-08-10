import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../../hooks/useAuth';

const Profile = () => {
  const { logout } = useAuth();

  return (
    <View style={{ left: '80%', top: '3%' }}>
      <Pressable onPress={logout}>
        <Icon name="exit" size={30} />
        <Text>Выход</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
