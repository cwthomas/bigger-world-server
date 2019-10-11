import React, { Component } from "react";
import VocabCard from "./VocabCard.jsx";
class VocabList extends React.Component {
    render() {
        if (!this.props.vocab) {
            return <div></div>;
        }

        return (
            <div className="container">
                <div className="row">
                    <h1>JLPT 5 Vocabulary List</h1>
                </div>
                <div className="row">
                    {
                        this.props.vocab.map(vocab =>
                            <VocabCard key={vocab.id} {...vocab} />
                        )
                    }
                </div>

            </div>
        );
    }
}
export default VocabList;