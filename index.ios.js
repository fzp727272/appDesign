/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  Tabs,
  Tab,
  Icon
} from 'react-native-elements'
//const {deviceHeight, deviceWidth} = Dimensions.get('window');
import {
  StackNavigator,NavigationActions
} from 'react-navigation';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import stylevar from './src/style/stylevar.js';
import Home from './src/home/home.js';
import Search from './src/search/search.js';
import Like from './src/like.js';
import User from './src/user.js';

import ListDetail from './src/listdetail.js'

const styles = StyleSheet.create({
  tabContainer:{
    paddingTop:3,
    backgroundColor:'#fff'
  },
  tabTitle: {
  marginTop:0,
 paddingBottom:2,
 fontSize:stylevar.fontSize.minSize,
 fontWeight:'bold',
  },
  tabSelectedTitle: {
    marginTop: -3,
    marginBottom:6
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,

  },
   iconActiveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },




});

export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      selectedTab: 'Home',
      avatarSource: {},
    };
    this.changeTab = this.changeTab.bind(this);
    this.addElement = this.addElement.bind(this);
  }

  changeTab(selectedTab) {
    this.setState({
      selectedTab
    })
  }
addElement(){
  var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
 
/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);
 
  if (response.didCancel) {
    console.log('User cancelled image picker');
  }
  else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    let source = { uri: response.uri };
 
    // You can also display the image using data: 
    // let source = { uri: 'data:image/jpeg;base64,' + response.data }; 
 
    this.setState({
      avatarSource: source
    });
  }
});
}
  render() {
    const {
      selectedTab
    } = this.state
    return (
      <Tabs sceneStyle={{backgroundColor:'#fff'}}>
          <Tab tabStyle={styles.tabContainer}
            titleStyle={styles.tabTitle}
            selectedTitleStyle={styles.tabSelectedTitle}
            selected={selectedTab === 'Home'}
            title={selectedTab === 'Home' ?  null :'Home'}
            renderIcon={() => <Icon containerStyle={styles.iconContainer} color={stylevar.color.iconColor}  name='home' 
            size={28} />} 
            renderSelectedIcon={() => <Icon containerStyle={styles.iconActiveContainer} color={stylevar.color.iconActiveColor} name='home' 
             size={36} />}
            onPress={() => this.changeTab('Home')}>
            <Home navigation={this.props.navigation} />
          </Tab>
           <Tab tabStyle={styles.tabContainer}
            titleStyle={styles.tabTitle}
            selectedTitleStyle={styles.tabSelectedTitle}
            selected={selectedTab === 'Search'}
            title={selectedTab === 'Search' ?  null :'Search'}
            renderIcon={() => <Icon containerStyle={styles.iconContainer} color={stylevar.color.iconColor}  name='visibility' 
            size={28} />}
            renderSelectedIcon={() => <Icon containerStyle={styles.iconActiveContainer} color={stylevar.color.iconActiveColor} name='visibility' j
             size={36} />}
            onPress={() => this.changeTab('Search')}>
            <Search  navigation={this.props.navigation}/>
          </Tab>
         <Tab tabStyle={{paddingTop:10,}} style={{paddingBottom:-10}}
            renderIcon={() => <Icon containerStyle={{paddingTop:10}} color={stylevar.color.iconActiveColor}  name='camera-alt' 
            size={46} />}
            
            onPress={() => this.addElement()}>
           
          </Tab>

           <Tab tabStyle={styles.tabContainer}
            titleStyle={styles.tabTitle}
            selectedTitleStyle={styles.tabSelectedTitle}
            selected={selectedTab === 'Like'}
            title={selectedTab === 'Like' ?  null :'Like'}
            renderIcon={() => <Icon containerStyle={styles.iconContainer} color={stylevar.color.iconColor}  name='favorite' 
            size={25} />}
            renderSelectedIcon={() => <Icon containerStyle={styles.iconActiveContainer} color={stylevar.color.iconActiveColor} name='favorite' j
             size={32} />}
            onPress={() => this.changeTab('Like')}>
            <Like navigation={this.props.navigation} />
          </Tab>

            <Tab tabStyle={styles.tabContainer}
            titleStyle={styles.tabTitle}
            selectedTitleStyle={styles.tabSelectedTitle}
            selected={selectedTab === 'User'}
            title={selectedTab === 'User' ?  null :'User'}
            renderIcon={() => <Icon containerStyle={styles.iconContainer} color={stylevar.color.iconColor}  name='person' 
            size={28} />}
            renderSelectedIcon={() => <Icon containerStyle={styles.iconActiveContainer} color={stylevar.color.iconActiveColor} name='person' 
             size={36} />}
            onPress={() => this.changeTab('User')}>
            <User navigation={this.props.navigation} />
          </Tab>

       </Tabs>
    );
  }
}

const Nav = StackNavigator({
  Main: {screen: Main},
  Detail: {screen: ListDetail},
},{
    headerMode: 'none',

},);



AppRegistry.registerComponent('myapp', () => Nav);