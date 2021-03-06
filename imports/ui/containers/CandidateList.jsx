// Libraries - Imported
import { Random }               from 'meteor/random';
import Tracker                  from 'tracker-component';
import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';
// Libraries - UI
import Paper from 'material-ui/Paper';
// Libraries - Local
import { shuffle } from '../../lib/javascript.js';

// Actions
import { fetchCandidates, subscriptionForCandidatesPending }  from '../actions/Candidates.js';
import { loadBallotforAccount, updateBallotForCandidate }     from '../actions/Ballot.js';

// Components
import CandidatesList from '../components/candidatesList/List.jsx';


// Candidates Container - Show All Candidates
// Container: interacts with store and db
class CandidatesListContainer extends Tracker.Component {
  componentWillMount() {
    const {dispatch} = this.props;

    this.autorun(()=> {
      this.subscribe('candidates');
      dispatch( fetchCandidates() );
    });

    this.autorun(()=> {
      if( Meteor.userId() ) {
        this.subscribe('myBallot');
        dispatch( loadBallotforAccount() );
      }
    });
  }

  render() {
    const {items} = this.props;

    return (
      <CandidatesList
        items     = {shuffle(items)}
        onSelect  = {this.onSelectCandidate.bind(this)}
      />
    );
  }

  onSelectCandidate = candidateId => {
    const {dispatch} = this.props;
    dispatch( updateBallotForCandidate(candidateId) );
  }
}

function mapStoreToProps(store) {
  const { Candidates } = store;

  const {
    items,
  } = Candidates || {
    items: []
  }

  return {
    items
  }
}

export default connect(mapStoreToProps)(CandidatesListContainer)
