import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { setSignIn, setSignOut } from '../state/authSlice';

import Keychain from 'react-native-keychain';
import { validateToken } from '../api/authApi';

import LoginScreen from '../screens/Auth/LoginScreen';
import AllProductsScreen from '../screens/Products/AllProductsScreen';
import SpecificCategoryScreen from '../screens/Products/SpecificCategoryScreen';
import LoadingScreen from '../screens/Shared/LoadingScreen';
import { setLocked } from '../state/appSlice';
import ReactBiometrics from 'react-native-biometrics';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppTabs = createBottomTabNavigator();
const rnBiometrics = new ReactBiometrics();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

const AppNavigatorTabs = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen name="All Products" component={AllProductsScreen} />
    <AppTabs.Screen 
      name="Smartphones" 
      component={SpecificCategoryScreen} 
      initialParams={{ categoryName: 'smartphones' }}
    />
  </AppTabs.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
          const user = await validateToken(credentials.password);
          dispatch(setSignIn({ token: credentials.password, user }));
          
          // Show biometric unlock
          const { available } = await rnBiometrics.isSensorAvailable();
          if (available) {
              dispatch(setLocked(true)); // Lock the app to force biometric check
          }
        }
      } catch (error) {
        console.log('Session restore failed:', error);
        await Keychain.resetGenericPassword();
        dispatch(setSignOut());
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="App" component={AppNavigatorTabs} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;