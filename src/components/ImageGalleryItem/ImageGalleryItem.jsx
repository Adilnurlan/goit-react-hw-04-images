function ImageGalleryItem({ pic, largeImageURL, openModal }) {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => {
        openModal(largeImageURL);
      }}
    >
      <img className="ImageGalleryItem-image" src={pic} alt="" />
    </li>
  );
}

export default ImageGalleryItem;
