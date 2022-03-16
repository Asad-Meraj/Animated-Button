import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { API_DELAY_TIME } from '../../constants/common';

const STATUS_COLOR = {
  0: '#4B4F93',
  1: '#0C8D87',
  2: '#C01332'
};

const HEIGHT = 60;

export default (props) => {
  const { step, totalSteps, status, onClick, disable } = props;
  const [width, setWidth] = React.useState(0);
  const animatedValue     = React.useRef(new Animated.Value(-1000)).current
  const reactive     = React.useRef(new Animated.Value(-1000)).current

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue:          reactive,
      duration:         API_DELAY_TIME,
      useNativeDriver:  true
    }).start();
  }, []);

  React.useEffect(() => {
    reactive.setValue((step* width)/totalSteps - width);
  }, [step, width]);

  const progressViewStyle = {
    height: HEIGHT,
    width: '100%',
    backgroundColor: STATUS_COLOR[status],
    transform: [{
      translateX: animatedValue
    }],
  }

  return (
    <TouchableOpacity style={styles.container} onLayout={e => {
      const newWidth = e.nativeEvent.layout.width;
      setWidth(newWidth);
    }} onPress={onClick} disabled={disable} >
      <Animated.View style={progressViewStyle} />

      <View style={styles.children}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    backgroundColor: '#21223E',
    borderRadius: 8,
    width: 213,
    height: HEIGHT,
    alignItems: 'center',
    overflow: 'hidden'
  },
  children: {
    position: 'absolute',
    zIndex: 1,
    height: HEIGHT
  }
});
