import React, { Component } from "react";
class Groups extends React.Component {
 

  render() {
      if (!this.props.value) {
          return <div></div>;
      }

    return (
        <div>
            <ul>{
                this.props.value.map(group =>
                    <li key={group.id}>
                        {group.id}{group.cost}
                        </li>)
            }
                </ul>
         
      </div>
    );
  }
}

export default Groups;
