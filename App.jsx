import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { userContext } from './components/userContext';

Amplify.configure({
  ...config, 
  Analytics: {
    disabled: true,
  },
});
const Tabs = createBottomTabNavigator();

const App = () =>  {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserInfo()
  }, []);

  const getUserInfo = async () => {
    try {
      const u = await Auth.currentAuthenticatedUser()
      setUser(u)
    } catch (err) {
      console.log("Error getting user info", err);
    }
  }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: 'center'
    }}>
      {!user &&
        <ActivityIndicator size="large" />
      }
      {user &&
        <userContext.Provider value={user}>
          <NavigationContainer>
            <Tabs.Navigator initialRouteName="Home"> 
              <Tabs.Screen
              name="Home"
              component={Home}
              />
              <Tabs.Screen
              name="Profile"
              component={EditProfile}
              />
            </Tabs.Navigator>
          </NavigationContainer>
          {/* <EditProfile /> */}
        </userContext.Provider>
      }
    </View>
  )
}

export default withAuthenticator(App);