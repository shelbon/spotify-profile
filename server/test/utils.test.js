'use strict';

import { test } from 'tap';
import { isTimeToRefreshToken } from '../utils.js';
import { DateTime } from 'luxon';

test('isTimeToRefreshToken return true when current date is not in interval ', async (t) => {
  let lastFetchDate = DateTime.fromHTTP('Mon, 17 May 2021 18:01:38 GMT', {
    zone: 'GMT',
  });
  let expires_in = 3600 * 1000;
  let shouldIRefresh = isTimeToRefreshToken(
    expires_in,
    DateTime.now(),
    lastFetchDate
  );
  t.equal(shouldIRefresh, true);
});
test('isTimeToRefreshToken return false when current date is in interval ', async (t) => {
  let lastFetchDate = DateTime.fromHTTP('Mon, 17 May 2021 18:01:38 GMT', {
    zone: 'GMT',
  });
  let currentDate = DateTime.fromHTTP('Mon, 17 May 2021 18:02:38 GMT', {
    zone: 'GMT',
  });
  let expires_in = 3600 * 1000;
  let shouldIRefresh = isTimeToRefreshToken(
    expires_in,
    currentDate,
    lastFetchDate
  );
  t.equal(shouldIRefresh, false);
});
test('isTimeToRefreshToken  params null should return false ', async (t) => {
  let lastFetchDate = DateTime.fromHTTP('Mon, 17 May 2021 18:01:38 GMT', {
    zone: 'GMT',
  });
  let currentDate = DateTime.fromHTTP('Mon, 17 May 2021 18:02:38 GMT', {
    zone: 'GMT',
  });
  let expires_in = 3600 * 1000;
  let shouldIRefresh = isTimeToRefreshToken(
    null,
    undefined,
    null
  );
  t.equal(shouldIRefresh, false);
});
 
 
