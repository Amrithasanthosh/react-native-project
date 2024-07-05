import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

type HeaderProps = {
  title?: string;
};

const HeaderBar: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryGreyHex}
        size={SPACING.space_30}
      />
      <Text style={styles.headerTitle}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
  },
});
