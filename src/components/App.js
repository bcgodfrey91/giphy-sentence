import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputTextArray: [],
      giphyArray: []
    }
  }

  updateInput(e) {
    this.setState({ inputTextArray: e.target.value.split(' ') })
  }

  searchGiphyApi() {
    let arrayOfGifs = []
    this.state.inputTextArray.forEach((i) => {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${i}&api_key=dc6zaTOxFJmzC`)
    .then((res) => res.json())
    .then((response) => this.setState({ giphyArray: this.state.giphyArray.concat(response.data[Math.floor(Math.random() * 25)].images.fixed_height.url) }))
    })
    this.setState({ inputTextArray: [], giphyArray: [] })
  }

  renderGiphys() {
    return this.state.giphyArray.map((giphy) => <li key={giphy}><img src={giphy} /></li>)
  }

  render() {
    return (
      <div className="App">
        <input onChange={(e) => this.updateInput(e)}/>
        <button onClick={() => this.searchGiphyApi()}>Create Giphy Sentence</button>
        <ul>
          {this.renderGiphys()}
        </ul>
      </div>
    );
  }
}

export default App;
