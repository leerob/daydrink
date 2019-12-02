import {Box, IconButton, Stack, useDisclosure, useToast} from '@chakra-ui/core';
import {useMutation} from '@apollo/react-hooks';

import {UPDATE_USER_DEAL_MUTATION, INSERT_USER_DEAL_MUTATION} from '../graphql/mutations';
import {GET_DEALS_QUERY} from '../graphql/queries';
import {calculateScoreAndSortDesc} from '../utils/deals';
import {useSearch} from '../utils/search';
import {AuthModal} from './Auth';
import {useAuth} from '../utils/auth';

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

const Voter = ({dealId, userId, score, userDeals}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {dayOfWeek} = useSearch();
    const auth = useAuth();
    const toast = useToast();

    const currentUserVotedDeal = userDeals.find((voted) => voted.userId === userId);
    const upvoted = currentUserVotedDeal && currentUserVotedDeal.upvoted;
    const downvoted = currentUserVotedDeal && !currentUserVotedDeal.upvoted;

    const [updateUserDeal] = useMutation(UPDATE_USER_DEAL_MUTATION);
    const [insertUserDeal] = useMutation(INSERT_USER_DEAL_MUTATION);

    const onVote = (upvoted) => {
        if (!userId) {
            onOpen();
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

    const signUp = ({email, pass}) => {
        auth.signup(email, pass)
            .then(() => {
                toast({
                    title: 'Success! 🍻',
                    description: 'Your account has been created.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                });
                onClose();
            })
            .catch((error) => {
                toast({
                    title: 'An error occurred.',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true
                });
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
                    aria-label="Upvote"
                    icon="chevron-down"
                    size="sm"
                    fontSize="20px"
                    onClick={() => onVote(false)}
                    variant={downvoted ? 'solid' : 'ghost'}
                    color="gray.500"
                />
            </Stack>
            <AuthModal isOpen={isOpen} onClose={onClose} type="Sign Up" onSubmit={signUp} />
        </>
    );
};

export default Voter;
