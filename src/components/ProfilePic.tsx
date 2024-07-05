import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';

const ProfilePic = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require('../assets/app_images/avatar.png')}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
  },
  image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});
