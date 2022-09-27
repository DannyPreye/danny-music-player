import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { id: artistId } = useParams();

  const {
    data: artistData,
    isFetching: isFechingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  if (isFechingArtistDetails)
    return <Loader title='Searching artists details...' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
