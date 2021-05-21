import React, { useEffect, useState } from 'react';
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Text, Block, Card, Button } from 'galio-framework';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { getUserProfile, getUserFollowingByID } from '../../src/graphql/custom-queries';
import { useContext } from 'react';
import { userContext } from '../userContext';
import styles, { placeholderImage } from '../styles';
import { createFollowRequest } from '../../src/graphql/custom-mutations';



const Profile = ({navigation, route}) => {
  const { user } = useContext(userContext);

  const id = route.params.id;
  const isOwnProfile = route.params.isOwnProfile;

  const [ isFollowing, setIsFollowing ] = useState(false);
  const [ requested, setRequested ] = useState(false);
  const [ profile, setProfile ] = useState({
    age: null,
    id: id,
    isActive: true,
    name: "",
    namelowercase: "",
    xp: 0,
    username: user.username,
    profilePictureKey: "",
  });
  
  useEffect(() => {
    getProfile();
  }, []);

  async function fetchImages(uri) {
    if (!uri) {
      return
    }
    await Storage.get(uri)
    .then((img) => {
      setImage(img);
    })
    .catch(err => {
      console.log("Error fetching images ", err);
    })
  }

  const [ image, setImage ] = useState(placeholderImage);
  
  async function getProfile() {
    try {
      await API.graphql(graphqlOperation(
        getUserProfile, { id: profile.id }
      ))
      .then(async (profileData) => {
        const newprofile = profileData.data.getUser
        if (!newprofile) {
          console.log("No profile found for ", profile.id);
        } else {
          console.log("Got profile:", newprofile);
          setProfile(newprofile);
          await getIsFollowing();
          await fetchImages(newprofile.profilePictureKey);
        }
      })
    } catch (err) {
      console.log("Error getting profile: ", err);
    }
  }

  async function getIsFollowing() {
    try {
      const results = await API.graphql(graphqlOperation(
        getUserFollowingByID, { id: user.attributes.sub, followsid: profile.id }
      ));
      console.log("Following query returned: ", results.data);
      const follows = results.data.getUser.follows.items;
      const req = results.data.getUser.sentRequests.items;
      if (follows.length === 0) {
        setIsFollowing(false);
        if (req.length !== 0) {
          setRequested(true);
        }
      }
      else {
        setIsFollowing(true);
      }
    } catch (err) {
      console.log("Error getting following: ", err);
    }
  }

  async function addFollow() {
    const followRequest = {
      fromID: user.profile.id,
      toID: profile.id,
      owners: [user.profile.username, profile.username],
      requestedOn: new Date().toISOString()
    }
    await API.graphql(graphqlOperation(
      createFollowRequest, {
        input: followRequest
      }
    ))
    .then((response) => {
      console.log("Created follow request:", response.data);
      setIsFollowing(true);
    })
    .catch((err) => {
      console.log("Error creating follow request: ", err);
    })
  }

  return (
    <View style={styles.container}>
      <Block center>
        {
          <Card 
          shadow
          borderless
          style={styles.card}
          title={profile.name ? profile.name : ""}
          caption={`${profile.age ? profile.age : ""}`}
          imageStyle={styles.profilePicture}
          image={image}
          />
        }
        {
          !isOwnProfile && !isFollowing && !requested &&
          <Button onPress={addFollow}>Follow</Button>
        }
        {
          !isOwnProfile && !isFollowing && requested &&
          <Button color="info">Requested</Button>
        }
        {
          !isOwnProfile && isFollowing &&
          <Button color="success">Following</Button>
        }
        {
          isOwnProfile &&
          <View>
            <Button onPress={() => {
              navigation.navigate('EditProfile');
            }}>Edit Profile</Button>
            <Button onPress={() => {
              navigation.navigate('Follow')
            }}>Follow Requests</Button>
          </View>
        }
      </Block>
    </View>
  )

}

export default Profile;