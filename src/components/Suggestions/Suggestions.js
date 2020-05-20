import React from "react";
import ReactDOM from "react-dom";
import "./Suggestions.css";

class Suggestions extends React.Component {
  render() {
    return (
      <div className='Suggestions'>
        {this.props.Suggestions.map((business) => {
          return (
            <input
              onClick={this.props.onClick}
              key={business.id}
              value={business.name}
              readOnly
            />
          );
        })}
      </div>
    );
  }
}

export default Suggestions;
