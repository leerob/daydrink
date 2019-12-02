import {useColorMode, Box, Badge, Text, Flex, Stack} from '@chakra-ui/core';

import Voter from './Voter';

const badgeColors = {
    BEER: 'teal',
    WINE: 'red',
    LIQUOR: 'blue',
    FOOD: 'orange'
};

const DealCard = ({id, userId, daysActive, location, score, userDeals, description, alcoholType}) => {
    const {colorMode} = useColorMode();
    const start = daysActive[0].startTime;
    const end = daysActive[0].endTime;

    return (
        <Box
            borderWidth="1px"
            borderRadius={8}
            p={1}
            mb={2}
            backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
        >
            <Flex>
                <Voter dealId={id} userId={userId} score={score} userDeals={userDeals} />
                <Stack ml={3} mt={2} mb={2} w="100%" pr={4}>
                    <Flex align="baseline">
                        <Badge variantColor={badgeColors[alcoholType]}>{alcoholType}</Badge>
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                            {description}
                        </Text>
                        <Badge variantColor="grey">{`${start} - ${end}`}</Badge>
                    </Flex>
                    <Text color="gray.400">{location.name}</Text>
                </Stack>
            </Flex>
        </Box>
    );
};

export default DealCard;
