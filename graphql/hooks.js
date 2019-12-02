import {useQuery} from '@apollo/react-hooks';
import {GET_DEALS_QUERY} from './queries';
import {calculateScoreAndSortDesc} from '../utils/deals';

export const useDeals = (dayOfWeek) => {
    const {loading, error, data} = useQuery(GET_DEALS_QUERY, {
        variables: {dayOfWeek}
    });

    if (!loading && data.deals) {
        return {
            loading,
            error,
            data: {
                deals: calculateScoreAndSortDesc(data.deals)
            }
        };
    }

    return {
        loading,
        error,
        data
    };
};
