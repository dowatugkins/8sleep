/**
 * Copyright (c) 2020-present, Doug Watkins Development.
 * All rights reserved.
 * @author Doug Watkins
 * @module app/hooks
 */

import { useState, useEffect } from 'react';

function useSleepData(urls) {
  const [sleepData, setSleepData] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    loadData();
  }, [urls]);

  const loadData = async () => {
    const newSleepData = [];
    for (let url of urls) {
      const individualSleepData = await getSleepData(url);
      if (individualSleepData) {
        newSleepData.push(individualSleepData);
      }
    }
    setSleepData(newSleepData);
    setFetching(false);
  };

  const getSleepData = (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return undefined;
      });
  };

  return ({ sleepData, fetching });
}

export default useSleepData;
