/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	WebView,
} from 'react-native';
import stylevar from './style/stylevar.js';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingTop:20,

	}
})

export default class Image extends Component {

	constructor() {
		super();

	}


	render() {
		return (
		<View style={styles.container}>
     	  <Text>Image</Text>
        </View>
		);
	}
}