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
        const auth = await AsyncStorage.getItem('isAuthenticated');
        setIsAuthenticated(auth === 'true');
      };
      checkAuth();
    }, []);

    if (isAuthenticated === null) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (!isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      return null;
    }

    return <Component {...props} />;
  };
};

export default ProtectedRoute;
