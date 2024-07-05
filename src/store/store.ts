import {create} from 'zustand';
import {produce} from 'immer';
import {createJSONStorage, persist} from 'zustand/middleware';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(
  persist(
    (set, get) => ({
      coffeeList: CoffeeData,
      beanList: BeansData,
      cartPrice: 0,
      favoritesList: [],
      cartList: [],
      orderHistory: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.cartList.length; i++) {
              if (state.cartList[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.cartList[i].prices.length; j++) {
                  if (
                    state.cartList[i].prices[j].size == cartItem.prices[0].size
                  ) {
                    size = true;
                    state.cartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.cartList[i].prices.push(cartItem.prices[0]);
                }
                state.cartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.cartList.push(cartItem);
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.cartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.cartList[i].prices.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.cartList[i].prices[j].price) *
                    state.cartList[i].prices[j].quantity;
              }
              state.cartList[i].ItemPrice = tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            state.cartPrice = totalprice.toFixed(2).toString();
          }),
        ),
      favoriteListHandle: (id: string, action: string, type: string) => {
        set(
          produce(state => {
            const list = type === 'Coffee' ? state.coffeeList : state.beanList;

            for (const data of list) {
              if (data.id === id) {
                if (data.favourite) data.favourite = false;
                else {
                  data.favourite = true;
                  if (action === 'add') state.favoritesList.unshift(data);
                  else
                    state.favoritesList = state.favoritesList.filter(
                      (item: any) => item.id !== id,
                    );
                }
              }
            }
          }),
        );
      },

      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.cartList.length; i++) {
              if (state.cartList[i].id == id) {
                for (let j = 0; j < state.cartList[i].prices.length; j++) {
                  if (state.cartList[i].prices[j].size == size) {
                    state.cartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.cartList.length; i++) {
              if (state.cartList[i].id == id) {
                for (let j = 0; j < state.cartList[i].prices.length; j++) {
                  if (state.cartList[i].prices[j].size == size) {
                    if (state.cartList[i].prices.length > 1) {
                      if (state.cartList[i].prices[j].quantity > 1) {
                        state.cartList[i].prices[j].quantity--;
                      } else {
                        state.cartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.cartList[i].prices[j].quantity > 1) {
                        state.cartList[i].prices[j].quantity--;
                      } else {
                        state.cartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),
      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            let temp = state.cartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                cartList: state.cartList,
                cartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                cartList: state.cartList,
                cartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.cartList = [];
          }),
        ),
    }),
    {name: 'coffeeShop', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
