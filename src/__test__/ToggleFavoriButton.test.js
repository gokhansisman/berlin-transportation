import React from 'react'
import ReactDOM from 'react-dom'

import ToggleFavoriButton from '../components/ToggleFavoriButton'

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ToggleFavoriButton/>, div)
})