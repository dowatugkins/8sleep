/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/components
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { get } from 'lodash';

import useSleepData from 'hooks/useSleepData';
import { Text, Spinner, IconButton } from 'common';
import { Colors } from 'styles';
import Interval from './Interval';

const sleepUrls = [
  'https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json',
  'https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json',
  'https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json',
];

function SleepView() {
  const [currentUser, setCurrentUser] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { fetching, sleepData } = useSleepData(sleepUrls);

  const updateIndex = (index) => {
    setCurrentIndex(index);
  };

  const renderInterval = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => updateIndex(index)}>
        <View>
          <Interval isOpen={currentIndex === index} data={item} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const onLeftPress = () => {
    if (currentUser === 0) {
      setCurrentUser(sleepData.length - 1);
    } else {
      setCurrentUser(currentUser - 1);
    }
  };

  const onRightPress = () => {
    if (currentUser === sleepData.length - 1) {
      setCurrentUser(0);
    } else {
      setCurrentUser(currentUser + 1);
    }
  };

  const renderUser = ({ userData }) => {
    return (
      <View style={styles.userListContainer}>
        <FlatList
          data={get(userData, 'intervals')}
          extraData={fetching}
          renderItem={renderInterval}
          keyExtractor={item => item.id}
          nestedScrollEnabled
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Spinner isVisible={fetching} />
      {!fetching && sleepData ?
        <View style={styles.userViewContainer}>
          <View style={styles.userSelectionRow}>
            <IconButton name="keyboard-arrow-left" type="MaterialIcon" size={40} onPress={onLeftPress} />
            <Text>Individual #{currentUser + 1}</Text>
            <IconButton name="keyboard-arrow-right" type="MaterialIcon" size={40} onPress={onRightPress} />
          </View>
          <View style={styles.row}>
            <Text style={{ color: Colors.awake, fontSize: 10 }}>Awake</Text>
            <Text style={{ color: Colors.bed, fontSize: 10 }}>Out of Bed</Text>
            <Text style={{ color: Colors.deep, fontSize: 10 }}>Deep Sleep</Text>
            <Text style={{ color: Colors.light, fontSize: 10 }}>Light Sleep</Text>
            <Text style={{ fontSize: 10 }}>Toss and Turn</Text>
          </View>
          {renderUser({ userData: get(sleepData, `${currentUser}`, {}) })}
        </View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },

  userViewContainer: {
    flex: 1,
    width: '100%',
  },

  userListContainer: {
    height: '100%',
  },

  userSelectionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  separator: {
    backgroundColor: Colors.blue,
    height: 1,
    marginHorizontal: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

export default SleepView;
