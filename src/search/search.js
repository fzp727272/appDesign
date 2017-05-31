import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

import {
	Icon
} from 'react-native-elements'


import Recent from './Recent/recent.js';
import People from './People/People.js';
import SearchHeaderWithTab from './SearchHeaderWithTab.js';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import stylevar from '../style/stylevar.js';


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible:false,};
    this.sortShow = this.sortShow.bind(this);
    this.sortHide = this.sortHide.bind(this);
  }
  componentDidMount(){
  	console.log(this.props.navigation)
  }
   
   sortShow(){
       this.setState({modalVisible:true,})
   }
  sortHide(){
  	this.setState({modalVisible:false,})
  }
	render() {
		return (
			　
		        <ScrollableTabView
		        style={{overflow:'hidden'}}
		          renderTabBar={() => 
		          	<SearchHeaderWithTab
		          style={{height:stylevar.height.navbarHeight,paddingTop:stylevar.padding.smallPadding,}}
		          tabsContainerStyle={{paddingLeft:80,paddingRight:80,}}
		          inactiveTextColor={stylevar.color.darkGreyColor} 
		          activeTextColor={stylevar.color.blackColor}
		          tabStyle={{height:stylevar.height.navbarHeight,}} 
		          textStyle={{fontSize:18,}} />
		       }>

		        
			       <Recent tabLabel="Recent" contentContainerStyle={styles.tabView} navigation={this.props.navigation}/>
			       <People tabLabel="People" contentContainerStyle={styles.tabView} navigation={this.props.navigation}/>
		        </ScrollableTabView>
     
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 0,
	},
	tabView: {
		paddingTop: stylevar.padding.middlePadding,
		paddingLeft: stylevar.padding.layoutPadding,
		paddingRight: stylevar.padding.layoutPadding,
		backgroundColor: 'rgba(0,0,0,0)',
	},
	menuLeft: {
		position: 'absolute',
		top:stylevar.padding.smallPadding,
		left:0,
		paddingTop: stylevar.padding.layoutPadding,
		paddingBottom: stylevar.padding.layoutPadding,
		flexDirection: 'row',
		paddingLeft: stylevar.padding.layoutPadding ,
		paddingRight: stylevar.padding.layoutPadding,
	},
	menuRight: {
		position: 'absolute',
		top:stylevar.padding.smallPadding,
		right:0,
		paddingTop: stylevar.padding.layoutPadding,
		paddingBottom: stylevar.padding.layoutPadding,
		flexDirection: 'row',
		paddingLeft: stylevar.padding.layoutPadding ,
		paddingRight: stylevar.padding.layoutPadding,
	},
	menuText: {
		paddingTop: stylevar.padding.smallPadding,
		paddingLeft: stylevar.padding.smallPadding,
	},

});