import { action } from "easy-peasy"


const errorModel = {
    errorMessage: null,
    setErrorMessage: action((state, payload) => {
        state.errorMessage = payload.errorMessage
    })
}

export default errorModel