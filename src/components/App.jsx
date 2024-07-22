import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getAPI } from 'pixabay-api';
import css from './App.module.css';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

};

useEffect(() => {
  if (search === '') return;
  (async () => {
    await fetchImages(search, page)
  })();
  
  return () => { };
}, [search, page]);
    
  
const fetchImages = async () => {
  setIsLoading(true);
  
  try {
    //Fetch images from API
    const response = await getAPI(search, page);
    const { totalHits, hits } = response;
    console.log(hits, totalHits);
    
    //Checks if API returns images for the search query
    if (hits.length === 0) {
      toast.error('Sorry, there are no images found.Please try again.');
      setIsLoading(false);
      return;
    }

    //Displays message when first page is loaded
    if (page === 1) {
      toast.success(`Hooray! We found ${totalHits} images!`);
    }

    //Checks if all found images have been shown
    if (page * 12 >= totalHits) {
      setIsEnd(true);
      toast("You have reached the end of your search results.", {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

    setImages(prevImages => 
      page === 1 ? hits : [...prevImages, ...hits],
    );
    setIsEnd(prevIsEnd => images.length + hits.length >= totalHits); 
  } catch (error) {
      //Handle errors 
      setIsError(true);
      toast.error('Oops, something went wrong! Reload this page!');
    } finally {
      //Resets loading state once API request is complete
      this.setState({ isLoading: false });
    }
  };


    

  }
      

      
      
      
      

      
  handleSearchSubmit = e => {
    e.preventDefault();

    const { search } = this.state;
    const newSearch = e.target.search.value.trim().toLowerCase();

    //Check if new search
    if (newSearch !== search) {
      this.setState({
        search: newSearch,
        page: 1,
        images: []
      });
    } 
  };

  handleLoadMore = () => {
    //Load more images
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {/*Render ImageGallery*/}
        {images.length >= 1 && <ImageGallery images={images} />}
        {/*Render Load More Button*/}
        {images.length >= 1 && !isEnd && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        {isError && toast.error('Oops, something went wrong! Reload this page!')}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }
}
