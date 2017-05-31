/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  AlertIOS,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {
  Icon
} from 'react-native-elements'

import ParallaxScrollView from 'react-native-parallax-scroll-view';


const window = Dimensions.get('window');
 let bannerHeight ;
import stylevar from './style/stylevar.js';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,

  },
  backIconContainer: {
    position: 'absolute',
    left: 0,
    top: 12,
  },
  backIcon: {
    // backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: stylevar.padding.largePadding,
    paddingLeft:  stylevar.padding.layoutPadding,
    paddingRight:  stylevar.padding.layoutPadding,
    paddingBottom:  stylevar.padding.largePadding,
    borderRadius: 20,
    shadowColor: stylevar.color.blackColor,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowRadius: 10,
    shadowOpacity: .5,
  },
  shareIconContainer: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  shareIcon: {
    //backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop:  stylevar.padding.largePadding,
    paddingLeft:  stylevar.padding.layoutPadding,
    paddingRight:  stylevar.padding.layoutPadding,
    paddingBottom:  stylevar.padding.largePadding,
    borderRadius: stylevar.padding.layoutPadding,
    shadowColor: stylevar.color.blackColor,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowRadius: 10,
    shadowOpacity: .5,
  },
  title: {
    alignItems: 'flex-start',
    marginLeft: stylevar.padding.layoutPadding,
    marginTop: stylevar.padding.layoutPadding,
  },
  titleDivide: {
    borderRadius: 2,
    marginTop: 12,
    width: 40,
    height: 2,
  },
  titleText: {
    color: stylevar.color.blackColor,
    fontSize: stylevar.fontSize.titleSize,
  },
  userText: {
    marginTop: stylevar.padding.layoutPadding,
    color: stylevar.color.blackColor,
    fontSize: stylevar.fontSize.noteSize,
  },
  statusLike: {
    flexDirection: 'row',
    marginLeft: stylevar.padding.layoutPadding,
    marginRight: stylevar.padding.layoutPadding,
    marginTop: stylevar.padding.layoutPadding,
    paddingTop: 12,
    paddingBottom: 12,
    borderColor: stylevar.color.lightGreyColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  like: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  likeText: {
    color: stylevar.color.darkGreyColor,
    paddingLeft: 4,
    fontSize: stylevar.fontSize.commonSize,
    lineHeight: 33,
  },
  imgContainer: {
    width: window.width - 90,
    flexDirection: 'row',
    marginLeft: 12,
  },
  userImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 12,
  },
  statusCommit: {
  //  paddingTop: 12,
   // marginLeft: stylevar.padding.layoutPadding,
  },
  commit: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 12,
  },
  commitText: {
    marginLeft:12,
    color: stylevar.color.darkGreyColor,
    fontSize: stylevar.fontSize.commonSize,
  },
  commitUser: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  commitList:{
    flexDirection: 'row',
 //   alignItems:'center',
     marginLeft: stylevar.padding.layoutPadding,
    marginRight: stylevar.padding.layoutPadding,
    paddingTop: 12,
    paddingBottom: 12,
    borderColor: stylevar.color.lightGreyColor,
    //borderTopWidth: 1,
    borderBottomWidth: 1,

  },
  commitUserName:{
    fontSize:stylevar.fontSize.noteSize,
    color:stylevar.color.blackColor,
    //justifyContent:'flex-start'
   // textDecorationLine:'underline',
  },
  commitTime:{position:'absolute',right:stylevar.padding.smallPadding,top:12,  
    fontSize:stylevar.fontSize.commonSize,fontWeight:'bold',
    color:stylevar.color.greyColor,

  },
  commitWord:{
    fontSize:stylevar.fontSize.commonSize,
    color:stylevar.color.darkGreyColor,
    marginTop:stylevar.padding.smallPadding,
    paddingRight:26,
  },
  InputContainer:{
    position:'absolute',
    width:window.width,
    bottom:0,
    //height:stylevar.padding.layoutPadding,
    paddingTop:stylevar.padding.smallPadding,
    paddingRight:stylevar.padding.middlePadding,
    paddingBottom:stylevar.padding.smallPadding,
    paddingLeft:stylevar.padding.middlePadding,
    backgroundColor:'#fff',
    borderTopWidth:1,
    borderColor:stylevar.color.lightGreyColor,
  },
  commitInputContainer:{
     borderColor:stylevar.color.lightGreyColor,
     borderTopWidth:1,
     borderRightWidth:1,
     borderBottomWidth:1,
     borderLeftWidth:1,
     borderRadius:stylevar.borderRadius.commonRadius,
  },

  commitInput:{
    marginLeft:stylevar.padding.middlePadding,
    marginRight:stylevar.padding.middlePadding,
    height:30,
    fontSize:stylevar.fontSize.commonSize,
    color:stylevar.color.darkGreyColor,

  },
  subscribe: {
    paddingLeft: stylevar.padding.layoutPadding,
    paddingRight: stylevar.padding.layoutPadding,
    marginTop: stylevar.padding.layoutPadding,
  },
  subscribeText: {
    lineHeight: 16,
    fontSize: stylevar.fontSize.commonSize,
    color: stylevar.color.darkGreyColor,
  },
  subscribeImg: {
    marginTop: 12,
    width: '100%',
    paddingLeft: stylevar.padding.layoutPadding,
    paddingRight: stylevar.padding.layoutPadding,
  }

})

export default class Listdetail extends Component {


