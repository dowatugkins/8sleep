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

function TimelineBar({ stages, tnt, startTime }) {
  const startDate = new Date(startTime);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [secondWidth, setSecondWidth] = useState();

  useEffect(() => {
    const seconds = stages.reduce((accumulator, stage) => accumulator + stage.duration, 0);
    setTotalSeconds(seconds);
    setSecondWidth((width * 0.7) / seconds);
  }, [totalSeconds, stages]);

  const getColor = (stage) => {
    switch (stage) {
      case 'awake':
        return Colors.awake;
      case 'deep':
        return Colors.deep;
      case 'light':
        return Colors.light;
      case 'out':
        return Colors.out;
    }
  };

  return (
    <View style={styles.container}>
      {secondWidth ?
        stages.map((stage, index) => {
          const color = getColor(stage.stage);
          const sectionWidth = secondWidth * stage.duration;
          return (
            <View key={`${index}-${stage.duration}-${stage.stage}`} style={{ backgroundColor: color, width: sectionWidth, height: '100%' }} />
          );
        })
      : null}
      {secondWidth ?
        tnt.map((timestamp) => {
          const time = new Date(timestamp[0]);
          const elapsedSeconds = (time.getTime() - startDate.getTime()) / 1000;
          return <View key={`${timestamp[0]}`} style={{ position: 'absolute', backgroundColor: 'black', width: 1, height: '100%', left: elapsedSeconds * secondWidth }} />;
        }) : null
      }
    </View>
  );
}

TimelineBar.propTypes = {
  stages: PropTypes.array,
  tnt: PropTypes.array,
  startTime: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    height: 25,
    width: width * 0.7,
    marginRight: 10,
    flexDirection: 'row',
  },
});

export default TimelineBar;
