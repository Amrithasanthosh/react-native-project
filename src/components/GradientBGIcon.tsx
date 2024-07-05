import {StyleSheet, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcons from './CustomIcons';
import {COLORS, SPACING} from '../theme/theme';

type GradientBGIconProps = {
  name: string;
  color: string;
  size: number;
};

const GradientBGIcon: React.FC<GradientBGIconProps> = ({name, color, size}) => {
  return (
    <View style={styles.gradientContainer}>
      <LinearGradient
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
        <CustomIcons name={name} color={color} size={size} />
      </LinearGradient>
    </View>
  );
};

export default GradientBGIcon;

const styles = StyleSheet.create({
  gradientContainer: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});
