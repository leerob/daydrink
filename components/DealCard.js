import {useColorMode, Box, IconButton, Badge, Text, Flex, Stack} from '@chakra-ui/core';
import {voteOnDeal} from '../graphql/mutations';

const badgeColors = {
    BEER: 'teal',
    WINE: 'red',
    LIQUOR: 'blue'
};

const DealCard = ({id, userId, location, userDeals, description, alcoholType}) => {
    const {colorMode} = useColorMode();
    const currentUserVotedDeal = userDeals.find((voted) => voted.userId === userId);
    const upvoted = currentUserVotedDeal && currentUserVotedDeal.upvoted;
    const downvoted = currentUserVotedDeal && !currentUserVotedDeal.upvoted;

    const score = userDeals.reduce((acc, deal) => acc + (deal.upvoted ? 1 : -1), 0);
    const upvote = () => !upvoted && voteOnDeal({dealId: id, upvoted: true, userId}, currentUserVotedDeal);
    const downvote = () => !downvoted && voteOnDeal({dealId: id, upvoted: false, userId}, currentUserVotedDeal);

    return (
        <Box
            borderWidth="1px"
            borderRadius={8}
            p={1}
            mb={2}
            backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
        >
            <Flex>
                <Stack align="center" ml={2}>
                    <IconButton
                        aria-label="Upvote"
                        icon="chevron-up"
                        size="sm"
                        fontSize="20px"
                        onClick={upvote}
                        variant={upvoted ? 'solid' : 'ghost'}
                        color="gray.500"
                    />
                    <Box fontWeight="semibold">{score}</Box>
                    <IconButton
                        aria-label="Upvote"
                        icon="chevron-down"
                        size="sm"
                        fontSize="20px"
                        onClick={downvote}
                        variant={downvoted ? 'solid' : 'ghost'}
                        color="gray.500"
                    />
                </Stack>
                <Stack ml={3} mt={2} mb={2}>
                    <Flex align="baseline">
                        <Badge variantColor={badgeColors[alcoholType]}>{alcoholType}</Badge>
                    </Flex>
                    <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                        {description}
                    </Text>
                    <Text color="gray.400">{location.name}</Text>
                </Stack>
            </Flex>
        </Box>
    );
};

export default DealCard;
