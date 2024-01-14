import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import Photos from '../android/app/src/main/screens/photos';
import { NavigationContainer } from '@react-navigation/native';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// Mock external dependencies
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-animatable', () => 'View');

// Define middlewares and create a mock store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Photos component', () => {
    // Define initial state for the mock store
    const initialState = {
        photos: {
            photos: [
                {
                    id: 1,
                    thumbnailUrl: 'https://example.com/photo1.jpg'
                }, {
                    id: 2,
                    thumbnailUrl: 'https://example.com/photo2.jpg'
                }, {
                    id: 3,
                    thumbnailUrl: 'https://example.com/photo3.jpg'
                }
            ],
            loading: false
        }
    };
    let store: any;

    beforeEach(() => {
        // Create a new instance of the mock store for each test
        store = mockStore(initialState);
    });

    afterAll(() => {
        // Clean up after all tests are done
        cleanup();
    });

    test('renders the component', () => {
        // Render the component with the mock store and necessary props
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <Photos
                        route={{
                            params: {
                                album: {
                                    id: 1,
                                    title: 'Album 1'
                                }
                            }
                        }} />
                </NavigationContainer >
            </Provider>
        );

        // Perform assertions to check if the component renders correctly
        expect(getByText('Album 1')).toBeTruthy();
        expect(getByTestId('photo-thumbnail-1')).toBeTruthy();
        expect(getByTestId('photo-thumbnail-2')).toBeTruthy();
        expect(getByTestId('photo-thumbnail-3')).toBeTruthy();
    });
});