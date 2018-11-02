import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import PropTypes from "prop-types";

export default class SearchInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
		this.handleChangedText = this.handleChangedText.bind(this);
		this.handleSubmitEditing = this.handleSubmitEditing.bind(this);
	}
	handleChangedText(text) {
		this.setState({ text });
	}

	handleSubmitEditing() {
		const { onSubmit } = this.props;
		const { text } = this.state;
		if (!text) return;

		onSubmit(text);
		this.setState({ text: "" });
	}

	render() {
		const { placeholder } = this.props;
		const { text } = this.state;

		return (
			<TextInput
				autoCorrect={false}
				placeholder={placeholder}
				value={text}
				placeholderTextColor="white"
				clearButtonMode="always"
				style={this.props.textInputStyle}
				underlineColorAndroid="transparent"
				onChangeText={this.handleChangedText}
				onSubmitEditing={this.handleSubmitEditing}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 40,
		marginTop: 20,
		backgroundColor: "#666",
		marginHorizontal: 40,
		paddingHorizontal: 10,
		borderRadius: 5
	}
});

SearchInput.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	placeholder: PropTypes.string
};

SearchInput.defaultProps = {
	placeholder: ""
};
