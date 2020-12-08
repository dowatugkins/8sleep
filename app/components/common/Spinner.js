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
} from 'react-native';
import PropTypes from 'prop-types';

function Spinner({ isVisible }) {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(Animated.timing(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
      easing: Easing.linear,
    })).start();
  }, []);

  return isVisible ? (
    <Animated.View
      style={{
        transform: [{
          rotateX: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          })
        }]
      }}>

    </Animated.View>
  ) : null;
}

Spinner.propTypes = {
  isVisible: PropTypes.bool,
};

export default Spinner;
