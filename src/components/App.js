import React, { Component } from 'react'
import '../styles/App.css';

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

  handleInput = (e) => {
    const inputTextArray = e.target.value.split(' ')
    const searchQuery = inputTextArray.join(' ')
    this.setState({ inputTextArray, searchQuery })
  }

  generateApiUrl(text) {
    return `https://api.giphy.com/v1/gifs/search?q=${text}&api_key=dc6zaTOxFJmzC`
  }

  promisifyApiCalls() {
    return this.state.inputTextArray
      .map(text => fetch(this.generateApiUrl(text.toLowerCase())))
  }

  handlePromises(promises) {
    promises.forEach((promise) => {
      const giphy = promise.data[Math.floor(Math.random() * promise.data.length)]
      const giphyArray = [...this.state.giphyArray, giphy]
      this.setState({ giphyArray })
    })
  }

  handleApiSearch = () => {
    const previousQuery = this.state.searchQuery

    this.setState({ giphyArray: [], previousQuery }, () => {
      this.setState({ searchQuery: '', inputTextArray: [] })
    })

    Promise.all(this.promisifyApiCalls())
      .then((gifResponses) => gifResponses.map((gif) => gif.json()))
      .then((gifPromises) => Promise.all(gifPromises))
      .then((resolvedGifPromises) => this.handlePromises(resolvedGifPromises))
      .catch((error) => {
        alert('One of your queries was invalid. Please try again.')
        this.setState({ giphyArray: [] })
      })
  }

  renderGiphys() {
    return this.state.giphyArray.map((giphy, index) => {
      return (
        <li
          className='giphy-item'
          key={index}
        >
          <a
            href={giphy.url}
            className='giphy-link'
          >
            <img
              className='giphy-image'
              src={giphy.images.original.url}
              alt='Giphy from user search'
            />
          </a>
        </li>
      )
    })
  }

  render() {
    return (
      <div
        className='App'
      >
        <input
          className='user-input'
          placeholder='Create a Giphy Sentence'
          value={this.state.searchQuery}
          onChange={this.handleInput}
        />
        <button
          className='create-sentence-button'
          onClick={this.handleApiSearch}
        >
          Create
        </button>
        <h1
          className='previous-query'
        >
          {this.state.previousQuery}
        </h1>
        <ul
          className='giphy-list'
        >
          {this.renderGiphys()}
        </ul>
      </div>
    )
  }
}

export default App
