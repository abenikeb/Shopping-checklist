import React, { Component } from "react";
import joi from "joi-browser";
import Login from "./common/login";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "./../services/movieService";

class MovieForm extends Login {
  state = {
    data: {
      title: "",
      genreId: "",
      bought: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    geners: [],
    errors: {},
  };
  schema = {
    _id: joi.string(),
    title: joi.string().required().label("Title"),
    genreId: joi.string().required().label("Genres"),
    numberInStock: joi.required().label("NumberInStock"),
    dailyRentalRate: joi
      .string()
      .required()
      .min(0)
      .max(10)
      .label("dailyRentalRate"),
  };

  async populateGenres() {
    const { data: geners } = await getGenres();
    this.setState({ geners });
  }
  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId == "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movieform: </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genere", this.state.geners)}
          {this.renderChecked("bought", "Is Bought", this.state.geners)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
