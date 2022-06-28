import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import Pagiation from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "./utils/paginate";
import { getMovies, deleteMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    searchQuery: "",
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async (movie) => {
    const orginalState = this.state.movies;

    const movies = orginalState.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovies(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This post alerady deleted");
      this.setState({ movies: orginalState });
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePage = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
      movies: allMovies,
      selectedGenre,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { user } = this.props;
    const {
      currentPage,
      pageSize,
      sortColumn,
      genres,
      searchQuery,
      selectedGenre,
    } = this.state;
    // if (count === 0) return <p>ther is no tags</p>;

    const { totalCount, movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItems={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col-9">
          {user && (
            <Link
              className="btn btn-primary"
              style={{ marginBottom: 10 }}
              to="/movies/new"
            >
              New Movies
            </Link>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <h5>showing {totalCount} items in the movies</h5>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagiation
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
