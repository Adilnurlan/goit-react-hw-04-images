// import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services/picturesApi';
import { imageMapper } from './ImageMapper/imageMapper';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (page !== 1 || query !== '') {
      if (query === '') {
        setLoadMore(false);
        return;
      }
      setIsLoading(true);
      fetchImages(page, query)
        .then(({ data: { hits } }) => {
          hits.length >= 12 ? setLoadMore(true) : setLoadMore(false);
          hits.length === 0 && alert('There is no image');
          setImages(prevImages => [...prevImages, ...imageMapper(hits)]);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [page, query]);

  const handleSearchbarSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handlerLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    setIsShown(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setIsShown(false);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchbarSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {loadMore && <Button clickHandler={handlerLoadMore} />}
      {isShown && <Modal largeImageURL={largeImageURL} onClose={closeModal} />}
    </div>
  );
};
