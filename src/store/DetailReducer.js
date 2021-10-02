const initialState = {
    departures:null,
    isLoading:true
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS_DEPARTURES':
        return {
          ...state,
          departures:action.payload.departures,  
          isLoading:action.payload.isLoading
        }
      default:
        return state
    }
  }
  
  export default reducer;