import React, { Component } from "react";
class VocabChallenge extends React.Component {
    render() {
        if (!this.props.value) {
            return <div></div>;
        }

        return (
            <div>
                <button >
                    Back
                </button>
               <div className="container">
                    Target
               </div>
               <div className="container">
                    List of choices
               </div>
            </div>
        );
    }
}
export default VocabChallenge;