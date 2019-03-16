import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
    fetchUser: ['fetchUser'],
    updateUser: ['updateUser']
});

export const ServiceUserRedux = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
    fetching: false,
    user: undefined,
    results: {},
    error: null
});

export const fetchUser = (state,  payload) => {

    let user = undefined;
    if (payload.fetchUser.length > 0) {
        user = payload.fetchUser[0];
    }

    return state.merge({fetching: true, results: payload.fetchUser, user: user});
};

export const updateUser = (state, payload) => {
    return state.merge({user: payload.updateUser});
};

export const reducer = createReducer(INITIAL_STATE, {
    [ServiceUserRedux.FETCH_USER]: fetchUser,
    [ServiceUserRedux.UPDATE_USER]: updateUser
});
