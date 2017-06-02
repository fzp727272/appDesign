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
  Image,
  Dimensions,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import stylevar from '../style/stylevar.js';

import {Icon,  Button} from 'react-native-elements'
const styles = StyleSheet.create({
  listHeader: {
        width: Dimensions.get('window').width,
        paddingLeft: stylevar.padding.layoutPadding,
        paddingBottom: stylevar.padding.middlePadding,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    userImg: {
        paddingLeft: 20,
        width: 40,
        height: 40,
        borderRadius: 20,

    },
     ListNote: {
        marginTop: stylevar.padding.smallPadding,
        flexDirection: 'row',
    },
      ListTitleText: {
        fontSize: stylevar.fontSize.noteSize,
        color: stylevar.color.blackColor,
        marginTop: 2,
    },
    ListText: {

        fontSize: stylevar.fontSize.commonSize,
        color: stylevar.color.blackColor,
    },
    ListNoteText: {
        fontSize: stylevar.fontSize.commonSize,
        fontWeight: 'bold',
        color: stylevar.color.darkGreyColor,
        paddingRight: stylevar.padding.smallPadding,
    },
    ListNoteIcon: {},
    ListButton: {
        flexDirection: 'row',
        paddingTop:stylevar.padding.smallPadding,
        paddingRight:stylevar.padding.largePadding,
        paddingBottom:stylevar.padding.smallPadding,
        paddingLeft:stylevar.padding.largePadding,
        position: 'absolute',
        right: stylevar.padding.layoutPadding,
        top: 6,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: stylevar.color.blackColor,
        borderRadius:stylevar.borderRadius.commonRadius,
    },
    ListButtonText: {
        marginTop:2,
        fontSize: stylevar.fontSize.commonSize,

    },
})

export default class UserHeader extends Component {

  constructor() {
    super();
    this.state ={
      toggle:{backgroundColor:'#fff',
            textColor:stylevar.color.blackColor,}
    }

  }
 
  toggleButton(){
    if (this.state.toggle.backgroundColor === '#fff') {
      this.setState({
        toggle:{backgroundColor:stylevar.color.blackColor,
            textColor:'#fff',}
      })
    }
    else{
      this.setState({
        toggle:{backgroundColor:'#fff',
            textColor:stylevar.color.blackColor,}
      })
    }
  }

  render() {

    return (
   <View style={styles.listHeader}>
                    <Image  style={styles.userImg} source={require('../img/image3.png')} />
                    <View style={{paddingLeft:stylevar.padding.middlePadding}}>
                        <Text style={styles.ListTitleText}>
                                  {this.props.rowData.user} 
                         </Text>
                         <View style={styles.ListNote}>
                           <Text style={styles.ListNoteText}>363 Follower</Text>
                           


                        </View>
                    </View>
                      <TouchableOpacity style={[styles.ListButton,{backgroundColor:this.state.toggle.backgroundColor}]} onPress={() => this.toggleButton()} >
                        <View style={{flexDirection:'row'}}>
                             <Icon name="add" style={{paddingRight:stylevar.padding.smallPadding}} color={this.state.toggle.textColor} size={18} />
                             <Text style={[styles.ListButtonText,{color:this.state.toggle.textColor}]}>Follow</Text>
                        </View>
                    </TouchableOpacity>
                   
       </View>
    );
  }
}