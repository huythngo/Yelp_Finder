const Yelp = {
  search(term, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        },
      }
    )
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          return {};
        },
        (error) => console.log(error.message)
      )
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => ({
            id: business.id,
            alias: business.alias,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
            website: business.url,
            isClosed: business.is_closed,
          }));
        }
        return [];
      });
  },
};

export default Yelp;
