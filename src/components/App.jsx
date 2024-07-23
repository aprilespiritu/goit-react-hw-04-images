import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';
import { Toaster } from 'react-hot-toast';
import { useImages } from '../context/ImageContext';

const App = () => {
  const {
    images,
    isLoading,
    isError,
    isEnd,
    handleSearchSubmit,
    handleLoadMore,
    uniqueTags,
  } = useImages();
  
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {!isLoading && !isError && images.length > 0 && !isEnd && (
        <Button onClick={handleLoadMore}/>
      )}
      {isError && <p>Something went wrong. Please try again.</p>}
      <div className={css.UniqueTags}>
        <h2>Unique Tags</h2>
        <ul>
          {uniqueTags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <Toaster position="top-right" reverseOrder={false}/>
    </div>
  )
};

export default App;