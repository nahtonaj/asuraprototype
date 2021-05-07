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
  editProfilePicture: {
    padding: 10,
    height: 250,
    // width: 200,
  },
})

export default styles;