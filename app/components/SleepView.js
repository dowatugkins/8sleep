/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/components
 */

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import useSleepData from 'hooks/useSleepData';

const sleepUrls = [
  'https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json',
  'https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json',
  'https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json',
];

function SleepView() {
  const { fetching, sleepData } = useSleepData(sleepUrls);

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SleepView;
