import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomIcons from './CustomIcons';
import {BORDERRADIUS, SPACING} from '../theme/theme';

type Props = {
  name: string;
  color: string;
  size: number;
  bgColor: string;
};

const BGIcon: React.FC<Props> = ({name, color, size, bgColor}) => {
  return (
    <View style={[styles.bgIcon, {backgroundColor: bgColor}]}>
      <CustomIcons name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  bgIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_30,
    width: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_8,
  },
});
