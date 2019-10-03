import React, { Component } from "react";
class VocabList extends React.Component {
    render() {
        if (!this.props.value) {
            return <div></div>;
        }

        return (
            <div>
                <ul>{
                    this.props.value.map(vocab =>
                        <li key={vocab.id}>
                            {vocab.native1}{vocab.native2}{vocab.english}
                        </li>)
                }
                </ul>

            </div>
        );
    }
}
export default VocabList;