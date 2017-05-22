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
      AlertIOS,
} from 'react-native';

import {
  Icon
} from 'react-native-elements'
import stylevar from './style/stylevar.js';
const styles = StyleSheet.create({
    container: {
       backgroundColor:'#fff',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop:20,

    }
})

export default class Listdetail extends Component {

    constructor() {
        super();
        this.state={
            title:'null'
        }
        this.goBack = this.goBack.bind(this);

    }
componentDidMount(){
 this.setState({
   title:this.props.navigation.state.params.name,
 });
 console.log(this.props)
}
goBack(){
     // AlertIOS.prompt("lkl")
   this.props.navigation.goBack()
}
    render() {
        return (
        <View style={styles.container}>
         <Icon  color={stylevar.color.iconColor}  name='visibility' 
            size={28} onPress={this.goBack} />
          <Text>{this.state.title}</Text>
        </View>
        );
    }
}