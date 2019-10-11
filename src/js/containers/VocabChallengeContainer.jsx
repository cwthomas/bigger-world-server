import React from "react";
import { connect } from 'react-redux';

import VocabChallenge from "../components/VocabChallenge.jsx";


class VocabChallengeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quizWords: [], targetWord: {id:"",native1:"", native2:"", english:""} };
  }
  // choose word from vocab
  // 
  pickRandom() {
    const limit = this.props.vocab.length;
    const randomWordIndex = Math.floor(Math.random() * limit);
    return this.props.vocab[randomWordIndex];
  }

  pickDistractors(number) {
    var distractorList = [];

    for (var i = 0; i < number; i++) {
      const newWord = this.pickRandom();
      distractorList.push(newWord);
    }
    return distractorList;
  }

  // taken from : http://sedition.com/perl/javascript-fy.html
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  nextQuestion() {
    const vocab = this.pickRandom();
    const vocabDistractors = this.pickDistractors(4);
    this.state.targetWord = vocab;
    this.state.quizWords = this.shuffle([vocab, ...vocabDistractors]);
  }

  render() {
    if (this.props.vocab.length==0){
      return (<div></div>);
    }
    this.nextQuestion();
   

    return (
      <div>   
        <VocabChallenge target={this.state.targetWord} distractors={this.state.quizWords}  />
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    vocab: store.vocabState.vocab
  };
}

export default connect(mapStateToProps)(VocabChallengeContainer);
