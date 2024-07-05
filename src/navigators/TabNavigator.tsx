import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import CartScreen from '../screens/CartScreen';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import CustomIcons from '../components/CustomIcons';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={25}
            style={styles.blurViewStyle}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcons
              name="home"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcons
              name="cart"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcons
              name="like"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcons
              name="bell"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  blurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
