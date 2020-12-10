/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/components/common
 */

import { Image, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { Colors } from 'styles';

class Icon extends Component {
  render() {
    const { style, type, ...rest } = this.props;
    switch (type) {
      case 'MaterialIcon':
        return <MaterialIcons style={[styles.icon, style]} {...rest} />;
      case 'MaterialCommunityIcon':
        return <MaterialCommunityIcons style={[styles.icon, style]} {...rest} />;
      case 'Entypo':
        return <Entypo style={[styles.icon, style]} {...rest} />;
      case 'EvilIcon':
        return <EvilIcon style={[styles.icon, style]} {...rest} />;
      case 'Feather':
        return <Feather style={[styles.icon, style]} {...rest} />;
      case 'FontAwesome':
        return <FontAwesome style={[styles.icon, style]} {...rest} />;
      case 'FontAwesome5':
        return <FontAwesome5 style={[styles.icon, style]} {...rest} />;
      case 'Fontisto':
        return <Fontisto style={[styles.icon, style]} {...rest} />;
      case 'Foundation':
        return <Foundation style={[styles.icon, style]} {...rest} />;
      case 'Ionicon':
        return <Ionicon style={[styles.icon, style]} {...rest} />;
      case 'Octicon':
        return <Octicons style={[styles.icon, style]} {...rest} />;
      case 'Zocial':
        return <Zocial style={[styles.icon, style]} {...rest} />;
      case 'SimpleLineIcon':
        return <SimpleLineIcons style={[styles.icon, style]} {...rest} />;
      case 'AntDesign':
        return <AntDesign style={[styles.icon, style]} {...rest} />;
      case 'Image':
        return <Image style={[styles.icon, style]} {...rest} />;
      default:
        return null;
    }
  }
}

Icon.defaultProps = {
  type: 'FontAwesome',
};

Icon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, ViewPropTypes.style]),
  size: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.oneOf([
    'MaterialIcon',
    'MaterialCommunityIcon',
    'Entypo',
    'EvilIcon',
    'Feather',
    'FontAwesome',
    'FontAwesome5',
    'Fontisto',
    'Foundation',
    'Ionicon',
    'Octicon',
    'Zocial',
    'SimpleLineIcon',
    'AntDesign',
    'Image',
  ]),
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  icon: {
    color: Colors.blue,
  }
});

export default Icon;
