import { View, Text, Pressable } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoom } from '../../../../providers/RoomProvider';

interface IRoomMain {
  route: any;
}

const RoomMain: FC<IRoomMain> = ({ route }) => {
  const navigation = useNavigation();

  const { roomId, setRoomId } = useRoom();

  useEffect(() => setRoomId(route.params.roomId), []);

  return (
    <View>
      <Pressable onPress={() => navigation.navigate('Transactions')}>
        <Text>{roomId && roomId}</Text>
      </Pressable>
    </View>
  );
};

export default RoomMain;
