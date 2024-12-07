import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Authenticate the user by storing the authentication state.
 * @param {boolean} state - The authentication state.
 */
export const setAuthState = async (state) => {
  await AsyncStorage.setItem('isAuthenticated', state ? 'true' : 'false');
};

/**
 * Check if the user is authenticated.
 * @returns {boolean} - The authentication state.
 */
export const isAuthenticated = async () => {
  const authState = await AsyncStorage.getItem('isAuthenticated');
  return authState === 'true';
};
