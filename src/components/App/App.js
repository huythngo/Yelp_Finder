import React from "react";
import logo from "../../logo.svg";
import "./App.css";
import BusinessList from "../Business/BusinessList";
import Yelp from "../../util/Yelp";
import SearchBar from "../SearchBar/SearchBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then((businesses) => {
      this.setState({ businesses: businesses });
    });
  }

  // searchBusinessSuggestion(term) {
  //   Yelp.searchSuggestion(term).then((terms) => {
  //     this.setState({ businessSuggestions: terms });
  //   });
  // }

  render() {
    return (
      <div className='App'>
        <h1>Yelp! Finder</h1>
        <SearchBar
          searchYelp={this.searchYelp}
          searchBusinessSuggestion={this.searchBusinessSuggestion}
          businessSuggestions={this.state.businessSuggestions}
        />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
