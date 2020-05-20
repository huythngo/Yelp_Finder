import React from "react";
import "./Business.css";

class Business extends React.Component {
  render() {
    return (
      <div className='Business'>
        <a href={this.props.business.website} target='_blank'>
          <div className='image-container'>
            <img src={this.props.business.imageSrc} alt='' />
          </div>
        </a>
        <h2>{this.props.business.name}</h2>
        <div className='Business-information'>
          <div className='Business-address'>
            <p>{this.props.business.address}</p>
            <p>{this.props.business.city}</p>
            <p>
              {this.props.business.state} {this.props.business.zipCode}
            </p>
            <p>
              <a
                href={`https://www.yelp.com/map/${this.props.business.alias}`}
                target='_blank'
              >
                View Direction
              </a>
            </p>
          </div>
          <div className='Business-reviews'>
            <h3>{this.props.business.category}</h3>
            <h3 className='rating'>{this.props.business.rating} stars</h3>
            <div className='status-container'>
              {this.props.business.isClosed ? (
                <h2 className='Closed-status'>Closed</h2>
              ) : (
                <h2 className='Open-status'>Open</h2>
              )}
            </div>

            <p>{this.props.business.reviewCount} reviews</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
