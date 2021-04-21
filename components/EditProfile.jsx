import React, { useEffect, useState } from 'react';
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Text, Input, Button, Block, Card } from 'galio-framework';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updateSlangProfile, createSlangProfile } from '../src/graphql/mutations';
import { getSlangProfile } from '../src/graphql/queries';
import { useContext } from 'react';
import { userContext } from './userContext';



const EditProfile = () => {
  const user = useContext(userContext);

  const blankProfile = {
    age: null,
    id: user.attributes.sub,
    isActive: true,
    matches: [],
    name: "",
    profilePictureKey: ""
  }

  const [profile, setProfile] = useState([]);
  const [formState, setFormState] = useState(blankProfile);
  const [image, setImage] = useState(null);
  const [existingUser, setExistingUser] = useState(false);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function getPermissions() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      .catch(err => console.log("Error getting permissions" + err.message));
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
    }
  }
  
  async function pickAndUploadImage(key) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    .catch((err) => {
      console.log("Error picking image: ", err);
      return;
    });

    console.log("Selected image: ", result);

    if (!result.cancelled) {
      setImage(result.uri);
    };

    const access = { level: "public" };
    fetch(result.uri).then(response => {
      response.blob()
      .then(blob => {
        Storage.put(user.attributes.sub + key, blob, access)
        .then((succ) => {
            console.log("Successfully uploaded image: ", succ);
            setInput("profilePictureKey", succ.key);
        })
        .catch(err => {
          setImage(null);
          console.log("Error uploading image: ", err);
        })
      })
    })
    .catch((err) => {
      console.log("Error fetching image from device: ", err);
    })
  }

  async function fetchImages() {
    if (!profile.profilePictureKey) {
      return
    }
    await Storage.get(profile.profilePictureKey)
    .then((img) => {
      setImage(img);
    })
    .catch(err => {
      console.log("Error fetching images ", err);
    })
  }

  async function updateProfile() {
    try {
      const profile = { ...formState };
      delete profile.createdAt;
      delete profile.updatedAt;
      const profileData = await API.graphql(graphqlOperation(updateSlangProfile, { input: profile }))
      console.log("Updated profile: ", profileData);
      return profileData.data.updateSlangProfile;
    } catch(err) {
      console.log("Error updating profile: ", err);
    }
  }

  async function createProfile() {
    try {
      const profile = { ...formState };
      const profileData = await API.graphql(graphqlOperation(createSlangProfile, { input: profile }))
      console.log("Created profile: ", profileData);
      return profileData.data.createSlangProfile;
    } catch(err) {
      console.log("Error creating profile: ", err);
    }
  }

  async function submitProfile() {
    if (existingUser) {
      updateProfile();
    } else {
      createProfile();
    }
  }

  async function submitAndUpdateProfile() {
    await submitProfile()
    .then(() => {
      fetchImages();
    })
    .catch((err) => {
      console.log("Error submitting and updating profile\n", err);
    });
  }

  async function getProfile() {
    try {
      const profileData = await API.graphql(graphqlOperation(
        getSlangProfile, { id: user.attributes.sub }
      ))
      const profile = profileData.data.getSlangProfile
      if (!profile) {
        console.log("No profile found for ", user.attributes.sub);
        setFormState(blankProfile);
        setExistingUser(false);
      } else {
        setProfile(profile);
        setFormState(profile);
        setExistingUser(true);
      }
    } catch (err) {
      console.log("Error getting profile: ", err);
    }
  }

  useEffect(() => {
    getPermissions();
    getProfile();
  }, []);

  useEffect(() => {
    fetchImages();
  }, [profile]);

  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* <Text>{JSON.stringify(formState, null, 2)}</Text> */}
      <Block center>
        <Text h3 style={{ padding: 10 }}>Edit your profile</Text>
        <Card borderless style={{
          padding: 20,
          height: 420,
        }}>
          <TouchableOpacity onPress={() => {pickAndUploadImage("Profile")}}>
            <Card style={{
              // flexDirection: 'row',
              // alignItems: 'center',
              // justifyContent: 'center',
              padding: 10,
              height: 250
            }}>
              { image !== null &&
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} resizeMode={'cover'} />
              }
            </Card>
          </TouchableOpacity>
          <Input
            onChangeText={val => setInput('name', val)}
            value={formState.name}
            placeholder="Name"
            />
          <Input
            onChangeText={val => setInput('age', val)}
            value={`${formState.age}`}
            placeholder="Age"
            keyboardType="numeric"
            />
        </Card>
        <Block style={{
          padding: 20,
        }}>
          <Button onPress={submitAndUpdateProfile}>
            Save
          </Button>
        </Block>
      </Block>
    </View>
  )

}

export default EditProfile;