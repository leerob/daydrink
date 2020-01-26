import React from 'react';
import {useRouter} from 'next/router';

import SignIn from '../../pages/signin';
import {act, render, fireEvent} from '../test-utils';
import {useAuth} from '../../utils/auth';

jest.mock('next/router');
jest.mock('../../utils/auth');

describe('SignIn', () => {
    let expectedSignIn, expectedEmail, expectedPassword, expectedRouterPush;

    beforeEach(() => {
        expectedRouterPush = jest.fn();
        expectedSignIn = jest.fn();
        expectedSignIn.mockResolvedValue('');
        expectedEmail = 'me@leerob.io';
        expectedPassword = '123';

        useRouter.mockReturnValue({push: expectedRouterPush});
        useAuth.mockReturnValue({
            signin: expectedSignIn,
            userId: 123
        });
    });

    test('should redirect on sign in', async () => {
        const {getByText, getByLabelText} = render(<SignIn />);
        const email = getByLabelText('Email Address');
        const password = getByLabelText('Password');
        const signInButton = getByText('Sign In');

        await act(async () => {
            fireEvent.change(email, {target: {value: expectedEmail}});
            fireEvent.change(password, {target: {value: expectedPassword}});
            fireEvent.click(signInButton);
        });

        expect(expectedSignIn).toHaveBeenCalledTimes(1);
        expect(expectedSignIn).toHaveBeenCalledWith(expectedEmail, expectedPassword);

        expect(expectedRouterPush).toHaveBeenCalledTimes(1);
        expect(expectedRouterPush).toHaveBeenCalledWith('/deals');
    });

    test('should show toast error', async () => {
        expectedSignIn.mockRejectedValue({
            message: 'Invalid username.'
        });

        const {getByText, getByLabelText} = render(<SignIn />);
        const email = getByLabelText('Email Address');
        const password = getByLabelText('Password');
        const signInButton = getByText('Sign In');

        await act(async () => {
            fireEvent.change(email, {target: {value: 'foo'}});
            fireEvent.change(password, {target: {value: expectedPassword}});
            fireEvent.click(signInButton);
        });

        expect(expectedSignIn).toHaveBeenCalledTimes(1);
        expect(expectedSignIn).toHaveBeenCalledWith('foo', expectedPassword);

        const errorToast = getByText('An error occurred.');
        const errorMessage = getByText('Invalid username.');

        expect(errorToast).toBeVisible();
        expect(errorMessage).toBeVisible();
    });

    test('should show error for required fields', async () => {
        const {getByText} = render(<SignIn />);
        const signInButton = getByText('Sign In');

        await act(async () => {
            fireEvent.click(signInButton);
        });

        const emailError = getByText('Please enter your email.');
        const passwordError = getByText('Please enter a password.');

        expect(emailError).toBeVisible();
        expect(passwordError).toBeVisible();

        expect(expectedSignIn).not.toHaveBeenCalled();
        expect(expectedRouterPush).not.toHaveBeenCalled();
    });
});
