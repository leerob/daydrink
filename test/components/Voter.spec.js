import React from 'react';
import {render} from '@testing-library/react';
import {MockedProvider} from '@apollo/react-testing';
import {useMutation} from '@apollo/react-hooks';

import Voter from '../../components/Voter';
import {ProvideSearch} from '../../utils/search';
import {INSERT_USER_DEAL_MUTATION} from '../../graphql/mutations';
import App from '../../pages/_app';

beforeAll(() => {
    // useMutation.mock;
});

test('loads and displays greeting', () => {
    const deleteDog = {name: 'Buck', breed: 'Poodle', id: 1};
    const mocks = [
        {
            request: {
                query: INSERT_USER_DEAL_MUTATION,
                variables: {
                    dealId: 1,
                    upvoted: true,
                    userId: 123
                }
            },
            result: {data: {deleteDog}}
        }
    ];

    const expectedProps = {
        dealId: 1,
        userId: 123,
        score: 5,
        userDeals: [],
        openAuthModal: jest.fn()
    };

    const {getByText, getByLabelText} = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <App Component={Voter} pageProps={expectedProps} />
        </MockedProvider>
    );

    const upvote = getByLabelText('Upvote');
    const score = getByText('5');

    expect(upvote).toBeInTheDocument();
    expect(score).toBeInTheDocument();
});
