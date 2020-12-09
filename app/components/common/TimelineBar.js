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
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from 'styles';

const { width } = Dimensions.get('window');

function TimelineBar({ stages, tnt }) {
  const numberOfStages = stages.length;
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [secondWidth, setSecondWidth] = useState();

  useEffect(() => {
    const seconds = stages.reduce((accumulator, stage) => accumulator + stage.duration, 0);
    setTotalSeconds(seconds);
    setSecondWidth((width * 0.7) / seconds);
  }, [totalSeconds, stages]);

  return (
    <View style={styles.container}>

    </View>
  );
}

TimelineBar.propTypes = {
  stages: PropTypes.array,
  tnt: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.blue,
    height: 25,
    width: width * 0.7,
    marginRight: 10,
  },
});

export default TimelineBar;
