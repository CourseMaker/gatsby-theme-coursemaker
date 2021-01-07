import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: 'localhost:3000/example/path',
    }),
}));
