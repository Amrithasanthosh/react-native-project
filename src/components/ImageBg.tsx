import {
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';
import CustomIcons from './CustomIcons';
import GradientBGIcon from './GradientBGIcon';

type Props = {
  enableBackHandler: boolean;
  average_rating: number;
  buttonPressHandle: any;
  description: string;
  favourite: boolean;
  id: string;
  imagelink_portrait: ImageProps;
  imagelink_square: ImageProps;
  index: number;
  ingredients: string;
  name: string;
  prices: {size: string; price: string; currency: string}[];
  ratings_count: string;
  roasted: string;
  special_ingredient: string;
  type: string;
  backHandler: any;
  toggleFavorite: any;
};

const ImageBg: React.FC<Props> = ({
  average_rating,
  buttonPressHandle,
  description,
  favourite,
  id,
  imagelink_portrait,
  imagelink_square,
  index,
  ingredients,
  name,
  prices,
  ratings_count,
  roasted,
  special_ingredient,
  type,
  enableBackHandler,
  backHandler,
  toggleFavorite,
}) => {
  return (
    <View>
      <ImageBackground source={imagelink_portrait} style={styles.imgBg}>
        {enableBackHandler ? (
          <View style={styles.imgHeaderWithBlack}>
            <TouchableOpacity onPress={backHandler}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={SPACING.space_16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleFavorite(favourite, type, id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={SPACING.space_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imgHeaderWithoutBlack}>
            <TouchableOpacity
              onPress={() => {
                toggleFavorite(favourite, type, id);
              }}>
              <GradientBGIcon
                name="like"
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={SPACING.space_16}
              />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default ImageBg;

const styles = StyleSheet.create({
  imgBg: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  imgHeaderWithBlack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgHeaderWithoutBlack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
