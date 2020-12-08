import React from 'react';
import { View, StyleSheet } from 'react-native';

import SleepView from 'components/SleepView';

const App = () => {
  return (
    <View style={styles.container}>
      <SleepView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
