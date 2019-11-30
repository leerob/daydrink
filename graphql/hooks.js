import {request} from 'graphql-request';
import useSWR from 'swr';

const API = 'https://daydrink.herokuapp.com/v1/graphql';

export const useLocations = () => {
    const {data} = useSWR(
        `{
            locations {
                id
                name
                city
                state
                zip
                address
                imageUrl
                deals {
                  id
                }
              }
        }`,
        (query) => request(API, query)
    );

    return data;
};

export const useDeals = () => {
    const {data} = useSWR(
        `{
            deals {
                id
                description
                alcoholType
                userDeals {
                    upvoted
                    userId
                    id
                }
                location {
                    id
                    name
                }
              }
        }`,
        (query) => request(API, query)
    );

    // Order by calculated score here
    return data;
};
