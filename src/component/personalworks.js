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
	Dimensions,
	ScrollView,
	Image,
	Text,
	View,
	ListView,
	TouchableHighlight,
} from 'react-native';
import stylevar from '../style/stylevar.js';
import Data from '../home/homedate.js';

export default class PersonalWorks extends Component {

	constructor() {
		super();
		this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            //sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
         
		this.state = {
		    dataSource: this._dataSource.cloneWithRows(Data),
		};

	 
	}
  componentDidMount(){
  	let data = [];
  	for (let i = 0; i < Data.length - 1; i++) {
  		data.push({
            text:Data[i].text,
            img:Data[i].img,
            imgHeight:Data[i].imgHeight,
            imgWidth:Data[i].imgWidth,
            title:Data[i].title,
            user:Data[i].user,
            key:i,
  		})
  	};
  	this.setState({
  		dataSource:this._dataSource.cloneWithRows(data),
  	});
  }

	_pressRow(rowData,showColor){
          this.props.navigation.navigate('Detail',{ name:rowData.title,imgHeight:rowData.imgHeight, imgWidth:rowData.imgWidth, titleImg:rowData.img,user:rowData.user,showColor:showColor,});
        
    }
	_renderRow(rowData){
	 let colorNum = rowData.key % 6; 
     let showColor= '';
        switch (colorNum ) {
            case 0:
               showColor = "#FF2D55";
                break;
            case 1:
                showColor = "#FF9500";
                break;
            case 2:
               showColor = "#4CD964";
                break;
            case 3:
                showColor = "#5AC8FA";
                break;
            case 4:
                showColor = "#007AFF";
                break;
             case 5:
                showColor = "#5856D6";
                break;
    }
     

		return (
          <TouchableHighlight onPress={() => this._pressRow(rowData,showColor) }>
		    <View style={[styles.listItem,{backgroundColor:showColor}]} >
			    <Image style={styles.listItemImg} source={rowData.img}>
				</Image>
			</View>
		</TouchableHighlight>
			)
	}


	render() {
		return (
		<ListView 
	              contentContainerStyle={styles.listContainer}
			      dataSource={this.state.dataSource}
			      renderRow={this._renderRow.bind(this)}
		 />
		);
	}
}

const styles = StyleSheet.create({
	listContainer:{
		paddingTop:2,
		paddingLeft:2,
		paddingRight:2,
		paddingBottom:stylevar.height.navbarHeight,
		flexWrap:'wrap',
		justifyContent:'flex-start',
		flexDirection:'row',
		width:Dimensions.get('window').width,},
    listItem:{
	    //width:Dimensions.get('window').width / 2,
	    borderTopWidth:2,
	    borderRightWidth:2,
	    borderBottomWidth:2,
	    borderLeftWidth:2,
	    width:Dimensions.get('window').width / 2 - 2,
		height:Dimensions.get('window').width / 2 - 2,
		borderColor:'#fff',
		
		
	},
	listItemImg:{
		width:'100%',
		height:'100%',
	
	},
})








