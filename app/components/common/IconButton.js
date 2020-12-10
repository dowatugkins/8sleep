/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/components/common
 */

import React, { Component } from 'react';
import {
  TouchableOpacity,
  ViewPropTypes,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from './Icon';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class IconButton extends Component {
  render() {
    const {
      onPress,
      buttonStyle,
      ...rest
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <AnimatedIcon {...rest} />
      </TouchableOpacity>
    );
  }
}

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonStyle: ViewPropTypes.style,
};

export default IconButton;
