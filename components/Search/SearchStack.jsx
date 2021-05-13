import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Profile/Profile';
import Search from './Search';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchProfile" component={Profile} />
    </Stack.Navigator>
  );
}

export default SearchStack;