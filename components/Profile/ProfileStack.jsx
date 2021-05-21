import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import EditProfile from './EditProfile';
import { userContext } from '../userContext';
import Follow from './Follow';

const Stack = createStackNavigator();

const ProfileStack = () => {
  const { user } = useContext(userContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} initialParams={{ 
        id: user.attributes.sub,
        isOwnProfile: true,
        }} 
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Follow" component={Follow} />
    </Stack.Navigator>
  );
}

export default ProfileStack;