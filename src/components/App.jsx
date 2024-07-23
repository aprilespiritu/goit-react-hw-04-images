import {useState, useEffect} from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';
import { getAPI } from 'pixabay-api';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  
  useEffect(() => {
    if (search === '') return;

    (async () => {
      await fetchImages(search, page);
    })();
  }, [search, page]);

  const fetchImages = async (search, page) => {
    try {
      setIsLoading(true);
      setIsEnd(false);

      //fetch data from API
      const fetchedImages = await getAPI(search, page);
      const { hits, totalHits } = fetchedImages;

      //no images found error
      if (hits.length === 0) {
        toast.error(
          'Sorry, no images found. Please try again.'
        );
        return;
      }

      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images!`);
      }

      if (page * 12 >= totalHits) {
        setIsEnd(true);
        toast("We're sorry, but you've reached the end of search results.", {
          icon: '👋',
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        });
      }
      // Update the state with the new images
      setImages(prevState => [...prevState, ...hits]);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = e => {
    e.preventDefault();

    const newSearch = e.target.search.value.trim().toLowerCase();

    // Checks if the searchbar is empty
    if (newSearch === '') {
      toast.error('Please enter a search.');
      return;
    }

    // Checks if search is different from previous search
    if (newSearch !== search) {
      setSearch(newSearch);
      setPage(1);
      setImages([]);
    }
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearch} />
      {images.length >= 1 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {!isLoading && !isError && images.length > 0 && !isEnd && (
        <Button onClick={handleLoadMore} />
      )}
      {isError && <p>Something went wrong. Please try again.</p>}
      <Toaster position="top-right"/>
    </div>
  );
};