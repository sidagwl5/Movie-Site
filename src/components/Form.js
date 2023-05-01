import React, { Component } from "react";
import * as func from "../scripts/Functions";
import store from "./Store";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      data: "",
      url: "",
      content: "",
    };
  }

  componentDidMount() {
    func.setAuthListener();
  }

  handleChange(e) {
    if (e.target.files) {
      this.setState({
        image: e.target.files[0],
      });
    }
  }

  handleClick() {
    if (
      this.state.data &&
      this.state.image &&
      this.state.url &&
      this.state.content
    ) {
      func.storeImage(
        this.state.image,
        store.User.id,
        this.state.data,
        this.state.url,
        this.state.content,
        this.state.category
      );
    } else {
      alert("You are requested to enter all the details");
    }
  }

  render() {
    return (
      <div className="form-main">
        <h1>Movie Form</h1>

        <div className="input-field">
          <label htmlFor="first_name">Movie Name :</label>
          <input
            id="first_name"
            type="text"
            onChange={(e) => this.setState({ data: e.target.value })}
            className="validate"
          />
        </div>

        <div className="input-field">
          <label htmlFor="first_name">URL :</label>
          <input
            id="first_name"
            type="text"
            onChange={(e) => this.setState({ url: e.target.value })}
            className="validate"
          />
        </div>

        <div className="input-field">
          <label htmlFor="first_name">Category :</label>
          <input
            id="first_name"
            type="text"
            onChange={(e) => this.setState({ category: e.target.value })}
            className="validate"
          />
        </div>

        <div className="input-field">
          <label htmlFor="first_name">Description :</label>
          <input
            id="first_name"
            type="text"
            onChange={(e) => this.setState({ content: e.target.value })}
            className="validate"
          />
        </div>

        <div className="input-field">
          <label
            style={{ backgroundColor: "#011f4b", borderRadius: "5px" }}
            for="file"
          >
            Upload Picture
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => this.handleChange(e)}
            className="validate"
          />
        </div>

        <button onClick={() => this.handleClick()} type="button">
          Submit
        </button>
      </div>
    );
  }
}

export default Form;
