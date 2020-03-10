import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation-tabs";
import DeckList from "../DeckList";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { white, purple } from "../../utils/colors";
import { createAppContainer } from "react-navigation";
import AddDeck from "./../AddDeck";


const tabObject = {
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: "Decks",
			tabBarIcon: ({ tintColor }) => (
				<Ionicons name="ios-bookmarks" size={30} color={tintColor} />
			)
		}
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: "Add Deck",
			tabBarIcon: ({ tintColor }) => (
				<FontAwesome name="plus-square" size={30} color={tintColor} />
			)
		}
	}
};
const options = {
	navigationOptions: {
		headerShown: false
	},
	tabBarOptions: {
		activeTintColor: Platform.OS === "ios" ? purple : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === "ios" ? white : purple,
			shadowColor: "rgba(0, 0, 0, 0.24)",
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1,
			showIcon: true,
			padding: 10
		}
	}
};

const Tabs = createAppContainer(
	Platform.OS === "ios"
		? createBottomTabNavigator(tabObject, options)
		: createMaterialTopTabNavigator(tabObject, options)
);

export default Tabs;
