import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { songid } = useParams();

  const {
    data: songData,
    isFetching: isFechingSongDetails,
    error: songError,
  } = useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFechingSongDetails || isFetchingRelatedSongs)
    return <Loader title='Searching song details...' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId='' songData={songData} />
      <div className='mb-10 '>
        <h2 className='text-white font-bold text-3xl '>Lyrics</h2>
        <div className='mt-5'>
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text?.map((line, index) => (
              <p className='text-gray-400 text-base my-1 ' key={index}>
                {line}
              </p>
            ))
          ) : (
            <p className='text-gray-400 text-base '>Sorry, no lyrics found!</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
