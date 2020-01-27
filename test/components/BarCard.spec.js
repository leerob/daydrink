import React from 'react';

import {render} from '../test-utils';
import BarCard from '../../components/BarCard';

describe('BarCard', () => {
    let expectedProps;

    beforeEach(() => {
        expectedProps = {
            name: 'New Bar',
            address: '123 Park Dr.',
            deals: [{}],
            imageUrl: 'https://daydrink.io'
        };
    });

    test('should render name, address, and image', () => {
        const {getByText, getByAltText} = render(<BarCard {...expectedProps} />);
        const name = getByText(expectedProps.name);
        const address = getByText(expectedProps.address);
        const image = getByAltText(expectedProps.name);

        expect(name).toBeVisible();
        expect(address).toBeVisible();
        expect(image).toBeVisible();
    });

    test('badge with one deal', () => {
        const {getByText} = render(<BarCard {...expectedProps} />);
        const deal = getByText('1 deal');

        expect(deal).toBeVisible();
    });

    test('badge with multiple deals', () => {
        expectedProps.deals = [{}, {}];

        const {getByText} = render(<BarCard {...expectedProps} />);
        const deals = getByText('2 deals');

        expect(deals).toBeVisible();
    });
});
