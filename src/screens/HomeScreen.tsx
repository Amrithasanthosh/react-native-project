import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {filter, uniqBy} from 'lodash';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import CustomIcons from '../components/CustomIcons';
import CoffeeCard from '../components/CoffeeCard';

const HomeScreen = ({navigation}: any) => {
  const getCategoriesFromData = (data: any) => {
    let temp = 'All';
    const dataName = uniqBy(data, 'name')?.map((item: any) => item?.name);
    return [temp, ...dataName];
  };

  const getCoffeeList = (category: string, data: any) => {
    if (category === 'All') return data;
    else return filter(data, item => item.name == category);
  };

  const {coffeeList, beanList, addToCart} = useStore((state: any) => state);

  const categories = getCategoriesFromData(coffeeList);

  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex?.category, coffeeList),
  );

  const tabBarHeight = useBottomTabBarHeight();
  const listRef: any = useRef<FlatList>();

  const searchCoffee = (searchItem: string) => {
    if (searchItem !== '') {
      setSearchText(searchItem);
      setSortedCoffee([
        ...filter(coffeeList, item =>
          item.name?.toLowerCase().includes(searchItem?.toLowerCase()),
        ),
      ]);
      setCategoryIndex({index: 0, category: categories[0]});
      listRef?.current?.scrollToOffset({animated: true, offset: 0});
    }
  };

  const resetSearchCoffee = () => {
    setSortedCoffee([...coffeeList]);
    setCategoryIndex({index: 0, category: categories[0]});
    setSearchText('');
    listRef?.current?.scrollToOffset({animated: true, offset: 0});
  };

  const addToCartHandle = (item: any) => {
    addToCart(item);
    ToastAndroid.showWithGravity(
      `${item?.name} Added To Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <HeaderBar />
        <Text style={styles.title}>{'Find the best\nCoffee for you'}</Text>
        <View style={styles.searchBox}>
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <CustomIcons
              name="search"
              color={
                searchText?.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
              size={FONTSIZE.size_18}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchCoffee(text);
            }}
            placeholder="Find Your Coffee..."
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInput}
          />
          {searchText?.length > 0 && (
            <TouchableOpacity onPress={() => resetSearchCoffee()}>
              <CustomIcons
                name="close"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScrollView}>
          {categories?.map((category, index) => (
            <View key={category} style={styles.categoryScrollViewContainer}>
              <TouchableOpacity
                onPress={() => {
                  setCategoryIndex({category: category, index: index});
                  setSortedCoffee([...getCoffeeList(category, coffeeList)]);
                }}
                style={styles.categoryItem}>
                <Text
                  style={[
                    styles.categoryText,
                    categoryIndex?.index === index
                      ? styles.activeCategoryText
                      : {},
                  ]}>
                  {category}
                </Text>
                {categoryIndex?.index === index && (
                  <View style={styles.activeCategory} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          keyExtractor={item => item?.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Details', {
                  type: item.type,
                  id: item.id,
                  index: item.index,
                });
              }}>
              <CoffeeCard
                {...item}
                buttonPressHandle={() => addToCartHandle(item)}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.coffeeFlatList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.categoryText}>No Coffee Available</Text>
            </View>
          }
        />
        <Text style={styles.beansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beanList}
          keyExtractor={item => item?.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Details', {
                  type: item.type,
                  id: item.id,
                  index: item.index,
                });
              }}>
              <CoffeeCard
                {...item}
                buttonPressHandle={() => addToCartHandle(item)}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={[
            styles.coffeeFlatList,
            {marginBottom: tabBarHeight},
          ]}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  contentContainer: {
    flexGrow: 1,
  },
  title: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    paddingLeft: SPACING.space_30,
  },
  searchBox: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
    margin: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    flex: 1,
  },
  searchIcon: {
    marginHorizontal: SPACING.space_20,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryItem: {alignItems: 'center'},
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: SPACING.space_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: SPACING.space_4,
    fontSize: SPACING.space_16,
    color: COLORS.primaryLightGreyHex,
  },
  activeCategoryText: {
    color: COLORS.primaryOrangeHex,
  },
  coffeeFlatList: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  beansTitle: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    marginTop: SPACING.space_20,
    marginLeft: SPACING.space_30,
  },
  emptyContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
});

export default HomeScreen;
