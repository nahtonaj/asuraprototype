import React, { useContext, useState } from 'react';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import { ListItem, SearchBar, Avatar } from 'react-native-elements';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { listUsersByName } from '../../src/graphql/custom-queries';
import { userContext } from '../userContext';
import { placeholderImage } from '../styles';

const Search = ({ navigation }) => {
  const [ result, setResult ] = useState([]);
  const [ query, setQuery ] = useState("");

  const { user } = useContext(userContext);

  async function getResults(text) {
    if (text !== "") {
      await API.graphql(graphqlOperation(listUsersByName, { prefix: text.toLocaleLowerCase() }))
      .then(response => {
        if (response.data) {
          console.log("Results: ", response.data);
          setResult(response.data.listUsers.items);
        }
      })
      .catch((err) => {
        console.log("Error fetching results: ", err);
      })
    } else {
      setResult([]);
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

  const SearchResultContainer = ({ item, index }) => {
    const [image, setImage] = useState(placeholderImage);
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
      <ListItem
        key={index}
        bottomDivider
      >
        <Avatar rounded source={{uri: image}}/>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.username}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={result}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {
              if (item.id === user.profile.id) {
                navigation.navigate('Profile')
              } else {
                navigation.navigate('SearchProfile', {
                  id: item.id,
                })
              }
            }}>
              <SearchResultContainer item={ item }/>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => {
          return item.username
        }}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={
          <SearchBar
            placeholder="Search users..."
            lightTheme
            round
            onChangeText={(text) => {
              setQuery(text);
              getResults(text);
            }}
            // onSubmitEditing={getResults}
            onClear={() => setResult([])}
            autoCorrect={false}
            value={query}
          />
        }
      />
    </View>
  );
}

export default Search;
