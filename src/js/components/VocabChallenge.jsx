import React from "react";

import Popup from "reactjs-popup";

class VocabChallenge extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, popupMessage: "Wrong!" };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(message) {
        this.setState({ open: true, popupMessage: message });
    }

    closeModal() {
        this.setState({ open: false });
    }

    clickAnswer(isRight) {
    
        if (isRight) {
            this.openModal("Correct!  You earned +10 coins and +10 xp!");
           this.props.correct();

        } else {
            this.openModal("Wrong!  You get nothing.");
            this.props.wrong();

        }

    }

    render() {
        return (
            <div >
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                    contentStyle={{ width: "300px", padding: "5px" }}>
                    <div className="container" >
                        <div className="row">
                            <div className="col text-center">
                                <p >{this.state.popupMessage}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        this.closeModal();
                                    }}>
                                    Close
               </button>
                            </div>
                        </div>
                    </div>
                </Popup>

                <div className="container ">
                    <div className="row my-2">
                        <div className="mx-auto">
                            <h2>Vocab Challenge</h2>
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="mx-auto">
                            {this.props.target.native1}
                        </div>
                    </div>

                    <div className="row my-2" >

                        <div className="mx-auto">
                            {
                                this.props.distractors.map(vocab =>
                                    <button key={vocab.id} className="btn btn-primary" onClick={() => this.clickAnswer(vocab.id == this.props.target.id)}>
                                        {vocab.english}
                                    </button>)
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default VocabChallenge;