import React, { Fragment } from "react";
import "./styles/index.scss"; 
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import SimilarMovies from "./SimilarMovies";

class OneMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInfo: {},
      genres: [],
      languages: [],
      countries: [],
      companies: [],
      isLoading: true,
    };
  }

  getMovieInfo = () => {
    const { id } = this.props.match.params;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1325c93c5a49289becbbc8506e0ffa89&language=en-US`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("error");
      })
      .catch(err => {
        alert(err.messsage);
      })
      .then(movieInfo => {
        this.setState({
          movieInfo,
          genres: movieInfo.genres,
          languages: movieInfo.spoken_languages,
          countries: movieInfo.production_countries,
          companies: movieInfo.production_companies,
          isLoading: false
        });
      });
  };

  componentDidMount() {
    this.getMovieInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getMovieInfo();
    }
  }

  render() {
    const { movieInfo, genres, languages, countries, companies } = this.state;
    return (
      <Fragment>
        {this.state.isLoading ? (
          <Loader
            className="loader"
            type="TailSpin"
            color="#9c8abd"
            height={100}
            width={100}
          />
        ) : (
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`}
                  className="card-img"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{movieInfo.original_title} </h5>
                  <p className="card-text">{movieInfo.release_date}</p>
                  <p className="card-text">Budget: {movieInfo.budget} $</p>
                  <p className="card-text">Tagline: {movieInfo.tagline}</p>
                  <p className="card-text">Overview: {movieInfo.overview}</p>

                  <p className="card-text">
                    Genres:{" "}
                    {genres.map((genre, index) => (
                      <small className="text-muted">
                        {genre.name}
                        {index === genres.length - 1 ? " " : ", "}
                      </small>
                    ))}
                  </p>
                  <p className="card-text">
                    Languages:{" "}
                    {languages.map((language, index) => (
                      <small className="text-muted">
                        {language.name}
                        {index === languages.length - 1 ? " " : ", "}
                      </small>
                    ))}
                  </p>
                  <p className="card-text">
                    Countries:{" "}
                    {countries.map((country, index) => (
                      <small className="text-muted">
                        {country.name}
                        {index === countries.length - 1 ? " " : ", "}
                      </small>
                    ))}
                  </p>
                  <p className="card-text">
                    Companies:{" "}
                    {companies.map((company, index) => (
                      <small className="text-muted">
                        {company.name}
                        {index === companies.length - 1 ? " " : ", "}
                      </small>
                    ))}
                  </p>
                  <p className="card-text">
                    Average rating {movieInfo.vote_average} (based on{" "}
                    {movieInfo.vote_count} votes).{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <SimilarMovies id={this.props.match.params.id} />
      </Fragment>
    );
  }
}

OneMovie.propTypes = {
  match: PropTypes.object
};

export default OneMovie;
