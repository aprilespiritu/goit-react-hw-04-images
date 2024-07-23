import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useMemo,
    Children,
} from 'react';
import { getAPI } from 'pixabay-api';
import toast from 'react-hot-toast';

const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            if (!search) return;

            setIsLoading(true);
            setIsError(false);

            try {
                const response = await getAPI(search, page);
                const { totalHits, hits } = response;

                if (hits.lenght === 0) {
                    toast.error('Sorry, no images found. Please try again.');
                    setIsLoading(false);
                    return;
                }

                if (page === 1) {
                    toast.success(`Hooray! We found ${totalHits} images!`);
                }

                setImages(prev => (page === 1 ? hits : [...prev, ...hits]));
                setIsEnd(page * 12 >= totalHits);
            } catch (error) {
                setIsError(true);
                toast.error('Oops, something went wrong! Reload this page!');
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [search, page]);

    const handleSearchSubmit = search => {
        const normalizedSearch = search.trim().toLowerCase();

        if (normalizedSearch === '') {
            alert(`Invalid search. Please try again.`);
            return;
        }

        if (normalizedSearch === search) {
            alert(`Search is the same as previous one. Please run a new search.`);
            return;
        }

        setSearch(normalizedSearch);
        setPage(1);
        setImages([]);
        setIsEnd(false);
    };

    const handleLoadMore = () => {
        if (!isEnd) {
            setPage(prev = prev + 1);
        } else {
            toast("You have reached the end of your search results.", {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    };

    const uniqueTags = useMemo(() => {
        console.log('Calculating unique tags...');
        const tagSet = new Set();
        images.forEach(image => {
            image.tags.split(', ').forEach(tag => tagSet.add(tag));
        });
        console.log('Unique tags calculated:', Array.from(tagSet));
        return Array.from(tagSet);
    }, [images]);

    return (
        <ImageContext.Provider
            value={{
                images,
                isLoading,
                isError,
                isEnd,
                handleSearchSubmit,
                handleLoadMore,
                uniqueTags,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};