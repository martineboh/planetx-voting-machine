/*
  functions exported from this file are used in
  *  methods.js
  *  server/publications.js
  *  *.tests.js
  *  ui/components
*/

import { Meteor } from 'meteor/meteor';
import { collectionsSubscribe } from '../helpers/subscriptions.js'

const today = ()=> collectionsSubscribe('resultsToday');

export const BallotsTotalDailySubscription = {today};