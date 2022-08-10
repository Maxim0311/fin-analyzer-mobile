import { SafeAreaView } from 'react-native-safe-area-context';

import Navigation from './app/navigation/Navigation';
import HeadProvider from './app/providers/HeadProvider';

export default function App() {
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <HeadProvider>
        <Navigation />
      </HeadProvider>
    </SafeAreaView>
  );
}
