import React, { Component } from "react";
import Groups from "./Groups.jsx";
import VocabList from "./VocabList.jsx";
class App extends Component {
    constructor() {
        super();

        this.state = { groups: null, vocab: null };
    }

    componentDidMount() {
        fetch('/group')
            .then(response => response.json())
            .then(data => this.setState({ groups:data.groups }));

        fetch('/vocab')
            .then(response => response.json())
            .then(data => this.setState({ vocab: data.words }));
    }
   

    render() {
      
        return (
            <div className="game">
                <div className="game-board">
                    <Groups value={this.state.groups} />
                </div>
                <div className="game-board">
                    <VocabList value={this.state.vocab} />
                </div>
            </div>
        );

    }
}
export default App;

