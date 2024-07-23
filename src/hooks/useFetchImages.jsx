import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '43667403-4c45514ac315f0254a0ab6c0f';

const useFetchImages = (search, page) => {
    const [data, setData] = useState({ hits: [], totalHits: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!search) return;
            setLoading(true);
            try {
                const url = `${BASE_URL}?q=${encodeURIComponent(search)}
                    &page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
                const response = await.axios.get(url);
                setData({
                    hits: response.data.hits,
                    totalHits: response.data.totalHits,
                });
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search, page]);

    return { data, loading, error };
};

export default useFetchImages;