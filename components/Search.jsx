import React, { useState } from 'react';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import { userContext } from './userContext';
import { ListItem, SearchBar, Avatar } from 'react-native-elements';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { listUsersByName } from '../src/graphql/custom-queries';


const Search = () => {
  const [ result, setResult ] = useState([]);
  const [ query, setQuery ] = useState("");

  async function getResults() {
    await API.graphql(graphqlOperation(listUsersByName, { prefix: query }))
    .then(response => {
      if (response.data) {
        console.log("Results: ", response.data);
        setResult(response.data.listUsers.items);
      }
    })
    .catch((err) => {
      console.log("Error fetching results: ", err);
    })
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

  const SearchResultContainer = ({ item, index }) => {
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
      <TouchableOpacity>
        <ListItem
          key={index}
          bottomDivider
        >
          <Avatar source={{uri: image}}/>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={result}
        renderItem={({ item }) => {
          return (
            <SearchResultContainer item={ item }/>
          )
        }}
        keyExtractor={(item) => {
          return item.username
        }}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={
          <SearchBar
            placeholder="Search users..."
            darkTheme
            round
            onChangeText={(text) => setQuery(text)}
            onSubmitEditing={() => {
              getResults();
            }}
            autoCorrect={false}
            value={query}
          />
        }
      />
    </View>
  );
}

export default Search;
