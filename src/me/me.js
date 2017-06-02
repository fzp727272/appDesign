import React, {Component} from 'react';
import {StyleSheet, View, Image, Text,Dimensions, ScrollView, TouchableWithoutFeedback,TouchableOpacity,} from 'react-native';
import stylevar from '../style/stylevar';
import {
    Icon
} from 'react-native-elements';
import PersonalWorks from '../component/personalworks.js';


/**
 * 个人中心，头像，昵称部分
 */
class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
            <View style={{alignItems: 'flex-end',paddingRight:stylevar.padding.layoutPadding,}}>
                    <TouchableWithoutFeedback onPress={this.props.onSettingClick}>
                        <Icon containerStyle={styles.btn_setting} size={24} name="chat" color={stylevar.color.darkGreyColor} />
                      
                    </TouchableWithoutFeedback>

                </View>
               
                <View style={styles.container_avater}>
                    <TouchableWithoutFeedback onPress={this.props.onAvatarClick}>

                     <Image style={styles.img_avatar} source={require("../img/image3.png")}/>
                        </TouchableWithoutFeedback>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={this.props.onNameClick}>
                    <Text style={{fontSize:stylevar.fontSize.noteSize}} >StevenFU</Text>
                    <Icon containerStyle={{paddingLeft:stylevar.padding.smallPadding}} size={18} name="mode-edit" color={stylevar.color.darkGreyColor} />
                </TouchableOpacity>
                </View>
                <View style={styles.container_favority_and_reply}>
                    <TouchableWithoutFeedback onPress={this.props.onFavorityClick}>
                        <View style={styles.container_favority}>
                          <Text style={[styles.tv_favority,{color:stylevar.color.blackColor,fontWeight:'bold'}]}> 231</Text>
                            <Text style={styles.tv_favority}> Follower</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.props.onReplyClick}>
                        <View style={styles.container_reply}>
                          <Text style={styles.tv_reply}>Follow</Text>
                            <Text style={[styles.tv_reply,{color:stylevar.color.blackColor,fontWeight:'bold'}]}> 12</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

//    <Icon containerStyle={styles.img_favority} color={stylevar.color.iconActiveColor} name='person'size={18} />

const MYITEM = ['MyMessage', 'MyFollow', 'MyCache', 'Feedback', 'Contribute'];
/**
 * 个人中心【我的**】item布局
 */
class MyItem extends Component {
    render() {
        return (
            <Text
                tag={this.props.tag}
                style={styles.tv_myItem}
                onPress={this.props.onItemClick}
            >{this.props.title}</Text>
        )
    }
}

/**
 * 个人中心页面
 */
export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        };
    }


    render() {

        return (
            <ScrollView>
                <Header
                    onSettingClick={()=>this._onSettingClick()}
                    onAvatarClick={()=>this._onAvatarClick()}
                    onNameClick={()=>this._onNameClick()}
                    onFavorityClick={()=>this._onFavorityClick()}
                    onReplyClick={()=>this._onReplyClick()}
                />
                <PersonalWorks navigation={this.props.navigation} />
             
            </ScrollView>
        )

    }

    //item点击事件
    _onItemClick(tag) {
        switch (tag) {
            default:
                // ToastUtil.show("点击了 => " + tag);
                this._toLoginPage();
                break;
        }
    }

    //点击跳转设置界面
    _onSettingClick() {
        ToastUtil.show("打开设置")
        // const {navigator} = this.props;
        // if (navigator) {
        //     navigator.push({
        //         name: 'SettingPage',
        //         component: SettingPage,
        //         params: {
        //             rowData: '123',
        //         }
        //     })
        // }
    }

    //头像点击事件
    _onAvatarClick() {
        ToastUtil.show("点击了头像");
    }

    //昵称点击事件
    _onNameClick() {
        ToastUtil.show("点击了昵称");
    }

    //收藏点击事件
    _onFavorityClick() {
        ToastUtil.show("点击了收藏");
    }

    //评论点击事件
    _onReplyClick() {
        ToastUtil.show("点击了评论");
    }

    //跳转到登录页面
    _toLoginPage() {
        if (this.state.isLogin) {
            return ToastUtil.show("您已登录，无需重复登录！若要打开登录界面，请在设置中退出登录");
        }
        ToastUtil.show('请先登录')
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'LoginPage',
                component: LoginPage,
                params: {
                    //该方法用于下一个页面的数据回传
                    getIsLogin:(isLogin)=>{this.setState({
                        isLogin:isLogin
                    })}

                }
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
       
        paddingTop:stylevar.padding.layoutPadding,
        paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: stylevar.color.greyColor,
        backgroundColor: 'white',
    },
    container_favority_and_reply: {
        flexDirection: 'row',
    },
    container_favority: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderRightColor: stylevar.color.greyColor,
    },
    container_reply: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_avater: {
        alignItems: 'center',
        marginBottom: 32,
    },
    header: {
        backgroundColor: '#333333',
        height: 240,
    },
    btn_setting: {
        height: 40,
        width: 40,
        marginRight:stylevar.padding.layoutPadding,
    },
    img_avatar: {
        borderRadius: 30,
        height: 60,
        width: 60,
        marginBottom: 16,
    },
    tv_favority: {
        fontSize:stylevar.fontSize.noteSize,
        color: stylevar.color.darkGreyColor,
    },
    tv_reply: {
        fontSize:stylevar.fontSize.noteSize,
        color: stylevar.color.darkGreyColor,
    },
    img_favority: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 8,
    },
    img_reply: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 8,
    },
    tv_myItem: {
        height: 80,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
})