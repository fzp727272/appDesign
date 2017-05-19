import React, {
    Component,
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Alert,
    AlertIOS,
    ScrollView,
    ListView,
    Image,
    ActivityIndicator,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    Platform,
    Dimensions,
} from 'react-native'
//const {deviceHeight, deviceWidth} = Dimensions.get('window');

import {Icon} from 'react-native-elements'
import stylevar from '../style/stylevar.js';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview';
import loaddata from "./homedate.js";
//const loaddata = [{text:'hahha'}]

export default class Home extends Component {
     
    // 构造
      constructor(props) {
        super(props);

        this._dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            //sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this._renderRow = this._renderRow.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._onLoadMore = this._onLoadMore.bind(this);
        this. _renderActivityIndicator = this. _renderActivityIndicator.bind(this);
        this.getData = this.getData.bind(this);

      let dataList = [ ]

        this.state = {
            first: true,
            dataList: dataList,
            dataSource: this._dataSource.cloneWithRows(dataList),
        }
    }

    componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer1 && clearTimeout(this.timer1);
    this.timer2 && clearTimeout(this.timer2);

    }
    componentDidMount () {
        //console.log(loaddata)
        this._pullToRefreshListView.beginRefresh();
        this.getData();
    }




    //Using ListView
    render() {
        return (
            <PullToRefreshListView
                ref={ (component) => this._pullToRefreshListView = component }
                viewType={PullToRefreshListView.constants.viewType.listView}
                contentContainerStyle={{backgroundColor: 'transparent', }}
                style={{marginTop: 0 }}
                initialListSize={20}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                pageSize={20}
                renderRow={this._renderRow}
                renderHeader={this._renderHeader}
                renderFooter={this._renderFooter}
                //renderSeparator={(sectionID, rowID) => <View style={styles.separator} />}
                onRefresh={this._onRefresh}
                onLoadMore={this._onLoadMore}
                pullUpDistance={35}
                pullUpStayDistance={50}
                pullDownDistance={35}
                pullDownStayDistance={50}
            />
        )

    }

    getData(){
      
    dataList = require("./homedate.js");
    }


    _renderRow = (rowData, sectionID, rowID) => {
         let imgurl = rowData.img;

        return (
            <View style={styles.thumbnail}>
                <View style={styles.textContainer}>
                    <Image style={styles.listImg} source={imgurl}> 
                       <View style={styles.backgroundImg}>
                            <View style={styles.ListTitle}>  
                              <Icon containerStyle={{marginRight:5,}}
                                  color={stylevar.color.mainColor}
                                  name='rowing'/> 
                        
                             <Text style={styles.ListTitleText}>
                               {rowData.title} 
                             </Text>
                            </View>
                            <Text style={styles.ListText}># {rowData.text}</Text>
                       </View>
                    </Image>
                   
                </View>
            </View>
        )
    }

    _renderHeader = (viewState) => {
        let {pullState, pullDistancePercent} = viewState
        let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch(pullState) {
            case refresh_none:
                return (
                    <View style={{flexDirection: 'row',height: 35, justifyContent: 'center', alignItems: 'center', }}>
                       <Icon containerStyle={styles.loadicon} color={stylevar.color.iconActiveColor} name='arrow-downward'
                     size={18} />
                      <Text style={styles.loadtext}>pull down to refresh</Text>
                    </View>
                )
            case refresh_idle:
                return (
                    <View style={{flexDirection: 'row',height: 35, justifyContent: 'center', alignItems: 'center', }}>
               
                     <Icon containerStyle={styles.loadicon} color={stylevar.color.iconActiveColor} name='arrow-downward'
                     size={18} />
                        <Text style={styles.loadtext}>pull down to refresh</Text>
                   
                    </View>
                )
            case will_refresh:
                return (
                    <View style={{flexDirection: 'row',height: 35, justifyContent: 'center', alignItems: 'center', }}>
                     <Icon containerStyle={styles.loadicon} color={stylevar.color.iconActiveColor} name='arrow-upward'
                     size={18} />
                        <Text style={styles.loadtext}>release to refresh</Text>
                    </View>
                )
            case refreshing:
                return (
                    <View style={{flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        {this._renderActivityIndicator()}<Text style={styles.loadtext}>refreshing</Text>
                    </View>
                )
        }
    }

    _renderFooter = (viewState) => {
        let {pullState, pullDistancePercent} = viewState
        let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all, } = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch(pullState) {
            case load_more_none:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={styles.loadtext}>pull up to load more</Text>
                    </View>
                )
            case load_more_idle:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={styles.loadtext}>pull up to load more</Text>
                    </View>
                )
            case will_load_more:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={styles.loadtext}>release to load more</Text>
                    </View>
                )
            case loading_more:
                return (
                    <View style={{flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        {this._renderActivityIndicator()}<Text style={styles.loadtext}>loading</Text>
                    </View>
                )
            case loaded_all:
                return (
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={styles.loadtext}>no more</Text>
                    </View>
                )
        }
    }

    _onRefresh = () => {
        //console.log('outside _onRefresh start...')
      let _this = this;
        //simulate request data
        this.timer1 = setTimeout(() => {

            //console.log('outside _onRefresh end...')
            let addNum = 5
            let refreshedDataList = []
            for(let i = 0; i < addNum; i++) {
                refreshedDataList.push({
                    //text: `item-${i}`
                    text:loaddata[i].text,
                    img:loaddata[i].img,
                    title:loaddata[i].title,
                })
            }

            _this.setState({
                dataList: refreshedDataList,
                dataSource: _this._dataSource.cloneWithRows(refreshedDataList),
            })
            _this._pullToRefreshListView.endRefresh()

        }, 1000);
    }

    _onLoadMore = () => {
        //console.log('outside _onLoadMore start...')
        //console.log('outside _onRefresh start...')
         let _this = this;
        this.timer2 = setTimeout(() => {

            //console.log('outside _onLoadMore end...')

            let length = _this.state.dataList.length
            let addNum = 5
            let addedDataList = []
            if(length >= 100) {
                addNum = 3
            }
            for(let i = length; i < length + addNum; i++) {
                addedDataList.push({
                    text:loaddata[i].text,
                    img:loaddata[i].img,
                    title:loaddata[i].title,
                })
            }
            let newDataList = _this.state.dataList.concat(addedDataList)
            _this.setState({
                dataList: newDataList,
                dataSource: _this._dataSource.cloneWithRows(newDataList),
            })

            let loadedAll
            if(length >= 100) {
                loadedAll = true
                _this._pullToRefreshListView.endLoadMore(loadedAll)
            }
            else {
                loadedAll = false
                _this._pullToRefreshListView.endLoadMore(loadedAll)
            }

        }, 1500)
    }

    _renderActivityIndicator() {
        return ActivityIndicator ? (
            <ActivityIndicator
                style={styles.loading}
                animating={true}
                //color={'#ff0000'}
                color={stylevar.color.blackColor}
                size={'small'}/>
        ) : Platform.OS == 'android' ?
            (
                <ProgressBarAndroid
                    style={{marginRight: 10,}}
                    color={stylevar.color.blackColor}
                    styleAttr={'Small'}/>

            ) :  (
            <ActivityIndicatorIOS
                style={styles.loading}
                animating={true}
                //color={'#ff0000'}
                color={stylevar.color.blackColor}
                size={'small'}/>
        )
    }

}

const styles = StyleSheet.create({
    itemHeader: {
        height: 35,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        backgroundColor: 'blue',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        height: stylevar.home.listHeight,
        //borderBottomWidth: StyleSheet.hairlineWidth,
        //borderBottomColor: '#ccc',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        marginRight: 10,
        //color:stylevar.color.blackColor,
        backgroundColor: stylevar.color.mainColor,
    },
    loadicon: {
        //color:stylevar.color.darkGreyColor,
        paddingRight: 5,
    },
    loadtext: {
        color: stylevar.color.darkGreyColor,
        fontWeight: 'bold',
        fontSize: stylevar.fontSize.commonSize,
    },
    contentContainer: {
        paddingTop: 20 + 44,
    },

    thumbnail: {
        height: stylevar.home.listHeight,
        padding: 0,
        flexDirection: 'row',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        //borderBottomColor: '#ccc',
        overflow: 'hidden',
    },
    listImg: {
        width: Dimensions.get('window').width,
        height: stylevar.home.listHeight,
        //  height:stylevar.home.listHeight,
        alignItems: 'stretch',
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
            h: 0,
            w: 0
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
            h: 0,
            w: 0
        },
        shadowRadius: 8,
        shadowOpacity: 0.3,
    },

    textContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})