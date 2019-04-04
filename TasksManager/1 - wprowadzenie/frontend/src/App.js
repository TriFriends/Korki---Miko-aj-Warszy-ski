import React, { Component } from 'react';
import './App.css';
import Axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: []
    }
  }
  componentDidMount() {
    Axios.get("http://localhost:3001")
      .then((res) => {
        this.setState({
          people: res.data
        })
      })
  }
  render() {
    console.log(this.state.people)
    return (
      <div className="App">
        {
          this.state.people.map((value, index) => {
            return (
              <div key={index}>
                {
                  value.first_name
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
