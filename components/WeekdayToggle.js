const CustomRadio = React.forwardRef((props, ref) => {
    const {isChecked, isDisabled, value, ...rest} = props;
    return (
        <Button
            ref={ref}
            variantColor={isChecked ? 'red' : 'gray'}
            aria-checked={isChecked}
            role="radio"
            isDisabled={isDisabled}
            {...rest}
        />
    );
});

// Step 2: Add `CustomRadio` as children of `RadioButtonGroup`
const WeekdayToggle = () => {
    return (
        <RadioButtonGroup defaultValue="" onChange={(val) => console.log(val)} isInline>
            <CustomRadio value="monday">M</CustomRadio>
            <CustomRadio value="tuesday">T</CustomRadio>
            <CustomRadio value="wednesday">W</CustomRadio>
            <CustomRadio value="thursday">T</CustomRadio>
            <CustomRadio value="friday">F</CustomRadio>
            <CustomRadio value="saturday">S</CustomRadio>
            <CustomRadio value="sunday">S</CustomRadio>
        </RadioButtonGroup>
    );
};

export default WeekdayToggle;
