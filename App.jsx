import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUserProfile } from './src/graphql/custom-queries';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import EditProfile from './components/EditProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { userContext } from './components/userContext';
import { locationContext } from './components/locationContext';
import FollowFeed from './components/FollowFeed';
import SearchableList from './components/SearchableList';
import Search from './components/Search';


Amplify.configure({
  ...config, 
  Analytics: {
    disabled: true,
  },
});
const Tabs = createBottomTabNavigator();

const App = () =>  {
  const [user, setUser] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    getUserInfo();
    getCurrentLocation();
  }, []);

  const getUserInfo = async () => {
    try {
      await Auth.currentAuthenticatedUser()
      .then(async (u) => {
        const profileData = await API.graphql(graphqlOperation(
          getUserProfile, { id: u.attributes.sub }
        ))
        const profile = profileData.data.getUser;
        if (profile) {
          setUser({...u, ["profile"]: profile});
        }
        else {
          setUser({...u, ["profile"]: null});
        }
      }, () => {
        console.log("Promise rejected");
      })
    } catch (err) {
      console.log("Error getting user info", err);
    }
  }

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      location => {
        console.log("Location: ", location);
        setLocation(location);
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      {!user &&
        <ActivityIndicator size="large" />
      }
      {user &&
        <userContext.Provider value={{user, setUser}}>
          <locationContext.Provider value={{location, setLocation}}>
            <NavigationContainer>
              <Tabs.Navigator initialRouteName="Feed"> 
                <Tabs.Screen
                name="Feed"
                component={FollowFeed}
                />
                <Tabs.Screen
                name="Search"
                component={Search}
                />
                <Tabs.Screen
                name="Profile"
                component={EditProfile}
                />
              </Tabs.Navigator>
            </NavigationContainer>
          </locationContext.Provider>
          {/* <EditProfile /> */}
        </userContext.Provider>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
    backgroundColor: '#AAAAAA',
  }
})

export default withAuthenticator(App);