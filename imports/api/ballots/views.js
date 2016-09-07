const debug = false;
/*
  functions exported from this file are used in
  *  methods.js
  *  server/publications.js
  *  *.tests.js
  *  ui/components
*/

import { Meteor } from 'meteor/meteor';
import { getQuery } from '../helpers/getQuery.js';
import { Ballots } from './collections.js';

const publicFields = {
  _id:            1,
  candidateId:    1,
};

const all = (filters)=> {
  if(debug || filters){
    console.log("ITEMVIEW: all");
  }

  if(filters){
    console.log("Where did filters come from?", filters);
  }

  const query = {
    _id:    {$ne: "init"}
  };

  if(Meteor.isClient){
    const results = Ballots.find(query, publicFields).fetch();

    if(debug){
      console.log(`Publishing Ballots: ${results.length}`);
    }

    return results;
  } else {
    const results= Ballots.find(query, publicFields);

    if(debug == 2){
      console.log(`Publishing All (${results.count()}) Ballots: `, results.fetch());
    }

    return results;
  }
};

const one = (target, filters) => {
  if(debug){
    console.log("ITEMVIEW: one");
  }

  const options = {_id: target};
  if(Meteor.isClient){
    const result = Ballots.findOne(options, publicFields);

    if(debug == 2){
      console.log(`Fetched Ballot[${target}]:  `, result);
    }

    return result;
  } else {
    return Ballots.find(options, publicFields);
  }
};

export const BallotsView = {all, one};