  constructor() {
    super();
    this.state = {
      title: 'null',
      titleImg: 'null',
      showColor: '#f0f0f0',
      user: 'null',
      bannerHeight:300,
      headerDisplay: 'flex',
      fadeAnim: new Animated.Value(1),
    };
    this.goBack = this.goBack.bind(this);
    this.headerShow = this.headerShow.bind(this);

  }
  static defaultProps ={
    bannerHeight:300,
  };

  componentDidMount() {
    this.setState({
      title: this.props.navigation.state.params.name,
      titleImg: this.props.navigation.state.params.titleImg,
      showColor: this.props.navigation.state.params.showColor,
      user: this.props.navigation.state.params.user,
      bannerHeight: this.props.navigation.state.params.imgHeight / this.props.navigation.state.params.imgWidth * window.width || 300,

    });
  

    // console.log(this.props)
  }
  goBack() {
    // AlertIOS.prompt("lkl")
    this.props.navigation.goBack()
  }

  headerShow(event) {
    console.log(event)
    if (event) {
      Animated.timing( // 随时间变化而执行的动画类型
        this.state.fadeAnim, // 动画中的变量值
        {
          toValue: 1,
          duration: 300, // 透明度最终变为1，即完全不透明
        }
      ).start();
      this.setState({
        headerDisplay: 'flex'
      });

    } else {
      Animated.timing( // 随时间变化而执行的动画类型
        this.state.fadeAnim, // 动画中的变量值
        {
          toValue: 0,
          duration: 300, // 透明度最终变为1，即完全不透明
        }
      ).start();
      this.setState({
        headerDisplay: 'none'
      });

    }
  }
  render() {
    return (
      <View style={styles.container}>        
             <ParallaxScrollView
                style={{width:'100%'}}
                backgroundColor={this.state.showColor}
                contentBackgroundColor="#fff"
                parallaxHeaderHeight={this.state.bannerHeight}
                stickyHeaderHeight={stylevar.height.navbarHeight}
              // onChangeHeaderVisibility={this.headerShow}

              renderStickyHeader={() => (<View style={{backgroundColor:'#fff'}} />)}
                renderBackground={() => (
                  <View key="background">
                       <Image source={this.state.titleImg} style={{width:window.width, height:this.state.bannerHeight,}}/>
                        <View style={{position: 'absolute',
                                      top: 0,
                                      width: window.width,
                                      backgroundColor: 'rgba(0,0,0,.4)',
                                     }}/>
                  </View>
                )}
                renderForeground={() => (
                 <View style={{ flex: 1,  justifyContent: 'center' }}>   
                
                  </View>
                )}>
                <View style={{ }}>
                   <View style={styles.title}>       
                        <Text style={styles.titleText}>{this.state.title}</Text>
                        <View style={[styles.titleDivide,{backgroundColor:this.state.showColor}]} />
                         <Text style={styles.userText}>by {this.state.user}</Text>
                    </View>
             
                   
                  <View style={styles.subscribe}>

                    <Text style={styles.subscribeText}>The observatory is a popular tourist attraction with an excellent view of the Hollywood sign, and an extensive array of space and science-related displays. 
                        Since the observatory opened in 1935, admission has been free..The observatory is a popular tourist attraction with an excellent view of the Hollywood sign, and an extensive array of space and science-related displays. 
                        Since the observatory opened in 1935, admission has been free..The observatory is a popular tourist attraction with an excellent view of the Hollywood sign, and an extensive array of space and science-related displays. 
                       </Text>
                  </View>
                 <View style={styles.statusLike}> 
                     <TouchableOpacity style={styles.like}>
                          <Icon   color={stylevar.color.redColor}  name='favorite' 
                        size={33}  />
                        <Text style={styles.likeText}>12</Text>
                      </TouchableOpacity>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userImg} source={require("./img/image2.png")} />
                            <Image style={styles.userImg} source={require("./img/image3.png")} />
                        </View>          
                  </View>
                  
                    <View style={styles.statusCommit}> 
                      <View  style={styles.commitList}> 
                        <Image style={styles.commitUser} source={require("./img/image2.png")} />
                         <View style={{paddingLeft:12,}}>
                             <Text style={styles.commitUserName}>StevenFu</Text>                    
                             <Text style={styles.commitWord}>Since the obrvatory opened in 1935, admission has been free.</Text>
                         </View>
                             <Text style={styles.commitTime}>3h Ago</Text>
                      </View>
                      <View  style={styles.commitList}> 
                        <Text style={styles.commitText}> Add Your Commit</Text>
                      </View>
                  </View>
                  
                </View>
            </ParallaxScrollView>
                <View  style={{
                        
                          display:'flex' ,
                          position:'absolute',
                          top:0,
                          width:'100%' ,
                          display:this.state.headerDisplay,  
                          backgroundColor: 'rgba(0,0,0,0.4)',    
                        }}
                      >          
               <TouchableOpacity style={styles.backIconContainer} onPress={this.goBack}>
                 <Icon style={styles.backIcon}  color={'#fff'}  name='arrow-back' 
                  size={24}  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareIconContainer}>
                   <Icon style={styles.shareIcon}  color={'#fff'}  name='share' 
                  size={22}  />
                </TouchableOpacity>
              </View>

              <View style={styles.InputContainer}>
               <View style={styles.commitInputContainer}>
                   <TextInput 
                     style={styles.commitInput}
                     placeholder ={"Say something"}
                     returnKeyType="send"
 
                     />
               </View>
              </View>

      </View>
    );
  }
}