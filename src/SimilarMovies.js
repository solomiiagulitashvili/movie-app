import React, { Fragment } from 'react';
import './styles/index.scss';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

class SimilarMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SimilarMoviesList: [],
      page: 1,
      totalPages: 200,
      isLoading: true,
    };
  }

  getSimilarMovies = () => {
    const { id } = this.props;
    const { page } = this.state;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=1325c93c5a49289becbbc8506e0ffa89&language=en-US&page=${page}`,
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('error');
      })
      .catch((err) => {
        alert(err.message);
      })
      .then((SimilarMoviesList) => {
        this.setState({
          SimilarMoviesList: SimilarMoviesList.results,
          totalPages: SimilarMoviesList.total_pages,
          isLoading: false,
        });
      });
  };

  handleClick = (currentPage) => {
    const { totalPages, page } = this.state;
    let newPage;
    switch (currentPage) {
      case 'first':
        newPage = 1;
        break;
      case 'previous':
        newPage = page - 1;
        break;
      case 'next':
        newPage = page + 1;
        break;
      case 'last':
        newPage = totalPages - 1;
        break;
      default:
        break;
    }
    this.setState({ page: newPage, isLoading: false }, () => this.getSimilarMovies());
  };

  componentDidMount() {
    this.getSimilarMovies();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getSimilarMovies();
    }
  }

  render() {
    const { SimilarMoviesList } = this.state;
    return (
      <Fragment>
        <h3>Similar movies:</h3>
        {this.state.isLoading ? (
          <Loader
            className="loader"
            type="TailSpin"
            color="#9c8abd"
            height={100}
            width={100}
          />
        ) : (
          <div className="similarMoviesList">
            {SimilarMoviesList.map((movie) => (
              <Link to={`/one-movie/${movie.id}`}>
                <Card>
                  <CardImg
                    top
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`}
                  />
                  <CardBody>
                    <CardTitle>{movie.title} </CardTitle>
                    <CardSubtitle>{movie.release_date} </CardSubtitle>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        )}
        <Pagination aria-label="Page navigation example" className="pagination">
          <PaginationItem>
            <PaginationLink first onClick={() => this.handleClick('first')} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              previous
              onClick={() => this.handleClick('previous')}
            />
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink>{this.state.page} </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={() => this.handleClick('next')} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={() => this.handleClick('last')} />
          </PaginationItem>
        </Pagination>
      </Fragment>
    );
  }
}

SimilarMovies.propTypes = {
  id: PropTypes.number,
};

export default SimilarMovies;
