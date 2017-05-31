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
	Modal,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	View,
	ListView,
	Dimensions,
	Image,
} from 'react-native';

import {
	Icon
} from 'react-native-elements';

import sortData from './sortdata.js'

import stylevar from '../style/stylevar.js';
const styles = StyleSheet.create({
	header: {
		height: stylevar.height.navbarHeight,
		left: 0,
		right: 0,
		borderBottomWidth: 1,
		borderColor: stylevar.color.lightGreyColor,
		justifyContent: 'center',
        alignItems: 'center',
	},
	closeButton:{
		position:'absolute',
		top:stylevar.padding.largePadding,
		left:0,
		paddingLeft:stylevar.padding.layoutPadding,
		paddingTop:stylevar.padding.largePadding,
		paddingRight:stylevar.padding.layoutPadding,
		paddingBottom:stylevar.padding.layoutPadding,

	},
	headerText:{
		paddingTop:stylevar.padding.largePadding,
		fontSize:stylevar.fontSize.headerSize,
		color:stylevar.color.blackColor,
	},
	listContainer:{
		paddingLeft:1,
		paddingRight:1,
		paddingBottom:stylevar.height.navbarHeight,
		flexWrap:'wrap',
		justifyContent:'space-around',
		flexDirection:'row',
		width:Dimensions.get('window').width,
	},
	listItem:{
	    //width:Dimensions.get('window').width / 2,
	   width:Dimensions.get('window').width / 2 - 1,
		height:Dimensions.get('window').width / 2 - 1,
		borderColor:'#fff',
		borderTopWidth:1,
		borderRightWidth:1,
		borderBottomWidth:1,
		borderLeftWidth:1,
		
	},
	listItemImg:{
		width:'100%',
		height:'100%',
	
	},
	listItemBackground:{
		backgroundColor:'rgba(0,0,0,0.3)',
	width:'100%',
		height:'100%',
			justifyContent:'center',
		alignItems:'center',

	},
	listItemTitle:{
		marginTop:stylevar.padding.smallPadding,
        color:'#fff',
        fontSize:stylevar.fontSize.commonSize,
       // backgroundColor:'rgba(0,0,0,0.3)',
	}

})

export default class Sort extends Component {

	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			modalVisible:false,
		    dataSource: ds.cloneWithRows(sortData),
		};
	   this.closeHandle = this.closeHandle.bind(this);
	}

	componentDidMount() {
		console.log(this.props.modalVisible);
		this.setState({
			modalVisible:this.props.modalVisible,
		})
	}
	shouldComponentUpdate(nextProps, nextState) {
	      return true;
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.modalVisible){
			this.setState({
			modalVisible :nextProps.modalVisible 
			});
		}
	}
	closeHandle(){
		//console.log(this.props)
		this.props.sortHide()
		console.log(this.props.modalVisible);
		this.setState({
			modalVisible :false,
		})

	}

	_renderRow(rowData){
		return (
		    <View style={styles.listItem}>
			    <Image style={styles.listItemImg} source={rowData.img}>
			      <View style={styles.listItemBackground}>
			      <Icon
                    name='tonality' size={44} color={"#fff"}/>
				    <Text style={styles.listItemTitle}>{rowData.title}</Text>
				   </View>
				</Image>
			</View>
			)
	}
	render() {
		return (
			<Modal animationType = {"slide"}
				transparent = {false}
				visible ={this.state.modalVisible} >

				<View style={styles.header}>
				<TouchableOpacity
				 style={styles.closeButton}
				 onPress={this.closeHandle} 
				 >
				   <Icon 
				
				   name="close"
				   size={24}
				   color={stylevar.color.blackColor}
				    />
				  </TouchableOpacity>
					<Text style={styles.headerText}>ALL SORT</Text>
				</View>
			 <View style={styles.container}>
	           <ListView 
	              contentContainerStyle={styles.listContainer}
			      dataSource={this.state.dataSource}
			      renderRow={this._renderRow.bind(this)}
			    />
	         </View> 
	        </Modal>
		);
	}
}

