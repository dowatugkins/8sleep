/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/components/common
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import AnimatedNumbers from 'react-native-animated-numbers';

function AnimatedNumber(props) {
  const [currentNumber, setCurrentNumber] = useState(false);

  useEffect(() => {
    if (props.number !== currentNumber) {
      setCurrentNumber(props.number);
    }
  }, [props.number, currentNumber]);

  return (
    <View style={styles.numberContainer}>
      <AnimatedNumbers
        includeComma
        animateToNumber={currentNumber}
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
    flex: 1,
  },
});

export default AnimatedNumber;
