import React, { useContext, useEffect, useState } from 'react';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import { ListItem, SearchBar, Avatar } from 'react-native-elements';
import { View, FlatList, TouchableOpacity, Button } from 'react-native';
// import { Button } from 'galio-framework';
import { userContext } from '../userContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getUserFollow } from '../../src/graphql/custom-queries';
import { createFollowRelationship, deleteFollowRequest } from '../../src/graphql/mutations';
import { placeholderImage } from '../styles';

const FollowTabs = createMaterialTopTabNavigator();

const Follow = ({ navigation }) => {
  const [ requests, setRequests ] = useState([]);
  const [ sentRequests, setSentRequests ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    getResults();
  }, []);

  const { user } = useContext(userContext);

  async function getResults() {
    try {
      setIsLoading(true);
      const profileData = await API.graphql(graphqlOperation(
        getUserFollow, { id: user.profile.id }
      ));
      const newprofile = profileData.data.getUser
      if (!newprofile) {
        console.log("No profile found for ", profile.id);
      } else {
        console.log("Got follows result:", newprofile);
        setRequests(newprofile.requests.items);
        setSentRequests(newprofile.sentRequests.items);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Error getting profile: ", err);
    }
  }

  async function acceptFollowRequest(profile, followRequestID) {
    console.log("Initiating accept: ", profile.id, followRequestID);
    await API.graphql(graphqlOperation(
      createFollowRelationship, {
        input: {
          byID: profile.id,
          whoID: user.profile.id,
          owners: [profile.username, user.profile.username],
          requestedOn: new Date().toISOString(),
        }
      }
    ))
    .then(async (response) => {
      console.log("Accepted follow request, creating follow relationship: ", response.data);
      await declineFollowRequest(followRequestID);
    })
    .catch((err) => {
      console.log("Error accepting follow request: ", err);
    })
  }

  async function declineFollowRequest(id) {
    try {
      const response = await API.graphql(graphqlOperation(
        deleteFollowRequest, {
          input: {
            id: id,
          }
        }
      ));
      console.log("Deleted follow request", response.data);
      // setRequests(requests.filter((item) => item.id !== id));
      // setSentRequests(sentRequests.filter((item) => item.id !== id));
    } catch(err) {
      console.log("Error deleting follow request: ", err);
    }
  }

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  const FollowList = ({ navigation, route }) => {
    const [ list, setList ] = route.params.sent ? [ sentRequests, setSentRequests ] : [ requests, setRequests ];

    const deleteItem = (id) => {
      setList(list.filter((item) => item.id !== id));
    }

    return (
      <FlatList
        data={list}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {
            }}>
              <FollowResultContainer 
              item={ item.to ? item.to : item.from }
              acceptPossible={item.from ? true : false}
              followRequestID={item.id}
              deleteItem={deleteItem}
              />
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        ItemSeparatorComponent={renderSeparator}
      />
    );
  }

  const FollowResultContainer = ({ item, index, followRequestID, acceptPossible, deleteItem }) => {
    const [image, setImage] = useState(placeholderImage);
    async function getImage(uri) {
      if (!uri) {
        return;
      }
      await Storage.get(uri)
      .then((img) => {
        // return img;
        setImage(img);
      })
      .catch(err => {
        console.log("Error getting image ", err);
      })
    }
    getImage(item.profilePictureKey);
    return (
      <ListItem
        key={index}
        bottomDivider
      >
        <Avatar rounded source={{uri: image}}/>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
        </ListItem.Content>
        {
          acceptPossible &&
          <Button title="Accept" onPress={() => {acceptFollowRequest(item, followRequestID)}}/>
        }
        <Button title="Delete" onPress={() => {
          declineFollowRequest(followRequestID);
          deleteItem(followRequestID);
          }}/>
      </ListItem>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {
      !isLoading &&
      <FollowTabs.Navigator>
          <FollowTabs.Screen name="Requests" 
          component={FollowList}
          initialParams={{
            sent: false
          }} />
          <FollowTabs.Screen name="Pending" 
          component={FollowList}
          initialParams={{
            sent: true
          }}/>
      </FollowTabs.Navigator>
      }
    </View>
  );
}

export default Follow;
