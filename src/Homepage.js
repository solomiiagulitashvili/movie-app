import React, { Fragment } from "react";
import "./styles/index.scss";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import Loader from "react-loader-spinner";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      page: 1,
      totalPages: 500,
      isLoading: true
    };
  }

  getMovies = () => {
    const { page } = this.state;
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=1325c93c5a49289becbbc8506e0ffa89&language=en-US&page=${page}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('error');
      })
      .catch(err => {
        alert(err.message);
      })
      .then(moviesList => {
        this.setState({
          moviesList: moviesList.results,
          totalPages: moviesList.total_pages,
          isLoading: false
        });
      });
  };

  handleClick = currentPage => {
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
    this.setState({ page: newPage, isLoading: false }, () => this.getMovies());
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { moviesList } = this.state;
    return (
      <div>
        <div className="moviesList">
          {this.state.isLoading ? (
            <Loader
              className="loader"
              type="TailSpin"
              color="#9c8abd"
              height={100}
              width={100}
            />
          ) : (
            <Fragment>
              {moviesList.map(movie => (
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
            </Fragment>
          )}
        </div>

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
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={() => this.handleClick('next')} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={() => this.handleClick('last')} />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default Homepage;
