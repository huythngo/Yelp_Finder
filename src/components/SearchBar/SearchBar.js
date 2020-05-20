import React from "react";
import "./SearchBar.css";
import Suggestions from "../Suggestions/Suggestions";
import Yelp from "../../util/Yelp";
const google = window.google;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
      businessSuggestions: [
        {
          name: "abc",
          id: "1",
        },
        {
          name: "bcd",
          id: "2",
        },
        {
          name: "cde",
          id: "3",
        },
      ],
      locationSuggestions: [
        // {
        //   name: "abc",
        //   id: "1",
        // },
        // {
        //   name: "bcd",
        //   id: "2",
        // },
        // {
        //   name: "cde",
        //   id: "3",
        // },
      ],
    };
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.searchBusinessSuggestion = this.searchBusinessSuggestion.bind(this);
    this.handleBusinessSuggestion = this.handleBusinessSuggestion.bind(this);
    this.clearBusinessSuggestion = this.clearBusinessSuggestion.bind(this);
    this.handleClickSuggestionBusiness = this.handleClickSuggestionBusiness.bind(
      this
    );
    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count",
    };
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {}
    );

    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    console.log(address);
    this.setState({
      location: addressObject.formatted_address,
    });
  }

  getSortByClass(sortByOption) {
    return sortByOption === this.state.sortBy ? "active" : "";
  }

  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption });
  }

  handleTermChange(e) {
    this.setState({ term: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleSearch(e) {
    console.log(`term: ${this.state.term}`);
    console.log(`location: ${this.state.location}`);
    this.props.searchYelp(
      this.state.term,
      this.state.location,
      this.state.sortBy
    );

    e.preventDefault();
  }

  handleClickSuggestionBusiness(e) {
    this.handleTermChange(e);
    document.getElementById("business-input").value = e.target.value;
    this.clearBusinessSuggestion();
  }
  handleBusinessSuggestion(e) {
    this.handleTermChange(e);
    this.searchBusinessSuggestion(
      document.getElementById("business-input").value
    );
    e.preventDefault();
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={this.getSortByClass(sortByOptionValue)}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  }

  clearBusinessSuggestion() {
    this.setState({ businessSuggestions: [] });
  }
  searchBusinessSuggestion(term) {
    Yelp.searchSuggestion(term).then((terms) => {
      this.setState({ businessSuggestions: terms });
    });
  }

  render() {
    return (
      <div className='SearchBar'>
        <div className='SearchBar-sort-options'>
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className='SearchBar-fields'>
          <div className='SearchBar-business'>
            <input
              id='business-input'
              onChange={this.handleBusinessSuggestion}
              placeholder='Search Businesses'
            />
            <Suggestions
              Suggestions={this.state.businessSuggestions}
              onClick={this.handleClickSuggestionBusiness}
            />
          </div>
          <div className='SearchBar-location'>
            <input
              id='location-input'
              onChange={this.handleLocationChange}
              placeholder='Where?'
              id='autocomplete'
            />
            <Suggestions
              Suggestions={this.state.locationSuggestions}
              onClick={this.handleClickLocationBusiness}
            />
          </div>
        </div>
        <div className='SearchBar-submit' onClick={this.handleSearch}>
          <a>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
