import React, { useContext } from 'react';
import { 
    View, 
    TouchableOpacity,
 } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FollowFeed from './FollowFeed';
import { userContext } from '../userContext';
import { Icon } from 'react-native-elements';
import EditExperience from './EditExperience';

const Stack = createStackNavigator();

const FeedStack = ({ navigation }) => {
  const { user } = useContext(userContext);
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Feed" 
      component={FollowFeed}
      options= {{
          headerRight: () => (
            <View style={{flexDirection: "row",justifyContent: "flex-end",paddingRight:20,width: 120}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Experience')}
                    >
                    <Icon type="font-awesome" name="plus" color="black" />
                </TouchableOpacity>
            </View>
          )
      }}
      />
      <Stack.Screen name="Experience" component={EditExperience} />
    </Stack.Navigator>
  );
}

export default FeedStack;