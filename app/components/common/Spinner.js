/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/components/common
 */

import React, { useEffect } from 'react';
import {
  Easing,
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from './Icon';

function Spinner({ isVisible }) {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(Animated.timing(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
      easing: Easing.linear,
    })).start();
  }, [animatedValue]);

  return isVisible ? (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{
            rotate: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            })
          }]
        }}>
        <Icon type="EvilIcon" name="spinner-3" size={50} />
      </Animated.View>
    </View>
  ) : null;
}

Spinner.propTypes = {
  isVisible: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Spinner;
