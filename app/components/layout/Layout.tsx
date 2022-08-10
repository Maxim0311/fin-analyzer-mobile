import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { useTailwind } from 'tailwind-rn';

interface ILayout {
  isScrollView: boolean;
}

const Layout: FC<ILayout> = ({ children, isScrollView }) => {
  const tw = useTailwind();
  return (
    <View style={tw('p-200')}>
      {isScrollView ? <ScrollView>{children}</ScrollView> : { children }}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
});

export default Layout;
