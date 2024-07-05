import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';
import ImageBg from '../components/ImageBg';
import {useStore} from '../store/store';

const DetailsScreen = ({navigation, route}: any) => {
  const item = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.coffeeList : state.beanList,
  )[route.params.index];

  const {
    deleteFromFavoriteList,
    addToFavoriteList,
    favoritesList,
    favoriteListHandle,
    coffeeList,
    beansList,
  } = useStore((state: any) => state);

  const backHandler = () => {
    navigation.pop();
  };

  const toggleFavorite = (favourite: boolean, type: string, id: string) => {
    favourite
      ? favoriteListHandle(id, 'remove', type)
      : favoriteListHandle(id, 'add', type);
  };

  return (
    <View style={styles.detailsContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <ImageBg
          enableBackHandler={true}
          backHandler={backHandler}
          toggleFavorite={toggleFavorite}
          {...item}
        />
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
