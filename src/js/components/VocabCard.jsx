import React, { Component } from "react";
class VocabCard extends React.Component {
    render() {

        return (
       
                <div className="card w-25 m-1" >
                    <div className="card-body">
                        <h5 className="card-title">{this.props.native1}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.props.native2}</h6>
                        <p className="card-text">{this.props.english}</p>
                    </div>
                </div>
          
        );
    }
}
export default VocabCard;