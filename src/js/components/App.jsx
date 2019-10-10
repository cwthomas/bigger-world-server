import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import Groups from "./Groups.jsx";
import VocabList from "./VocabList.jsx";
import VocabChallenge from "./VocabChallenge.jsx";

class App extends Component {


    render() {
       return(
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        Coins { this.props.user.coins}
                    </div>
                    <div className="col-sm">
                        Inventory
                    </div>
                    <div className="col-sm">                        
                        {this.props.user.name}
                    </div>
                </div>

                <div className="row">
                    
                    <div className="col-sm">
                        <VocabList vocab={this.props.vocab} />
                    </div>
                </div>
              
                <div className="container">
                    <button>Drill</button>
                </div>
            </div>
        );

    }
}

export default App;
