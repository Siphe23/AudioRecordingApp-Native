import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save recordings to local storage.
 * @param {Array} recordings - The list of recordings to save.
 */
export const saveRecordings = async (recordings) => {
  try {
    await AsyncStorage.setItem('recordings', JSON.stringify(recordings));
  } catch (error) {
    console.error('Error saving recordings to AsyncStorage:', error);
  }
};

/**
 * Retrieve recordings from local storage.
 * @returns {Promise<Array>} - The list of recordings or an empty array.
 */
export const getRecordings = async () => {
  try {
    const recordings = await AsyncStorage.getItem('recordings');
    return recordings ? JSON.parse(recordings) : [];
  } catch (error) {
    console.error('Error retrieving recordings from AsyncStorage:', error);
    return [];
  }
};

/**
 * Clear all recordings from local storage.
 */
export const clearRecordings = async () => {
  try {
    await AsyncStorage.removeItem('recordings');
  } catch (error) {
    console.error('Error clearing recordings from AsyncStorage:', error);
  }
};

/**
 * Check user authentication status.
 * @returns {Promise<boolean>} - True if authenticated, false otherwise.
 */
export const checkAuth = async () => {
  try {
    const auth = await AsyncStorage.getItem('isAuthenticated');
    return auth === 'true';
  } catch (error) {
    console.error('Error fetching authentication status from AsyncStorage:', error);
    return false;
  }
};
