import React from 'react';
import { Provider } from 'react-redux';
import store from './android/app/src/main/store';
import "react-native-devsettings";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Users from './android/app/src/main/screens/users';
import Photos from './android/app/src/main/screens/photos';
import { View } from 'react-native';
import globalStyles from './android/app/src/main/styles/globalStyles';

const Stack = createStackNavigator();

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered main application component.
 */

const App = () => {
  return (
    <Provider store={store}>
      <View style={globalStyles.container}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false, // Hide the header
              gestureEnabled: true, // Enable gestures
              cardStyle: globalStyles.cardStyle, // Apply global card style
            }}
          >
            <Stack.Screen name="Users" component={Users} />
            <Stack.Screen name="Photos" component={Photos} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App
