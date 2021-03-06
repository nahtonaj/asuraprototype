import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Text, Input, Button, Block, Card } from 'galio-framework';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { updateUser, createUser } from '../../src/graphql/custom-mutations';
import { getUserProfile } from '../../src/graphql/custom-queries';
import { useContext } from 'react';
import { userContext } from '../userContext';
import styles, { placeholderImage } from '../styles';



const EditProfile = ({navigation, route}) => {
  const { user, setUser } = useContext(userContext);

  const blankProfile = {
    age: null,
    id: user.attributes.sub,
    isActive: true,
    name: "",
    namelowercase: "",
    xp: 0,
    username: user.username,
    profilePictureKey: "",
  }
  
  useEffect(() => {
    getPermissions();
    fetchImages();
    getProfile();
    console.log("User: ", user);
  }, []);

  const [formState, setFormState] = useState(user.profile ? user.profile : blankProfile);
  const [image, setImage] = useState(placeholderImage);
  const [isNewImage, setIsNewImage] = useState(false);
  const [existingUser, setExistingUser] = useState(user.profile ? true : false);
  
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
  
  async function pickProfileImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
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
      setIsNewImage(true);
    };
  }
  
  async function fetchImages() {
    if (!formState.profilePictureKey) {
      return
    }
    await Storage.get(formState.profilePictureKey)
    .then((img) => {
      setImage(img);
    })
    .catch(err => {
      console.log("Error fetching images ", err);
    })
  }

  function getProfileFromForm() {
    return {
      ...formState,
      namelowercase: formState.name.toLocaleLowerCase(),
    }
  }

  async function updateProfile(addedFields) {
    try {
      const profile = {...getProfileFromForm(), ...addedFields};
      console.log(profile);
      delete profile.createdAt;
      delete profile.updatedAt;
      const profileData = await API.graphql(graphqlOperation(updateUser, { input: profile }))
      console.log("Updated profile: ", profileData);
      navigation.navigate("Profile");
      return profileData.data.updateUser;
    } catch(err) {
      console.log("Error updating profile: ", err);
    }
  }

  async function createProfile(addedFields) {
    try {
      const profile = {...getProfileFromForm(), ...addedFields};
      const profileData = await API.graphql(graphqlOperation(createUser, { input: profile }))
      console.log("Created profile: ", profileData);
      setExistingUser(true);
      navigation.navigate("Profile");
      return profileData.data.createUser;
    } catch(err) {
      console.log("Error creating profile: ", err);
    }
  }

  async function submitProfile() {
    if (isNewImage) {
      const access = { level: "public" };
      await fetch(image).then(response => {
        response.blob()
        .then(blob => {
          Storage.put(user.attributes.sub + "-Profile", blob, access)
          .then((succ) => {
            console.log("Successfully uploaded image: ", succ);
            setInput("profilePictureKey", succ.key);
            const addedFields = {profilePictureKey: succ.key};
            setIsNewImage(false);
            fetchImages();
            if (existingUser) {
              return updateProfile(addedFields);
            } else {
              return createProfile(addedFields);
            }
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
    else {
      if (existingUser) {
        return updateProfile();
      } else {
        return createProfile();
      }
    }
  }

  async function submitAndUpdateProfile() {
    await submitProfile()
    .catch((err) => {
      console.log("Error submitting and updating profile\n", err);
    });
  }

  async function getProfile() {
    try {
      const profileData = await API.graphql(graphqlOperation(
        getUserProfile, { id: user.attributes.sub }
      ))
      const profile = profileData.data.getUser
      if (!profile) {
        console.log("No profile found for ", user.attributes.sub);
        setFormState(blankProfile);
        setExistingUser(false);
      } else {
        setFormState(profile);
        setUser({...user, ["profile"]: profile});
        setExistingUser(true);
      }
    } catch (err) {
      console.log("Error getting profile: ", err);
    }
  }


  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(formState, null, 2)}</Text> */}
      <Block center>
        <Text h3 style={{ padding: 10 }}>Edit your profile</Text>
        <Card borderless style={styles.editProfileCard}>
          <TouchableOpacity onPress={pickProfileImage}>
            <Card style={styles.editProfilePicture}>
              { image !== null &&
                <Image source={{ uri: image }} style={styles.profilePicture} resizeMode={'cover'} />
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
            value={`${formState.age ? formState.age : ""}`}
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