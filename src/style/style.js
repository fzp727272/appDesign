
import {
   StyleSheet,
} from 'react-native';

import stylevar from './stylevar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: stylevar.color.mainColor,
  },
  
    icon:{color:stylevar.color.greyColor,},
    iconactive:{},

});

export default styles;