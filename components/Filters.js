import {useColorMode, Icon, Box, Text, InputGroup, InputLeftElement, Input, Stack, CheckboxGroup, Checkbox} from '@chakra-ui/core';

const Filters = (props) => {
    const {colorMode} = useColorMode();
    const inputBg = {light: 'gray.100', dark: 'gray.700'};

    return <Stack spacing={8} mb={8} {...props}>
        <Box>
            <Text mb={2} fontWeight="bold">
                {'Filter Deals'}
            </Text>
            <InputGroup mb={2}>
                <InputLeftElement children={<Icon name="calendar" />} />
                <Input type="date" placeholder="Today" bg={inputBg[colorMode]} />
            </InputGroup>

            <InputGroup>
                <InputLeftElement children={<Icon name="time" />} />
                <Input placeholder="Right Now" bg={inputBg[colorMode]} />
            </InputGroup>
        </Box>

        <Box>
            <Text mb={2} fontWeight="bold">
                {'Alcohol Type'}
            </Text>
            <CheckboxGroup spacing={2} variantColor="teal" defaultValue={['beer', 'wine', 'liquor']}>
                <Checkbox value="beer">Beer</Checkbox>
                <Checkbox value="wine">Wine</Checkbox>
                <Checkbox value="liquor">Liquor</Checkbox>
            </CheckboxGroup>
        </Box>
    </Stack>
};

export default Filters;
