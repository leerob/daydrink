import React, {useState, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useQuery, useMutation} from '@apollo/react-hooks';
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
    Flex
} from '@chakra-ui/core';

import {GET_DEALS_QUERY, GET_LOCATIONS_QUERY} from '../graphql/queries';
import {CREATE_DEAL_MUTATION} from '../graphql/mutations';
import {useSearch} from '../utils/search';
import {withAuthModal} from './Auth';
import {useAuth} from '../utils/auth';
import WeekdayButtonGroup from './WeekdayButtonGroup';

function AddDealModal({openAuthModal}) {
    const {userId} = useAuth();
    const initialRef = useRef();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {handleSubmit, register, errors} = useForm();
    const {dayOfWeek} = useSearch();
    const [alcoholType, setAlcoholType] = useState('BEER');
    const [daysActive, setDaysActive] = useState(['Monday']);
    const [createPost, {loading}] = useMutation(CREATE_DEAL_MUTATION);
    const {data} = useQuery(GET_LOCATIONS_QUERY);

    const onCreateDeal = (
        {alcoholType, description, locationId, startTime, endTime, dayOfWeek, daysActive},
        onClose
    ) => {
        const daysActiveMap = daysActive.map((day) => ({
            dayOfWeek: day,
            startTime,
            endTime
        }));

        createPost({
            variables: {
                alcoholType,
                description,
                locationId,
                daysActive: daysActiveMap
            },
            update: (cache, {data}) => {
                const cachedData = cache.readQuery({
                    query: GET_DEALS_QUERY,
                    variables: {dayOfWeek}
                });

                const newDeal = data['insert_deals'].returning[0];

                cache.writeQuery({
                    query: GET_DEALS_QUERY,
                    variables: {dayOfWeek},
                    data: {
                        ...cachedData,
                        deals: [newDeal, ...cachedData.deals]
                    }
                });
            }
        });

        onClose();
    };

    const onOpenDealModal = () => {
        if (!userId) {
            return openAuthModal();
        }

        onOpen();
    };

    return (
        <>
            <Button onClick={onOpenDealModal} leftIcon="add" variantColor="teal" variant="solid" minH="40px" w="100%">
                Add New Deal
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="25rem">
                <ModalOverlay />
                <ModalContent borderRadius={4}>
                    <form
                        onSubmit={handleSubmit((data) =>
                            onCreateDeal(
                                {
                                    alcoholType,
                                    dayOfWeek,
                                    daysActive,
                                    description: data.description,
                                    endTime: data.endTime,
                                    locationId: data.locationId,
                                    startTime: data.startTime
                                },
                                onClose
                            )
                        )}
                    >
                        <ModalHeader>Add Deal</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl as="fieldset">
                                <FormLabel as="legend">Alcohol Type</FormLabel>
                                <RadioGroup
                                    isInline
                                    spacing={4}
                                    ref={initialRef}
                                    defaultValue="BEER"
                                    onChange={(e) => setAlcoholType(e.target.value)}
                                >
                                    <Radio value="BEER">Beer</Radio>
                                    <Radio value="WINE">Wine</Radio>
                                    <Radio value="LIQUOR">Liquor</Radio>
                                    <Radio value="FOOD">Food</Radio>
                                </RadioGroup>
                            </FormControl>
                            <FormControl mt={4} isInvalid={errors.description && errors.description.message}>
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
                            <FormControl mt={4} isInvalid={errors.daysActive && errors.daysActive.message}>
                                <FormLabel htmlFor="daysActive">Days Active</FormLabel>
                                <WeekdayButtonGroup daysActive={daysActive} onChange={setDaysActive} />
                                <FormErrorMessage>{errors.daysActive && errors.daysActive.message}</FormErrorMessage>
                            </FormControl>
                            <Flex>
                                <FormControl mt={4} mr={4} isInvalid={errors.startTime && errors.startTime.message}>
                                    <FormLabel>Start Time</FormLabel>
                                    <Input
                                        name="startTime"
                                        ref={register({
                                            required: 'Please enter a start time.'
                                        })}
                                        placeholder="7pm"
                                    />
                                    <FormErrorMessage>{errors.startTime && errors.startTime.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl mt={4} isInvalid={errors.endTime && errors.endTime.message}>
                                    <FormLabel>End Time</FormLabel>
                                    <Input
                                        name="endTime"
                                        ref={register({
                                            required: 'Please enter an end time.'
                                        })}
                                        placeholder="2am"
                                    />
                                    <FormErrorMessage>{errors.endTime && errors.endTime.message}</FormErrorMessage>
                                </FormControl>
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button isLoading={loading} type="submit" leftIcon="check" variantColor="teal" ml={3}>
                                Create
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default withAuthModal(AddDealModal);
