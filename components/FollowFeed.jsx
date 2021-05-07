import { Storage, API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { getUserFollowers } from '../src/graphql/custom-queries';
import { userContext } from './userContext';
import styles from './styles';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text } from 'galio-framework';


const FollowContainer = ({ item }) => {
  const [image, setImage] = useState("");
  async function getImage(uri) {
    if (!uri) {
      return;
    }
    await Storage.get(uri)
    .then((img) => {
      setImage(img);
    })
    .catch(err => {
      console.log("Error getting image ", err);
    })
  }
  getImage(item.profilePictureKey);
  return (
    <View style={ styles.item }>
      <TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '500' }}>{ item.name }</Text>
        <Image source={{ uri: image}} style={styles.friendProfilePicture} resizeMode={'cover'}/>
        <Text>Click to match!</Text>
      </TouchableOpacity>
    </View>
  )
}


const FollowFeed = () => {
  const { user } = useContext(userContext);

  const [follows, setFollows] = useState([]);

  useEffect(() => {
    getFollows();
    // fetchMatchProfiles();
  }, [])

  async function getFollows() {
    await API.graphql(graphqlOperation(getUserFollowers, { id: user.attributes.sub }))
    .then((response) => {
      setFollows(response.data.getUser.items);
      console.log(response.data.getUser.items);
    })
    .catch((err) => {
      console.log("Error getting follows:", err)
    });
  }
  
  // async function getMatches() {
  //   var matchFunctionUrl = new URL("https://g18j48zn2i.execute-api.us-east-1.amazonaws.com/default/fetchMatches");

  //   try {
  //     await fetch(matchFunctionUrl, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(user.profile),
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched matches: ", data.Items);
  //       setMatches(data.Items);
  //     })
  //   } catch (err) {
  //     console.log("Error getting matches: ", err);
  //   }
  // }

  // async function fetchMatchProfiles() {
  //   try {
  //     await Promise.all(matches.map(async (match) => {
  //       await API.graphql(graphqlOperation(
  //         getSlangProfile, { id: match }
  //         ))
  //       .then((matchData) => {
  //         console.log("Fetching match: ", matchData.data.getSlangProfile);
  //         setMatchProfiles([...matchProfiles, matchData.data.getSlangProfile]);
  //       })
  //     }))
  //   } catch (err) {
  //     console.log("Error fetching match profiles: ", err);
  //   }
  // }

  return (
    <View style={styles.feedContainer}>
      <FlatList
        data = { follows }
        renderItem = {({ item }) => {
          return (
            <FollowContainer item={ item }/>
          )
        }}
        keyExtractor={ (item) => item.name } 
        contentContainerStyle={{ backgroundColor: '#F0F1F4', paddingHorizontal: 20, paddingVertical: 10 }}
        scrollEnabled
      />
    </View>
  );
}

export default FollowFeed;