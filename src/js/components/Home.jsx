import React, { Component } from "react";
import store from "../store";
import { connect } from 'react-redux';


class Home extends Component {



    render() {

        return (
            <div className="container">
                <div className="row flex-column">
                <div className="col-md"/>
                    <div className="col-md">
                        <h2> Welcome To Bigger World!</h2>
                        <p>
                            Welcome to Bigger World. When you learn a new language, your world gets "bigger".
                        </p>
                    </div>
                </div>
                <div className="col-md"/>
            </div>

        );

    }
}

const mapStateToProps = function (store) {
    return {
        user: store.userState.user
    };
}

export default connect(mapStateToProps)(Home);


