import React, { Component, Fragment } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Deck from "./Deck";
import { connect } from "react-redux";
import TouchButton from "./TouchButton";
import { gray, darkGray, red } from "../utils/colors";
import { PropTypes } from "prop-types";
import { handleRemoveDeck } from "../actions";


class DeckDetails extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		deck: PropTypes.object,
		loadingBar: PropTypes.object,
		handleRemoveDeck: PropTypes.func
	};
	
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;

		return {
			title
		};
	};

	
	shouldComponentUpdate(nextProps) {
		return nextProps.deck !== undefined;
	}

	
	handleRemoveDeck = (title) => {
		this.props.handleRemoveDeck(title);
		this.props.navigation.navigate("DeckList");
	};
	render() {
		const { deck, title, navigation, loadingBar } = this.props;
		return (
			<Fragment>
				{loadingBar.default === 1 ? (
					<ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
				) : (
					<View style={styles.container}>
						<Deck title={deck.title} questionCount={deck.questions.length} />
						<TouchButton
							btnStyle={{ backgroundColor: darkGray, borderColor: gray }}
							onPress={() => navigation.navigate("AddCard", { title })}>
							<Text txtStyle={{ color: gray }}>Add Card</Text>
						</TouchButton>
						<TouchButton onPress={() => navigation.navigate("Quiz", { title })}>
							<Text>Start Quiz</Text>
						</TouchButton>
						<TouchButton
							btnStyle={{ backgroundColor: red }}
							onPress={() => this.handleRemoveDeck(title, deck)}>
							<Text>Delete Deck</Text>
						</TouchButton>
					</View>
				)}
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});


function mapStateToProps({ decks, loadingBar }, { navigation }) {
	const { title } = navigation.state.params;
	return {
		title,
		deck: decks[title],
		loadingBar
	};
}
export default connect(mapStateToProps, { handleRemoveDeck })(DeckDetails);
