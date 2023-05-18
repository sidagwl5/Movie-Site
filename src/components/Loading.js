import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="loading-main">
        <div className="loading"></div>
        <div>
          <h5>Loading...</h5>
        </div>
      </div>
    );
  }
}

export default Loading;
