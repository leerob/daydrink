import {useColorMode, Box, Text, Stack, CheckboxGroup, Checkbox, Select} from '@chakra-ui/core';

import {useSearch} from '../utils/search';

const Filters = (props) => {
    const {colorMode} = useColorMode();
    const {alcoholTypeFilters, dayOfWeek, onChangeDayOfWeek, onFilterAlcoholType} = useSearch();
    const inputBg = {light: '#EDF2F7', dark: 'gray.700'};

    return (
        <Stack spacing={8} mb={8} {...props}>
            <Box>
                <Text mb={2} fontWeight="bold">
                    {'Location'}
                </Text>
                <Select defaultValue="Des Moines, IA" bg={inputBg[colorMode]}>
                    <option backgroundColor="#EDF2F7">Des Moines, IA</option>
                </Select>
            </Box>
            <Box>
                <Text mb={2} fontWeight="bold">
                    {'Showing Deals For'}
                </Text>
                <Select defaultValue={dayOfWeek} onChange={onChangeDayOfWeek} bg={inputBg[colorMode]}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </Select>
            </Box>

            <Box>
                <Text mb={2} fontWeight="bold">
                    {'Deal Type'}
                </Text>
                <CheckboxGroup
                    onChange={onFilterAlcoholType}
                    spacing={2}
                    variantColor="teal"
                    value={alcoholTypeFilters}
                >
                    <Checkbox value="BEER">Beer</Checkbox>
                    <Checkbox value="WINE">Wine</Checkbox>
                    <Checkbox value="LIQUOR">Liquor</Checkbox>
                    <Checkbox value="FOOD">Food</Checkbox>
                </CheckboxGroup>
            </Box>
        </Stack>
    );
};

export default Filters;
