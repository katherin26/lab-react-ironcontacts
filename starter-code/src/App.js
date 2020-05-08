import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import contacts from "./contacts.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: contacts.splice(0, 5),
    };
  }

  handleOnClick() {
    let randomIndex = Math.floor(contacts.length * Math.random());
    this.setState((state) => {
      return {
        //I used Array.prototype.concat() because I need to concat the contacts in the component state  to 1 random contact.
        //If I have the randomIndex ! and this one has the index from the array of contacts I used splice to get one contact and add the new one to the Array. :D
        contacts: state.contacts.concat(contacts.splice(randomIndex, 1)),
      };
    });
  }

  sortnameOnClick() {
    this.setState((state) => {
      return {
        contacts: state.contacts.sort((a, b) => a.name.localeCompare(b.name)),
      };
    });
  }

  removebuttonOnClick(index) {
    this.setState((state) => {
      state.contacts.splice(index, 1);
      return {
        contacts: state.contacts,
      };
    });
  }

  sortpopularityOnClick() {
    this.setState((state) => {
      return {
        contacts: state.contacts.sort(function sortingFunction(
          contact1,
          contact2
        ) {
          if (contact1.popularity > contact2.popularity) return 1;
          else if (contact2.popularity > contact1.popularity) return -1;
          else return 0;
        }),
      };
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">IRON CONTACTS</h1>
        </header>
        <p className="App-intro">
          <button onClick={() => this.handleOnClick()}>
            Add Random Contact
          </button>
          <button onClick={() => this.sortnameOnClick()}>Sort By Name</button>
          <button onClick={() => this.sortpopularityOnClick()}>
            Sort By Popularity
          </button>
        </p>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((n, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={n.pictureUrl} />
                  </td>
                  <td>{n.name}</td>
                  <td>{n.popularity}</td>
                  <td>
                    <button onClick={() => this.removebuttonOnClick(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
