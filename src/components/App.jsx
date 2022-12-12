// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/picturesApi';
import { imageMapper } from './ImageMapper/imageMapper';
import { Button } from './Button/Button';

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    currentImage: null,
    isShown: false,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.getImages();
    }
  }

  getImages = () => {
    const { page, query } = this.state;
    fetchImages(page, query).then(({ data: { hits } }) => {
      this.setState(prevState => ({
        images: [...prevState.images, ...imageMapper(hits)],
      }));
    });
  };

  handleSearchbarSubmit = query => {
    this.setState({
      query,
    });
  };

  handlerLoadMore = () => {};

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery images={this.state.images} />
        {!this.state.images === [] && (
          <Button clickHandler={this.handlerLoadMore} />
        )}
      </div>
    );
  }
}
