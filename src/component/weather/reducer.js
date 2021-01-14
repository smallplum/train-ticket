import { FETCH_FAILURE, FETCH_STARYED, FETCH_SUSSESS } from "./actionTypes";

export default (state={status:Status.LOADING},action)=>{
    switch(action.type){
        case FETCH_STARYED:{
            return {status:Status.LOADING};
        }
        case FETCH_SUSSESS:{
            return {...state,status:Status.SUCCESS,...action.result};
        }
        case FETCH_FAILURE:{
            return {status:Status.FETCH_FAILURE}
        }
        default:{
            return state;
    }
}