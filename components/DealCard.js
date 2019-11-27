import {useColorMode, Box, IconButton, Badge, Text, Flex, Stack} from '@chakra-ui/core';

const badgeColors = {
    beer: 'teal',
    wine: 'red',
    liquor: 'blue'
};

const DealCard = ({barName, description, alcoholType}) => {
    const {colorMode} = useColorMode();

    return (<Box borderWidth="1px" borderRadius={8} p={1} mb={2} backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
        <Flex>
            <Stack align="center" ml={2}>
                <IconButton
                    aria-label="Upvote"
                    icon="chevron-up"
                    size="sm"
                    fontSize="20px"
                    variant="ghost"
                    color="gray.500"
                />
                <Box fontWeight="semibold">22</Box>
                <IconButton
                    aria-label="Upvote"
                    icon="chevron-down"
                    size="sm"
                    fontSize="20px"
                    variant="ghost"
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
                <Text color="gray.400">{barName}</Text>
            </Stack>
        </Flex>
    </Box>);
};

export default DealCard;
