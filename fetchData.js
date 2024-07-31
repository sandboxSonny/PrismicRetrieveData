const Prismic = require('prismic-javascript');
const fs = require('fs');

const array = process.env.ITEMS_TO_RETRIVE
const apiEndpoint = process.env.API_ENDPOINT;
const accessToken = process.env.ACCESS_TOKEN;

Prismic.getApi(apiEndpoint, { accessToken }).then(api => {
    array.forEach((item) => {
        api.query(
            Prismic.Predicates.at('document.type', item),
            { pageSize : 100 }
        ).then(response => {
            let allItems = response.results;
            let promises = [];
            for (let page = 2; page <= response.total_pages; page++) {
                promises.push(
                    api.query(
                        Prismic.Predicates.at('document.type', 'product'),
                        { pageSize : 100, page }
                    ).then(pageResponse => {
                        allItems = allItems.concat(pageResponse.results);
                    })
                );
            }

            Promise.all(promises).then(() => {
                fs.writeFile(`data/${item}.json`, JSON.stringify(allItems, null, 2), err => {
                    if (err) throw err;
                    console.log(`${item} data has been written to ${item}.json`);
                });
            });
        }).catch(err => {
            console.error('Error querying Prismic API:', err);
        });
    })
}).catch(err => {
    console.error('Error initializing Prismic API:', err);
});
