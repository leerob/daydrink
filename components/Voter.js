import {Box, IconButton, Stack} from '@chakra-ui/core';
import {useMutation} from '@apollo/react-hooks';

import {UPDATE_USER_DEAL_MUTATION, INSERT_USER_DEAL_MUTATION} from '../graphql/mutations';
import {GET_DEALS_QUERY} from '../graphql/queries';
import {calculateScoreAndSortDesc} from '../utils/deals';
import {useSearch} from '../utils/search';
import {withAuthModal} from './Auth';

const updateCacheAfterInsert = ({cache, data, dealId, dayOfWeek}) => {
    const cachedData = cache.readQuery({
        query: GET_DEALS_QUERY,
        variables: {dayOfWeek}
    });

    const newUserDeal = data['insert_user_deal'].returning[0];
    const currentDeal = cachedData.deals.find((deal) => deal.id === dealId);

    currentDeal.userDeals.push(newUserDeal);

    cache.writeQuery({
        query: GET_DEALS_QUERY,
        variables: {dayOfWeek},
        data: {
            ...cachedData,
            deals: calculateScoreAndSortDesc(cachedData.deals)
        }
    });
};

const Voter = ({dealId, userId, score, userDeals, openAuthModal}) => {
    const {dayOfWeek} = useSearch();
    const currentUserVotedDeal = userDeals.find((voted) => voted.userId === userId);
    const upvoted = currentUserVotedDeal && currentUserVotedDeal.upvoted;
    const downvoted = currentUserVotedDeal && !currentUserVotedDeal.upvoted;

    const [updateUserDeal] = useMutation(UPDATE_USER_DEAL_MUTATION);
    const [insertUserDeal] = useMutation(INSERT_USER_DEAL_MUTATION);

    const onVote = (upvoted) => {
        if (!userId) {
            openAuthModal();
        }

        if (currentUserVotedDeal) {
            return updateUserDeal({
                variables: {
                    dealId,
                    upvoted,
                    userId
                }
            });
        }

        return insertUserDeal({
            variables: {
                dealId,
                upvoted,
                userId
            },
            update: (cache, {data}) =>
                updateCacheAfterInsert({
                    cache,
                    data,
                    dealId,
                    dayOfWeek
                })
        });
    };

    return (
        <>
            <Stack align="center" ml={2}>
                <IconButton
                    aria-label="Upvote"
                    icon="chevron-up"
                    size="sm"
                    fontSize="20px"
                    onClick={() => onVote(true)}
                    variant={upvoted ? 'solid' : 'ghost'}
                    color="gray.500"
                />
                <Box fontWeight="semibold">{score}</Box>
                <IconButton
                    aria-label="Downvote"
                    icon="chevron-down"
                    size="sm"
                    fontSize="20px"
                    onClick={() => onVote(false)}
                    variant={downvoted ? 'solid' : 'ghost'}
                    color="gray.500"
                />
            </Stack>
        </>
    );
};

export default withAuthModal(Voter);
