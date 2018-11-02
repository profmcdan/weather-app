import React from "react";
import {
	StyleSheet,
	Text,
	Platform,
	View,
	KeyboardAvoidingView,
	ImageBackground,
	ActivityIndicator,
	StatusBar
} from "react-native";

import { getLocationId, getWeather } from "./utils/api";
import getImageForWeather from "./utils//getImageForWeather";
import getIconForWaether from "./utils/getIconForWeather";

import SearchInput from "./components/SearchInput";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: "",
			loading: false,
			error: false,
			temperature: 0,
			weather: "",
			backImage: ""
		};
		this.handleUpdateLocation = this.handleUpdateLocation.bind(this);
	}

	handleUpdateLocation = (city) => {
		if (!city) return;

		this.setState({ loading: true }, async () => {
			try {
				const locationId = await getLocationId(city);
				const { location, weather, temperature } = await getWeather(locationId);

				this.setState({
					location,
					loading: false,
					error: false,
					temperature,
					weather,
					backImage: getImageForWeather(weather)
				});
			} catch (e) {
				this.setState({
					loading: false,
					error: true
				});
			}
		});

		this.setState({
			location: city
		});
	};

	componentDidMount() {
		this.handleUpdateLocation("Lagos");
		this.setState({
			backImage: getImageForWeather("Clear")
		});
	}

	render() {
		const { location, error, loading, weather, temperature, backImage } = this.state;
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<StatusBar barStyle="light-content" />
				<ImageBackground source={getImageForWeather(weather)} style={styles.imageContainer} imageStyle={styles.image}>
					<View style={styles.detailsContainer}>
						<ActivityIndicator animating={loading} color="white" size="large" />
						{!loading && (
							<View>
								{error && (
									<Text style={[ styles.smalltext, styles.textStyle ]}>
										Could not load weather, please try a different city.
									</Text>
								)}
							</View>
						)}
						{!error && (
							<View>
								<Text style={[ styles.largeText, styles.textStyle ]}>{location}</Text>
								<Text style={[ styles.smalltext, styles.textStyle ]}>{weather}</Text>
								<Text style={[ styles.largeText, styles.textStyle ]}>{`${Math.round(temperature)}℃`} </Text>
							</View>
						)}

						<SearchInput
							placeholder="Search for any city"
							textInputStyle={styles.textInput}
							onSubmit={this.handleUpdateLocation}
						/>
					</View>
				</ImageBackground>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#34495E",
		alignItems: "center",
		justifyContent: "center"
	},
	detailsContainer: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.2)",
		paddingHorizontal: 20
	},
	textStyle: {
		textAlign: "center",
		fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
		color: "white"
	},
	largeText: {
		fontSize: 44
	},
	smalltext: {
		fontSize: 18
	},
	textInput: {
		backgroundColor: "#666",
		color: "white",
		height: 40,
		width: 300,
		marginTop: 20,
		marginHorizontal: 20,
		paddingHorizontal: 10,
		alignSelf: "center"
	},
	imageContainer: {
		flex: 1
	},
	image: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "cover"
	}
});
