import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import axios from "axios";

function CardList(props) {
  return (
    <div>
      {props.profiles.map((item) => (
        <Card {...item} />
      ))}
      {/* <Card {...testData[0]} />
      <Card {...testData[1]} />
      <Card {...testData[2]} /> */}
    </div>
  );
}

class Card extends React.Component {
  render() {
    return (
      <div className="github-profile">
        <img src={this.props.avatar_url} alt="profile-photo" />
        <div className="info">
          <div className="name">{this.props.name}</div>
          <div className="company">{this.props.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { inputValue: "" };

  handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.inputValue}`
    );
    this.props.addUserFunctionality(resp.data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="GitHub user"
          value={this.state.inputValue}
          onChange={(event) =>
            this.setState({ inputValue: event.target.value })
          }
        />
        <button type="submit">Add user</button>
      </form>
    );
  }
}

function App(props) {
  //getting acces to profiles both to form and cardlist
  const [profiles, setProfiles] = useState([]);

  const addUser = (user) => {
    setProfiles([...profiles, user]);
  };
  return (
    <div className="App">
      <h1>{props.title}</h1>
      <Form addUserFunctionality={addUser} />
      <CardList profiles={profiles} />
    </div>
  );
}

export default App;
