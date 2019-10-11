import React, { Component } from "react";
import { Link, BrowserRouter } from 'react-router-dom';
import VocabListContainer from "../containers/VocabListContainer.jsx";
import VocabChallengeContainer from "../containers/VocabChallengeContainer.jsx";
import Home from "./Home.jsx";
import { Route, IndexRoute } from 'react-router';

class AppLayout extends Component {


    render() {
        // TODO : move this to stylesheet at some point
        const topRowStyle = {
            background: '#563d7c',
            paddingTop: '5px'

        };

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Bigger World</a>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/vocablist">Vocab List</Link></li>

                        <li className="nav-item"><Link className="nav-link" to="/challenge">Vocab Challenge</Link></li>
                    </ul>
                    <div className="row">
                        <div className="mx-2"> {this.props.user.name}</div>
                        <div className="mx-2">  XP {this.props.user.xp}</div>
                        <div className="mx-2">  Coins {this.props.user.coins}</div>
                    </div>
                </nav>
                <div className="container">
                        <Route exact path="/" component={Home} />
                        <Route path="/vocablist" component={VocabListContainer} />
                        <Route path="/challenge" component={VocabChallengeContainer} />
                  
                </div>
            </div>
        );

    }
}

export default AppLayout;
