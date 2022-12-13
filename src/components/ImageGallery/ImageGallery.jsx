import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            pic={webformatURL}
            openModal={openModal}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ul>
  );
};
