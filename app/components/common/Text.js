/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/components/common
 */

import React from 'react';
import {
  Text as RNText,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

function Text({ style, children, ...restOfProps }) {
  return (
    <RNText style={[styles.text, style]} {...restOfProps}>
      {children}
    </RNText>
  );
}

Text.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.array]),
  style: PropTypes.oneOfType([PropTypes.object, RNText.propTypes.style]),
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Text;
