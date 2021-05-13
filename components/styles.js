import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5, 
    padding: 12, 
    marginBottom: 5,
    alignSelf: 'center',
  },
  feedContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    // flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 35,
  },
  friendProfilePicture: {
    width: 200,
    height: 200,
  },
  profilePicture: {
    width: 200,
    height: 200,
  },
  editProfileCard: {
    padding: 20,
    height: 420,
    // width: 220,
  },
  editExperienceCard: {
    padding: 20,
    height: 500,
  },
  editProfilePicture: {
    padding: 10,
    height: 250,
    // width: 200,
  },
  card: {
    padding: 10,
    height: 280,
    width: 200,
  },
  tabBarStyle: {
    backgroundColor: '#AAAAAA',
  },
})

export const placeholderImage="https://rnamplify4c2e669ec1414624a53b72b673ea7c2c234312-demo.s3.amazonaws.com/public/placeholder.jpg"
// export const placeholderImage=require('../assets/placeholder.jpg');

export default styles;
