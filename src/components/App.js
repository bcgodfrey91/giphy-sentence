import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputTextArray: [],
    }
  }

  updateInput(e) {
    this.setState({ inputTextArray: e.target.value.split(' ') })
  }

  renderInput() {
    return this.state.inputTextArray.map((i) => <li>{i}</li>)
  }

  render() {
    return (
      <div className="App">
        <input onChange={(e) => this.updateInput(e)}/>
        <ul>
          {this.renderInput()}
        </ul>
      </div>
    );
  }
}

export default App;
