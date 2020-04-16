import * as Actions from '../actions';

const initialState = {
    success: false
};

const register = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.REGISTER_SUCCESS:
        {
            return {
                ...initialState,
                success: true
            };
        }
        case Actions.REGISTER_ERROR:
        {  
            return {
                success: false,
                error  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default register;