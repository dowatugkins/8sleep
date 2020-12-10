/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/components/common
 */

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import AnimatedNumbers from 'react-native-animated-numbers';

function AnimatedNumber(props) {
  return (
    <View style={styles.numberContainer}>
      <AnimatedNumbers
        animateToNumber={props.number}
        fontStyle={{ fontSize: 20, fontWeight: 'bold' }}
      />
    </View>
  );
}

AnimatedNumber.propTypes = {
  number: PropTypes.number,
};

const styles = StyleSheet.create({
  numberContainer: {
  },
});

export default AnimatedNumber;
