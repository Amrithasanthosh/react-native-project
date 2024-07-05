import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcons from './CustomIcons';
import BGIcon from './BGIcon';

type CoffeeCardProps = {
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
};

const cardWidth = Dimensions.get('window').width * 0.32;

const CoffeeCard: React.FC<CoffeeCardProps> = ({
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
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.cardGradientContainer}>
      <ImageBackground
        source={imagelink_square}
        style={styles.bgCardImg}
        resizeMode="cover">
        <View style={styles.cardRatingContainer}>
          <CustomIcons
            name="star"
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_18}
          />
          <Text style={styles.ratingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardSubTitle}>{special_ingredient}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPriceCurrency}>
          $<Text style={styles.cardPrice}>{prices[2]?.price}</Text>
        </Text>
        <TouchableOpacity onPress={buttonPressHandle}>
          <BGIcon
            name="add"
            bgColor={COLORS.primaryOrangeHex}
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  cardGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  bgCardImg: {
    width: cardWidth,
    height: cardWidth,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  cardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    lineHeight: 22,
    color: COLORS.primaryWhiteHex,
  },
  cardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  cardSubTitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  cardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  cardPrice: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_light,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
});
