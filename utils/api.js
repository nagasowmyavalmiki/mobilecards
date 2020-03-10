import { AsyncStorage } from "react-native";
import { decks } from "./_DATA";

const DECKS_STORAGE_KEY = "MOBILE_FLASHCARDS:deck";

export async function getDecks() {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
			return data === null
				? AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
				: JSON.parse(data);
		});
	} catch (error) {
		console.log(error);
	}
}


export function getDeck(id) {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => JSON.parse(data)[id]);
	} catch (error) {
		console.log(error);
	}
}


export function saveDeckTitle(title) {
	try {
		return AsyncStorage.mergeItem(
			DECKS_STORAGE_KEY,
			JSON.stringify({
				[title]: {
					title,
					questions: []
				}
			})
		);
	} catch (error) {
		console.log(error);
	}
}


export function saveCardToDeck(title, card) {
	try {
		return getDeck(title).then((deck) => {
			AsyncStorage.mergeItem(
				DECKS_STORAGE_KEY,
				JSON.stringify({
					[title]: {
						questions: [
							...deck.questions,
							{ ...card }
						]
					}
				})
			);
		});
	} catch (err) {
		console.log(err);
	}
}


export function removeDeckAS(title) {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
			const data = JSON.parse(results);
			data[title] = undefined;
			delete data[title];
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
		});
	} catch (error) {
		console.log(error);
	}
}
