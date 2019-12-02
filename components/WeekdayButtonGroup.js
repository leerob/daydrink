import {Button, Stack} from '@chakra-ui/core';

const WeekdayButtonGroup = ({daysActive, onChange}) => {
    const updateDaysActive = (day) => {
        if (daysActive.includes(day)) {
            const withDayRemoved = daysActive.filter((dayActive) => dayActive !== day);

            return onChange(withDayRemoved);
        }

        const withDayAdded = [...daysActive, day];

        onChange(withDayAdded);
    };

    const DayOfWeek = ({children, ...rest}) => (
        <Button
            variantColor={daysActive.includes(children) ? 'teal' : 'gray'}
            onClick={() => updateDaysActive(children)}
            {...rest}
        >
            {children[0]}
        </Button>
    );

    return (
        <Stack isInline>
            <DayOfWeek>Monday</DayOfWeek>
            <DayOfWeek>Tuesday</DayOfWeek>
            <DayOfWeek>Wednesday</DayOfWeek>
            <DayOfWeek>Thursday</DayOfWeek>
            <DayOfWeek>Friday</DayOfWeek>
            <DayOfWeek>Saturday</DayOfWeek>
            <DayOfWeek>Sunday</DayOfWeek>
        </Stack>
    );
};

export default WeekdayButtonGroup;
