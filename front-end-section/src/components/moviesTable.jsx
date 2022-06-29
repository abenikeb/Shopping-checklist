import React, { Component } from "react";
import Like from "./common/like";
import Date_ from "./common/Date_";
import Table from "./common/table";
import auth from "./../services/authService";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      key: "like",
      label: "SOLD",
      content: (movie) => <Like bought={movie.bought} />,
    },
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },
    {
      label: "Buying Date",
      content: (movie) => <Date_ date={movie.date} />,
    },
  ];
  deleteCol = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getUserData();
    if (user) {
      this.columns.push(this.deleteCol);
    }
  }
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        onSort={onSort}
        columns={this.columns}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
