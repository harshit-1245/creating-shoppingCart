import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import HomePage from '../Screen/HomePage'
import CartScreen from '../Screen/CartScreen'
import ConfirmationScreen from '../Screen/ConfirmationScreen'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    // Creating bottom tab
    const BottomTabs = () => {
        return (
       
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={HomePage}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown:false,
                        tabBarIcon: ({ focused }) => (
                            focused ? (
                                <Entypo name="home" size={24} color="black" />
                            ) : (
                                <AntDesign name="home" size={24} color="black" />
                            )
                        ),
                    }}
                />

                <Tab.Screen
                    name='Cart'
                    component={CartScreen}
                    options={{
                        tabBarLabel: "Cart",
                        headerShown:false,
                        tabBarLabelStyle: { color: "#008E97" },
                        tabBarIcon: ({ focused }) => (
                            focused ? (
                                <Entypo name="shopping-cart" size={24} color="black" />
                            ) : (
                                <EvilIcons name="cart" size={24} color="black" />
                            )
                        ),
                    }}
                />
            </Tab.Navigator>
      
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Main' component={BottomTabs} options={{headerShown:false}} />
                <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Confirm" component={ConfirmationScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;