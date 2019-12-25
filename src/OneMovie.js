import React from "react";
import "./styles/index.scss";
import { Media } from "reactstrap";

class OneMovie extends React.Component {
  getMovieInfo = () => {
    const { id } = this.props.location.aboutProps;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1325c93c5a49289becbbc8506e0ffa89&language=en-US`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("error");
      })
      .then(movieInfo => console.log(movieInfo));
  };

  componentDidMount() {
    this.getMovieInfo();
  }

  render() {
    return (
      <Media>
        <Media left>
          <Media
            object
            data-src="holder.js/64x64"
            alt="Generic placeholder image"
          />
        </Media>
        <Media body>
          <Media heading>Media heading</Media>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </Media>
      </Media>
    );
  }
}

export default OneMovie;
