import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
    }
  }

  updateInput(e) {
    this.setState({ inputText: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <input onChange={(e) => this.updateInput(e)}/>
      </div>
    );
  }
}

export default App;
