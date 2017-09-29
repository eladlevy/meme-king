import { CALL_API } from 'redux-api-middleware';

// config
import config from 'config/config';

// constants
import dataActionConstants from './data-actions-constants';
import constants from 'constants/global';

// services
import localStorageService from 'services/LocalStorage';

export function fetchCategory(category) {

    return (dispatch) => {

        dispatch({type : dataActionConstants.FETCH_CATEGORY_REQUEST});

        firebase.database().ref(`/${constants.database.memesTable}/${category}`).once('value')
            .then(snapshot => dispatch({type : dataActionConstants.FETCH_CATEGORY_SUCCESS, payload : snapshot.val()}))
            .catch(error => dispatch({type : dataActionConstants.FETCH_CATEGORY_FAILED, error : error}));

    };
}

export function fetchMyMemes() {
    return {
        payload: localStorageService.getItem('myMemes'),
        type: dataActionConstants.FETCH_MY_MEMES
    }
}

export function fetchWeeklyPopularMemes() {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/get-weekly-popular-memes`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_WEEKLY_POPULAR_REQUEST,
                dataActionConstants.FETCH_WEEKLY_POPULAR_SUCCESS,
                dataActionConstants.FETCH_WEEKLY_POPULAR_FAILED
            ],
        }
    }
}

export function fetchNewMemes() {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/get-new-memes`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_NEW_MEMES_REQUEST,
                dataActionConstants.FETCH_NEW_MEMES_SUCCESS,
                dataActionConstants.FETCH_NEW_MEMES_FAILED
            ],
        }
    }
}