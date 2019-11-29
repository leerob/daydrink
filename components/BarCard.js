import {useColorMode, Box, Image, AspectRatioBox, Badge, Text, Flex, Stack} from '@chakra-ui/core';
import Location from '../icons/Location';

const badgeColors = {
    beer: 'teal',
    wine: 'red',
    liquor: 'blue'
};

const BarCard = ({name, address, deals, imageUrl}) => {
    const {colorMode} = useColorMode();

    return (
        <Box
            borderWidth="1px"
            borderRadius={8}
            p={1}
            mb={2}
            backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
        >
            <Flex>
                <AspectRatioBox width="120px" ratio={1}>
                    <Image src={imageUrl} alt={name} objectFit="cover" />
                </AspectRatioBox>

                <Stack ml={3} mt={2} mb={2}>
                    <Flex align="baseline">
                        <Badge variantColor="blue">{`${deals.length} deals`}</Badge>
                    </Flex>
                    <Box fontSize="xl" fontWeight="semibold" lineHeight="short">
                        {name}
                    </Box>
                    <Flex align="center">
                        <Location mr={1} w="16px" />
                        <Text color="gray.400">{address}</Text>
                    </Flex>
                </Stack>
            </Flex>
        </Box>
    );
};

export default BarCard;
