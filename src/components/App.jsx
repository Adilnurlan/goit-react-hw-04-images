// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/picturesApi';
import { imageMapper } from './ImageMapper/imageMapper';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    largeImageURL: null,
    isShown: false,
    isLoading: false,
    error: null,
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.getImages();
    }
  }

  getImages = () => {
    this.setState({ isLoading: true });
    if (this.state.query.trim() !== '') {
      const { page, query } = this.state;
      fetchImages(page, query)
        .then(({ data: { hits } }) => {
          hits.length >= 12
            ? this.setState({ loadMore: true })
            : this.setState({ loadMore: false });
          hits.length === 0 && alert('There is no image');
          this.setState(prevState => ({
            images: [...prevState.images, ...imageMapper(hits)],
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => this.setState({ isLoading: false }));
    } else {
      this.setState({ loadMore: false });
      return;
    }
  };

  handleSearchbarSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  handlerLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = largeImageURL => {
    this.setState({
      isShown: true,
      largeImageURL,
    });
  };
  closeModal = () => {
    this.setState({
      isShown: false,
    });
  };

  render() {
    const { images, loadMore, isShown, isLoading, largeImageURL } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {isLoading && <Loader />}
        {loadMore && <Button clickHandler={this.handlerLoadMore} />}
        {isShown && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
