/** @jsx jsx */
import {jsx} from '@emotion/core';
import dynamic from 'next/dynamic';
import {useColorMode} from '@chakra-ui/core';
import {useQuery} from '@apollo/react-hooks';
import {Marker} from 'react-map-gl';

import {withApollo} from '../graphql/apollo';
import {GET_LOCATIONS_QUERY} from '../graphql/queries';
import App from '../components/App';

const Map = dynamic(() => import('../components/Map'), {
    ssr: false
});

const MapPage = () => {
    const {colorMode} = useColorMode();
    const {data, loading} = useQuery(GET_LOCATIONS_QUERY);

    return (
        <App width="full" maxWidth="1280px" mx="auto">
            <Map colorMode={colorMode}>
                {!loading &&
                    data.locations.map(({id, name, lat, long}) => (
                        <Marker key={id} latitude={lat} longitude={long}>
                            {'☀️'}
                        </Marker>
                    ))}
            </Map>
        </App>
    );
};

export default withApollo(MapPage, {
    ssr: false
});
