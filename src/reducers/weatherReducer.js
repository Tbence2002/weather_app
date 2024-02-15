export const weatherReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "GET_WEATHER":
            return { ...state, weatherList: payload.weather }
        case "GET_FORECAST":
            return { ...state, forecastList: payload.forecast }
        case "GET_LOCATION":
            return { ...state, userLocation: payload.location }
        default:
            throw new Error("Nincs ilyen eset a weatherReducerben!")
    }
}