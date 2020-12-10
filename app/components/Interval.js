/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/components
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Svg, { Polyline } from 'react-native-svg';

import { Text, TimelineBar, IconButton, AnimatedNumber } from 'common';
import { Colors } from 'styles';

function Interval({ data, isOpen }) {
  const [heartRateRange, setHeartRateRange] = useState();
  const [bedTempRange, setBedTempRange] = useState();
  const [roomTempRange, setRoomTempRange] = useState();
  const [respRange, setRespRange] = useState();
  const [displayRange, setDisplayRange] = useState(0, 0);
  const [timeRange, setTimeRange] = useState([new Date(), new Date()]);
  const [displayDate, setDisplayDate] = useState();
  const [date, setDate] = useState(new Date());
  const [graphDimensions, setGraphDimensions] = useState({ width: 0, height: 0 });
  const [currentGraph, setCurrentGraph] = useState('hr');
  const [heartSize, setHeartSize] = useState(45);
  const [homeSize, setHomeSize] = useState(25);
  const [bedSize, setBedSize] = useState(25);
  const [respSize, setRespSize] = useState(25);
  const animatedHeight = useRef(new Animated.Value(isOpen ? 221 : 50)).current;

  useEffect(() => {
    startAnimation();
  }, [isOpen, animatedHeight]);

  useEffect(() => {
    const startStamp = new Date(data.ts);
    const offset = startStamp.getTimezoneOffset();
    const startTime = new Date(startStamp.setMinutes(startStamp.getMinutes() + offset));
    setDate(startTime);
    const timestamp = new Date(startTime);
    const seconds = data.stages.reduce((accumulator, stage) => accumulator + stage.duration, 0);
    const sleepingTime = data.stages.reduce((accumulator, stage) => accumulator + (stage.stage === 'light' || stage.stage === 'deep' ? stage.duration
    : 0), 0);
    setDisplayDate(new Date(sleepingTime * 1000).toISOString().substr(11, 8));
    const endTime = new Date(timestamp.setSeconds(timestamp.getSeconds() + seconds));
    setTimeRange([new Date(startTime), new Date(endTime)]);
    const heartRange = [get(data, 'timeseries.heartRate[0][1]'), get(data, 'timeseries.heartRate[0][1]')];
    get(data, 'timeseries.heartRate', []).reduce((accumulator, heartRate) => {
      if (heartRange[0] === undefined) {
        heartRange[0] = heartRate[1];
        heartRange[1] = heartRate[1];
        return accumulator;
      }
      if (heartRate[1] > heartRange[1]) {
        heartRange[1] = heartRate[1];
      }
      if (heartRate[1] < heartRange[0]) {
        heartRange[0] = heartRate[1];
      }
      return accumulator;
    });
    setHeartRateRange([heartRange[0] - 5, heartRange[1] + 5]);

    const bedRange = [get(data, 'timeseries.tempBedC[0][1]'), get(data, 'timeseries.tempBedC[0][1]')];
    get(data, 'timeseries.tempBedC', []).reduce((_, bedTemp) => {
      if (bedRange[0] === undefined) {
        bedRange[0] = bedTemp[1];
        bedRange[1] = bedTemp[1];
        return;
      }
      if (bedTemp[1] > bedRange[1]) {
        bedRange[1] = bedTemp[1];
      }
      if (bedTemp[1] < bedRange[0]) {
        bedRange[0] = bedTemp[1];
      }
      return;
    });
    setBedTempRange([bedRange[0] - 5, bedRange[1] + 5]);

    const roomRange = [get(data, 'timeseries.tempRoomC[0][1]'), get(data, 'timeseries.tempRoomC[0][1]')];
    get(data, 'timeseries.tempRoomC', []).reduce((_, roomTemp) => {
      if (roomRange[0] === undefined) {
        roomRange[0] = roomTemp[1];
        roomRange[1] = roomTemp[1];
        return;
      }
      if (roomTemp[1] > roomRange[1]) {
        roomRange[1] = roomTemp[1];
      }
      if (roomTemp[1] < roomRange[0]) {
        roomRange[0] = roomTemp[1];
      }
      return;
    });
    setRoomTempRange([roomRange[0] - 5, roomRange[1] + 5]);

    const respRange = [get(data, 'timeseries.respiratoryRate[0][1]'), get(data, 'timeseries.respiratoryRate[0][1]')];
    get(data, 'timeseries.respiratoryRate', []).reduce((_, respRate) => {
      if (respRate[1] > respRange[1]) {
        respRange[1] = respRate[1];
      }
      if (respRate[1] < respRange[0]) {
        respRange[0] = respRate[1];
      }
      return;
    });
    setRespRange([respRange[0] - 5, respRange[1] + 5]);
    setDisplayRange([heartRange[0] - 5, heartRange[1] + 5]);
  }, [data]);

  const startAnimation = () => {
    Animated.spring(animatedHeight, {
      toValue: isOpen ? 221 : 50,
      // duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const heartPressed = () => {
    setDisplayRange(heartRateRange);
    setCurrentGraph('hr');
    setHeartSize(45);
    setHomeSize(25);
    setBedSize(25);
    setRespSize(25);
  };

  const homePressed = () => {
    setDisplayRange(roomTempRange);
    setCurrentGraph('home');
    setHeartSize(25);
    setHomeSize(45);
    setBedSize(25);
    setRespSize(25);
  };

  const bedPressed = () => {
    setDisplayRange(bedTempRange);
    setCurrentGraph('bed');
    setHeartSize(25);
    setHomeSize(25);
    setBedSize(45);
    setRespSize(25);
  };

  const respPressed = () => {
    setDisplayRange(respRange);
    setCurrentGraph('resp');
    setHeartSize(25);
    setHomeSize(25);
    setBedSize(25);
    setRespSize(45);
  };

  const onGraphLayout = ({ nativeEvent }) => {
    if (graphDimensions.width !== 0) {
      return;
    }
    const { width, height } = nativeEvent.layout;
    setGraphDimensions({ width, height });
  };

  const findPointOnYAxis = (axisLength, range, value) => {
    const position = Math.abs(get(range, '[1]') - value);
    const axisSlice = axisLength / Math.abs(get(range, '[1]') - get(range, '[0]'));
    return position * axisSlice;
  };

  const findPointOnXAxis = (axisLength, range, value) => {
    const axisSlice = axisLength / range;
    return value * axisSlice;
  };

  const renderGraph = () => {
    const { width, height } = graphDimensions;
    if (width === 0) {
      return null;
    }
    let points = '';
    let color = '';
    switch (currentGraph) {
      case 'hr':
        if (!heartRateRange) {
          return null;
        }
        points = get(data, 'timeseries.heartRate', []).reduce((accumulator, rate, index) => {
          const y = findPointOnYAxis(height, heartRateRange, rate[1]);
          const x = findPointOnXAxis(width, get(data, 'timeseries.heartRate.length', 1), index);
          return accumulator + `${x},${y} `;
        }, points);
        color = Colors.heart;
        break;
      case 'home':
        if (!roomTempRange) {
          return null;
        }
        points = get(data, 'timeseries.tempRoomC', []).reduce((accumulator, rate, index) => {
          const y = findPointOnYAxis(height, roomTempRange, rate[1]);
          const x = findPointOnXAxis(width, get(data, 'timeseries.tempRoomC.length', 1), index);
          return accumulator + `${x},${y} `;
        }, points);
        color = Colors.home;

        break;
      case 'bed':
        if (!bedTempRange) {
          return null;
        }
        points = get(data, 'timeseries.tempBedC', []).reduce((accumulator, rate, index) => {
          const y = findPointOnYAxis(height, bedTempRange, rate[1]);
          const x = findPointOnXAxis(width, get(data, 'timeseries.tempBedC.length', 1), index);
          return accumulator + `${x},${y} `;
        }, points);
        color = Colors.bed;

        break;
      case 'resp':
        if (!respRange) {
          return null;
        }
        points = get(data, 'timeseries.respiratoryRate', []).reduce((accumulator, rate, index) => {
          const y = findPointOnYAxis(height, respRange, rate[1]);
          const x = findPointOnXAxis(width, get(data, 'timeseries.respiratoryRate.length', 1), index);
          return accumulator + `${x},${y} `;
        }, points);
        color = Colors.lungs;

        break;
    }
    return (
      <Svg height={`${height}`} width={`${width}`}>
        <Polyline
          stroke={color}
          fill="none"
          strokeWidth="1"
          points={points.trim()}
        />
      </Svg>
    );
  };

  return (
    <Animated.View style={[styles.container, { height: animatedHeight }]}>
      <View style={styles.row}>
        <TimelineBar stages={data.stages} tnt={data.timeseries.tnt} startTime={data.ts} />
        <Text>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</Text>
      </View>
      <View style={styles.row}>
        <Text>Time Sleeping: {displayDate}</Text>
        <View style={styles.spacer} />
        <Text style={styles.score}>Score: </Text><AnimatedNumber number={data.score} />
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <IconButton onPress={heartPressed} type="MaterialCommunityIcon" name="heart-pulse" size={heartSize} style={{ alignSelf: 'center', color: Colors.heart }}/>
          <IconButton onPress={homePressed} type="MaterialIcon" name="home" size={homeSize} style={{ alignSelf: 'center', color: Colors.home }}/>
          <IconButton onPress={bedPressed} type="MaterialCommunityIcon" name="bed-empty" size={bedSize} style={{ alignSelf: 'center', color: Colors.bed }}/>
          <IconButton onPress={respPressed} type="MaterialCommunityIcon" name="lungs" size={respSize} style={{ alignSelf: 'center', color: Colors.lungs }}/>
        </View>
        <View style={[styles.column, { padding: 5, paddingBottom: 0, flex: 1 }]}>
          <View style={[styles.row, { flex: 1 }]}>
            <View style={[styles.column, { justifyContent: 'space-between', paddingRight: 5 }]}>
              <AnimatedNumber number={parseInt(get(displayRange, '[1]', 0).toFixed(), 10)} />
              <View style={styles.spacer} />
              <AnimatedNumber number={parseInt(get(displayRange, '[0]', 0).toFixed(), 10)} />
              <Text></Text>
              <Text></Text>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View style={styles.graphContainer} onLayout={onGraphLayout}>
                {renderGraph()}
              </View>
              <View style={[styles.row, { justifyContent: 'space-between', paddingVertical: 0 }]} >
                <Text>{timeRange[0].getHours()%12 === 0 ? 12 : timeRange[0].getHours()%12}</Text>
                <Text>{timeRange[1].getHours()%12 === 0 ? 12 : timeRange[1].getHours()%12}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

Interval.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    paddingVertical: 5,
  },

  score: {
    textAlign: 'right',
  },

  spacer: { flex: 1 },

  graphContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.blue,
    flex: 1,
  },
});

export default Interval;
