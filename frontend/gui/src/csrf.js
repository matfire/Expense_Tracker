import React from 'react';
import Cookie from 'js-cookie'

function getAuthHeader() {
    return Cookie.get("Authorization");
}

export default getAuthHeader;