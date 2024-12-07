import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute = (Component) => {
  return (props) => {
    const navigation = useNavigation();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const auth = await AsyncStorage.getItem('isAuthenticated');
          console.log('Authentication Status:', auth);
          setIsAuthenticated(auth === 'true');
        } catch (error) {
          console.error('Error checking authentication:', error);
          setIsAuthenticated(false); // Fallback in case of error
        }
      };
      checkAuth();
    }, []);

    // Show a loading spinner while checking authentication
    if (isAuthenticated === null) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    // Redirect to Login if not authenticated
    if (!isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      return null;
    }

    // Render the protected component
    return <Component {...props} />;
  };
};

export default ProtectedRoute;
