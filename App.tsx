import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './state/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { storage } from './services/storage';
import AppNavigator from './navigation/AppNavigator';
import LockOverlay from './components/common/LockOverlay';
import { useAppLock } from './hooks/useAppLock';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: {
    setItem: (key, value) => storage.set(key, value),
    getItem: (key) => storage.getString(key) as string | null,
    removeItem: (key) => storage.delete(key),
  },
});

const AppContent = () => {
  const isLocked = useSelector((state: RootState) => state.app.isLocked);
  const { resetTimer } = useAppLock();

  return (
    <GestureHandlerRootView style={styles.flex} onTouchStart={resetTimer}>
      <AppNavigator />
      {isLocked && <LockOverlay />}
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <AppContent />
      </PersistQueryClientProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
