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
import { useContext } from 'react';
import { userContext } from '../userContext';
import styles, { placeholderImage } from '../styles';
import { locationContext } from '../locationContext';
import { createExperience, updateExperience } from '../../src/graphql/custom-mutations';



const EditExperience = ({ navigation, route }) => {
  const { user } = useContext(userContext);
  const { location } = useContext(locationContext);

  const blankExperience = {
    location: { lat: location.coords.latitude, lon: location.coords.longitude },
    ownerID: user.profile.id,
    name: "",
    tags: [],
    story: "",
  }
  
  useEffect(() => {
    getPermissions();
    fetchImages();
  }, []);

  const [formState, setFormState] = useState(route.params && route.params.experience ? route.params.experience : blankExperience);
  const [image, setImage] = useState(placeholderImage);
  const [isNewImage, setIsNewImage] = useState(false);
  const [existingExperience, setExistingExperience] = useState(route.params && route.params.experience ? true : false);
  
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
  
  async function pickImage() {
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
    if (!formState.pictureKey) {
      return
    }
    await Storage.get(formState.pictureKey)
    .then((img) => {
      setImage(img);
    })
    .catch(err => {
      console.log("Error fetching images ", err);
    })
  }

  function getExperienceFromForm() {
    return {
      ...formState,
    }
  }

  async function updateExperienceCallback(addedFields) {
    try {
      const experience = {...getExperienceFromForm(), ...addedFields};
      delete experience.createdAt;
      delete experience.updatedAt;
      const experienceData = await API.graphql(graphqlOperation(updateExperience, { input: experience }))
      console.log("Updated experience: ", experienceData);
      setFormState(experienceData.data.updateExperience);
      navigation.navigate("Feed");
      return experienceData.data.updateExperience;
    } catch(err) {
      console.log("Error updating experience: ", err);
    }
  }

  async function createExperienceCallback(addedFields) {
    try {
      const experience = {...getExperienceFromForm(), ...addedFields};
      const experienceData = await API.graphql(graphqlOperation(createExperience, { input: experience }))
      console.log("Created experience: ", experienceData);
      setExistingExperience(true);
      setFormState(experienceData.data.createExperience);
      navigation.navigate("Feed");
      return experienceData.data.createExperience;
    } catch(err) {
      console.log("Error creating experience: ", err);
    }
  }

  async function uploadImage(imageID) {
    if (isNewImage) {
      try {
        const access = { level: "public" };
        const response = await fetch(image);
        const blob = await response.blob();
        const succ = await Storage.put(imageID, blob, access)
        
        console.log("Successfully uploaded image: ", succ);
        setInput("pictureKey", succ.key);
        setIsNewImage(false);
        fetchImages();
        return succ.key;
      } catch (err) {
        setImage(null);
        console.log("Error fetching or uploading image: ", err);
      }
    } else {
      console.log("Error: no new image specified.");
    }
  }

  async function submitExperience() {
    if (existingExperience) {
      const pictureKey = await uploadImage(formState.id.toString())
      updateExperienceCallback({
        pictureKey: pictureKey,
      });
    } else {
      const experience = await createExperienceCallback();
      const pictureKey = await uploadImage(experience.id.toString());
      updateExperienceCallback({
        ...experience,
        pictureKey: pictureKey,
      });
    }
  }

  async function submitAndUpdateExperience() {
    await submitExperience()
    .catch((err) => {
      console.log("Error submitting and updating profile\n", err);
    });
  }

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(formState, null, 2)}</Text> */}
      <Block center>
        <Text h3 style={{ padding: 10 }}>Edit experience</Text>
        <Card borderless style={styles.editExperienceCard}>
          <TouchableOpacity onPress={pickImage}>
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
            onChangeText={val => setInput('story', val)}
            value={formState.story}
            placeholder="Story"
            />
          <Input
            onChangeText={val => setInput('tags', val.split(","))}
            value={formState.tags.join()}
            placeholder="Tags"
          />
        </Card>
        <Block style={{
          padding: 20,
        }}>
          <Button onPress={submitAndUpdateExperience}>
            Save
          </Button>
        </Block>
      </Block>
    </View>
  )

}

export default EditExperience;