import React, {useState} from 'react';
import useForm from 'react-hook-form';
import {request} from 'graphql-request';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Button,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox
} from '@chakra-ui/core';

import {useLocations} from '../graphql/hooks';

const API = 'https://daydrink.herokuapp.com/v1/graphql';

const createDeal = ({alcoholType, description, locationId}, onClose) => {
    console.log(alcoholType);

    const createDealMutation = `mutation createDeal($alcoholType: String!, $description: String!, $locationId: uuid!) {
        insert_deals(objects: {
          alcoholType: $alcoholType,
          description: $description,
          locationId: $locationId
        }) {
          returning {
            id
          }
        }
      }
    `;

    const variables = {
        alcoholType,
        description,
        locationId
    };

    request(API, createDealMutation, variables);
    onClose();
};

function AddDealModal() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = React.useRef();
    const {handleSubmit, register, errors} = useForm();
    const [alcoholType, setAlcoholType] = useState('BEER');
    const data = useLocations();

    return (
        <>
            <Button onClick={onOpen} leftIcon="add" variantColor="teal" variant="solid" h="40px">
                Add New Deal
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent borderRadius={4}>
                    <form
                        onSubmit={handleSubmit((data) =>
                            createDeal(
                                {
                                    alcoholType,
                                    description: data.description,
                                    locationId: data.locationId
                                },
                                onClose
                            )
                        )}
                    >
                        <ModalHeader>Add Deal</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isInvalid={errors.description && errors.description.message}>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    name="description"
                                    ref={register({
                                        required: 'Please enter a description.'
                                    })}
                                    placeholder="$3 White Claws"
                                />
                                <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl mt={4} isInvalid={errors.locationId && errors.locationId.message}>
                                <FormLabel htmlFor="location">Location</FormLabel>
                                <Select
                                    ref={register({
                                        required: 'Please select a location.'
                                    })}
                                    name="locationId"
                                    id="location"
                                    placeholder="Select Bar"
                                >
                                    {data &&
                                        data.locations.map(({id, name}) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                </Select>
                                <FormErrorMessage>{errors.locationId && errors.locationId.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl as="fieldset" mt={4}>
                                <FormLabel as="legend">Alcohol Type</FormLabel>
                                <RadioGroup
                                    isInline
                                    spacing={4}
                                    defaultValue="BEER"
                                    onChange={(e) => setAlcoholType(e.target.value)}
                                >
                                    <Radio value="BEER">Beer</Radio>
                                    <Radio value="WINE">Wine</Radio>
                                    <Radio value="LIQUOR">Liquor</Radio>
                                </RadioGroup>
                            </FormControl>
                            <FormControl mt={4} isInvalid={errors.daysActive && errors.daysActive.message}>
                                <FormLabel htmlFor="location">Days Active</FormLabel>
                                <CheckboxGroup
                                    spacing={1}
                                    variantColor="teal"
                                    ref={register({
                                        required: 'Please select a day.'
                                    })}
                                    name="daysActive"
                                    id="daysActive"
                                >
                                    <Checkbox value="Monday">Monday</Checkbox>
                                    <Checkbox value="Tuesday">Tuesday</Checkbox>
                                    <Checkbox value="Wednesday">Wednesday</Checkbox>
                                    <Checkbox value="Thursday">Thursday</Checkbox>
                                    <Checkbox value="Friday">Friday</Checkbox>
                                    <Checkbox value="Saturday">Saturday</Checkbox>
                                    <Checkbox value="Sunday">Sunday</Checkbox>
                                </CheckboxGroup>
                                <FormErrorMessage>{errors.daysActive && errors.daysActive.message}</FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="submit" leftIcon="check" variantColor="teal" ml={3}>
                                Create
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddDealModal;
