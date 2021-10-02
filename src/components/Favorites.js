
import React, { useState } from "react";

import StarsIcon from '@mui/icons-material/Stars';

function Favorites({ favoriteStops }) {
    return favoriteStops && favoriteStops.map((data, index) =>
        <div className="favorites-container">
            <p>Berlin <StarsIcon /></p>
        </div>
    )
}
export default Favorites;
