import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { setSignIn } from '../../state/authSlice';
import { loginUser } from '../../api/authApi';
import Keychain from 'react-native-keychain';
import { COLORS, SIZES } from '../../styles/theme';

const LoginScreen = () => {
  const [username, setUsername] = useState('kminchelle'); // Default superadmin for ease of testing
  const [password, setPassword] = useState('0lelplR');
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password.');
      return;
    }
    try {
      const data = await loginUser(username, password);
      await Keychain.setGenericPassword(username, data.token);
      dispatch(setSignIn({ token: data.token, user: { id: data.id, username: data.username } }));
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.lightGray,
  },
  title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: COLORS.darkGray,
  },
  input: {
    height: 40,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
  },
});

export default LoginScreen;
