import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { PixabayApi } from '../Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { useState, useEffect } from 'react';
const myGallery = new PixabayApi();
export const App = () => {
  const [searchWord, setSearchWord] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const searchImages = searchW => {
    if (searchW === '') {
      setImages([]);
      setError('Please enter to search');
      setLoadMoreVisible(false);
    }
    if (searchW !== searchWord) {
      setSearchWord(searchW);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(myGallery.incPage());
    setLoadMoreVisible(myGallery.ShowLoadMore());
  };

  useEffect(() => {
    if (searchWord === '') {
      return;
    }
    const getData = async () => {
      try {
        setLoadMoreVisible(false);
        setIsLoading(true);
        setError(null);

        if (page === 1) {
          setImages(null);
          myGallery.search = searchWord;
        }
        const { hits, totalHits } = (await myGallery.getPhotos()).data;
        const images = hits.map(image => {
          const { id, webformatURL, largeImageURL, tags } = image;
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
        if (images.length <= 0) {
          setError('No pictures were found for this search');
        }

        if (page === 1) {
          myGallery.maxPages = Math.ceil(totalHits / 12);
          setImages([...images]);
        } else {
          setImages(prev => [...prev, ...images]);
        }
        setLoadMoreVisible(myGallery.ShowLoadMore());
        return true;
      } catch {
        setError('reload Please');
        return false;
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [page, searchWord]);

  return (
    <div>
      <Searchbar onSubmit={searchImages} />
      {images && <ImageGallery images={images} />}
      {error && <span className="error">{error}</span>}
      <Loader isLoading={isLoading} />
      {loadMoreVisible && <Button onClick={loadMore} />}
    </div>
  );
};
