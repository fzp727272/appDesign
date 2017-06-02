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
  ScrollView,
  Text,
  View,
  WebView,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import {
  Icon
} from 'react-native-elements';

import UserHeader from '../../component/userheader.js'
import stylevar from '../../style/stylevar.js';
const styles = StyleSheet.create({
container: {
      
       // height: stylevar.home.listHeight,
       //paddingLeft:stylevar.padding.layoutPadding,
       // paddingRight:stylevar.padding.layoutPadding,
        flexDirection: 'row',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        //borderBottomColor: '#ccc',
        overflow: 'hidden',
    },
    listImg: {
        width: Dimensions.get('window').width ,
       // height: stylevar.home.listHeight,
        //  height:stylevar.home.listHeight,
        //alignItems: 'stretch',
        //justifyContent: 'center',
    },
    backgroundImg: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: '100%',
        height: '100%',
    },
    ListTitle: {
        flexDirection: 'row',
    },
     ListTitleText:{
         fontSize:stylevar.fontSize.titleSize,
         color: stylevar.color.mainColor,
        shadowColor: stylevar.color.blackColor,
        shadowOffset: {
            height: 0,
            width: 0
        },
        shadowRadius: 8,
        shadowOpacity: 0.3,
     },
    ListText: {
        marginTop:5,
        fontSize:stylevar.fontSize.commonSize,
        color: stylevar.color.mainColor,
        shadowColor: stylevar.color.blackColor,
        shadowOffset: {
            height: 0,
            width: 0
        },
        shadowRadius: 8,
        shadowOpacity: 0.3,
    },
    imgtContainer:{
      flexDirection:'row',
      width:Dimensions.get('window').width ,
    },
    userlist:{
      paddingBottom:stylevar.padding.smallPadding,
      paddingTop:stylevar.padding.largePadding,
      //marginTop:stylevar.padding.largePadding,
       //borderBottomWidth:1,
      // borderColor:stylevar.color.lightGreyColor,

    },
    divideLine:{
      backgroundColor:stylevar.color.lightGreyColor,
      width:Dimensions.get('window').width,
      height:1,
     // marginLeft:stylevar.padding.layoutPadding,
      marginTop:stylevar.padding.middlePadding,
     // marginBottom:stylevar.padding.largePadding,
    }

})

// item.imgHeight / item.imgWidth * imgWidt
export default class PersonList extends Component {

  constructor() {
    super();

  }
  renderImg(item,i){
    let imgWidth =  (Dimensions.get('window').width ) / 4;
    return(

      <View style={{justifyContent:'flex-end',}}>
        <Image source={item.img} style={{width:imgWidth ,height:imgWidth * 1.25 ,backgroundColor:this.props.showColor }}/>
      </View>
      )
  }

  render() {
    return (
           <View key={this.props.rowData.key} 
         onPress={() => this.props._pressRow(this.props.rowData,this.props.showColor)} >
          <View style={styles.userlist}>
            <UserHeader rowData={this.props.rowData}/>
            </View>
            <View style={styles.container}>
                <View style={styles.imgtContainer}>
                   {
                     this.props.rowData.imgs.map((item,i)=>this.renderImg(item,i))
                   }
                </View>
            </View> 
            <View style={styles.divideLine}></View>
           
        </View>
        
    );
  }
}