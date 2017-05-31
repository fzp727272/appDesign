import React, {
  Component
} from 'react';
const { ViewPropTypes } = ReactNative = require('react-native');
//import ViewPropTypes from 'react-native'
import  {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  Dimensions,
   TouchableOpacity
} from 'react-native';


const Button = (props) => {
  return <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>;
};

import Sort from './sort.js';

import {
  Icon
} from 'react-native-elements';
import stylevar from '../style/stylevar.js';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default class SearchHeaderWithTab extends Component{

  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    scrollOffset: React.PropTypes.number,
    style: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    tabsContainerStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: ViewPropTypes.style,
    onScroll:React.PropTypes.func,
  };
  static defaultProps ={
     scrollOffset: 52,
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
      style: {},
      tabStyle: {},
      tabsContainerStyle: {},
      underlineStyle: {},
  };
 constructor(props) {
    super(props);
    this._tabsMeasurements = [];
     this.state = { 
      _leftTabUnderline: new Animated.Value(0),
      _widthTabUnderline: new Animated.Value(0),
      _containerWidth: null,
      modalVisible:false }

    this.updateView = this.updateView.bind(this);
    this.necessarilyMeasurementsCompleted = this.necessarilyMeasurementsCompleted.bind(this);
    this.updateTabPanel = this.updateTabPanel.bind(this);
    this.updateTabUnderline = this.updateTabUnderline.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.measureTab = this.measureTab.bind(this);
    this.sortShow = this.sortShow.bind(this);
    this.sortHide = this.sortHide.bind(this);
    this.onTabContainerLayout = this.onTabContainerLayout.bind(this);
    this.onContainerLayout = this.onContainerLayout.bind(this);
  }

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  }
  updateView(offset) {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;
    const lastTabPosition = tabCount - 1;

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }

    if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  }

  necessarilyMeasurementsCompleted(position, isLastTab) {
    return this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements;
  }

  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    if (Platform.OS === 'android') {
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
    } else {
      const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
    }

  }

  updateTabUnderline(position, pageOffset, tabCount) {
    const lineLeft = this._tabsMeasurements[position].left;
    const lineRight = this._tabsMeasurements[position].right;

    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left;
      const nextTabRight = this._tabsMeasurements[position + 1].right;

      const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
      const newLineRight = (pageOffset * nextTabRight + (1 - pageOffset) * lineRight);

      this.state._leftTabUnderline.setValue(newLineLeft);
      this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
    } else {
      this.state._leftTabUnderline.setValue(lineLeft);
      this.state._widthTabUnderline.setValue(lineRight - lineLeft);
    }
  }

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <Button
      key={`${name}_${page}`}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
      onLayout={onLayoutHandler}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </Button>;
  }

  measureTab(page, event) {
    const { x, width, height, } = event.nativeEvent.layout;
    this._tabsMeasurements[page] = {left: x, right: x + width, width, height, };
    this.updateView({value: this.props.scrollValue._value, });
  }

  sortShow(){
       this.setState({modalVisible:true,});

   }
  sortHide(){
    this.setState({modalVisible:false,})
  }

  render() {
    const tabUnderlineStyle = {
      position: 'absolute',
      height: 2,
      backgroundColor: stylevar.color.blackColor,
      bottom: 3,
      borderLeftWidth:40,
      borderRightWidth:40,
      borderColor:'#fff'
    };

    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline,
    };

    return <View
      style={[styles.container, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}
      onLayout={this.onContainerLayout}
    >
         
        
      <ScrollView
        ref={(scrollView) => { this._scrollView = scrollView; }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        bounces={false}
        scrollsToTop={false}
      >
        <View
          style={[styles.tabs, {width: this.state._containerWidth, }, this.props.tabsContainerStyle, ]}
          ref={'tabContainer'}
          onLayout={this.onTabContainerLayout}
        >
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage, this.measureTab.bind(this, page));
          })}
          <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, this.props.underlineStyle, ]} />
        </View>
      </ScrollView>
         <TouchableOpacity style={styles.menuLeft} onPress={this.sortShow}>
            <Icon name='sort' size={24} color={stylevar.color.blackColor}/> 
         </TouchableOpacity>
         <TouchableOpacity style={styles.menuRight}>
             <Icon name='search' size={24} color={stylevar.color.blackColor}/> 
         </TouchableOpacity>
          <Sort sortHide={this.sortHide}  modalVisible={this.state.modalVisible}/>
    </View>;
  }

  componentWillReceiveProps(nextProps) {
    // If the tabs change, force the width of the tabs container to be recalculated
    if (JSON.stringify(this.props.tabs) !== JSON.stringify(nextProps.tabs) && this.state._containerWidth) {
      this.setState({ _containerWidth: null, });
    }
  }

  onTabContainerLayout(e) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    if (width < WINDOW_WIDTH) {
      width = WINDOW_WIDTH;
    }
    this.setState({ _containerWidth: width, });
    this.updateView({value: this.props.scrollValue._value, });
  }

  onContainerLayout(e) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({value: this.props.scrollValue._value, });
  }
}

const styles = StyleSheet.create({
  tab: {
    height: stylevar.height.navbarheight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    height: stylevar.height.navbarheight,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: stylevar.color.lightGreyColor,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
