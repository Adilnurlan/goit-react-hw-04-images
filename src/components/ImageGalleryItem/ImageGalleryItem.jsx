function ImageGalleryItem({ pic: { webformatURL, largeImageURL } }) {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt="" />
    </li>
  );
}

export default ImageGalleryItem;
