# Prismic Get/Export Data

### Getting Started
1. Add .env file with:
    - `ITEMS_TO_RETRIVE` = {Array} e.g. `['TYPE_ONE', 'TYPE_TWO']`
    - `API_ENDPOINT` = {String} e.g. `"ENDPOINT.prismic.io"`
    - `ACCESS_TOKEN` = {String} e.g. `"PUBLIC ACCESS TOKEN"`
        - From: "Settings > API & Securtiy > Application Token"
2. Commands:
    - `npm install` - Get the required packages
    - `node fetchData.js` - Add the JSON to the /data folder
