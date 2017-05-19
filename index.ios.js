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

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import stylevar from './src/style/stylevar.js';
import Home from './src/home/home.js';
import Search from './src/search.js';
import Like from './src/like.js';
import User from './src/user.js';

const styles = StyleSheet.create({
  tabContainer:{
    paddingTop:3,
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

export default class myapp extends Component {

  constructor() {
    super();
    this.state = {
      selectedTab: 'Home',
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
  alert(11)
}
  render() {
    const {
      selectedTab
    } = this.state
    return (
      <Tabs >
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
            <Home />
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
            <Search />
          </Tab>
         <Tab tabStyle={{paddingTop:10,}} style={{paddingBottom:-10}}
            renderIcon={() => <Icon containerStyle={{paddingTop:10}} color={stylevar.color.redColor}  name='camera-alt' 
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
            <Like />
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
            <User />
          </Tab>

       </Tabs>
    );
  }
}



AppRegistry.registerComponent('myapp', () => myapp);