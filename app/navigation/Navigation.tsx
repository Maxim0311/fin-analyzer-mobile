import { View, Text } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import Auth from '../components/screens/auth/Auth';
import Home from '../components/screens/home/Home';
import Registration from '../components/screens/registration/Registration';
import Profile from '../components/screens/profile/Profile';
import Footer from '../components/layout/footer/Footer';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const { user } = useAuth();

  const ref = useNavigationContainerRef();

  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => setName(ref.getCurrentRoute()?.name), 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const listener = ref.addListener('state', () =>
      setName(ref.getCurrentRoute()?.name)
    );

    return () => ref.removeListener('state', listener);
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <View style={user ? { height: '93%' } : { height: '100%' }}>
        <NavigationContainer ref={ref}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              <>
                <Stack.Screen name="Home" component={Home}></Stack.Screen>
                <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
              </>
            ) : (
              <>
                <Stack.Screen name="Auth" component={Auth}></Stack.Screen>
                <Stack.Screen
                  name="Registration"
                  component={Registration}
                ></Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      {user && name && <Footer currentRoute={name} navigate={ref.navigate} />}
    </View>
  );
};

export default Navigation;
