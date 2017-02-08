import React, { Component } from 'react'

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputTextArray: [],
      giphyArray: [],
      previousQuery: '',
      searchQuery: ''
    }
  }

  generateApiUrl(text) {
    return `http://api.giphy.com/v1/gifs/search?q=${text}&api_key=dc6zaTOxFJmzC`
  }

  promisifyApiCalls() {
    return this.state.inputTextArray
      .map(text => fetch(this.generateApiUrl(text)))
  }

  handleInput = (e) => {
    const inputTextArray = e.target.value.split(' ')
    const searchQuery = inputTextArray.join(' ')
    this.setState({ inputTextArray, searchQuery })
  }

  handleApiSearch = () => {
    const previousQuery = this.state.searchQuery

    this.setState({ giphyArray: [], previousQuery }, () => {
      this.setState({ searchQuery: '' })
    })

    Promise.all(this.promisifyApiCalls()).then((gifResponse) => {
      gifResponse.forEach((gif) => {
        gif.json()
          .then((response) => {
            const giphy = response.data[Math.floor(Math.random() * 25)]
            const giphyArray = [...this.state.giphyArray, giphy]
            this.setState({ giphyArray })
          });
      })
    })
  }

  renderGiphys() {
    return this.state.giphyArray.map((giphy, index) => {
      return (
        <li key={index}>
          <img src={giphy.images.fixed_height.url} />
        </li>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <input
          value={this.state.searchQuery}
          onChange={this.handleInput}
        />
        <button
          onClick={this.handleApiSearch}
        >
          Create Giphy Sentence
        </button>
        <h1>{this.state.previousQuery}</h1>
        <ul>
          {this.renderGiphys()}
        </ul>
      </div>
    );
  }
}

export default App;
