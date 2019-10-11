import React, { Component } from "react";
import VocabList from "../components/VocabList.jsx";
import { connect } from 'react-redux';

class VocabListContainer extends React.Component {
    render() {
        if (!this.props.vocab) {
            return <div></div>;
        }

        return (
           <VocabList  vocab={this.props.vocab} />
        );
    }
}
const mapStateToProps = function(store) {
    return {
      vocab: store.vocabState.vocab
    };
  }
  
  export default connect(mapStateToProps)(VocabListContainer);
