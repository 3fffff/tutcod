import fetch from 'node-fetch'
import fs from 'fs'

const adobeStockStealer = (pages,find) => {
    const promises = []
    for (let page = 1; page <= pages; page++) {
        const url = "https://stock.adobe.com/Ajax/Search?filters[content_type:photo]=1&filters[content_type:illustration]=1&filters[content_type:zip_vector]=1&filters[content_type:video]=0&filters[content_type:template]=0&filters[content_type:3d]=0&filters[include_stock_enterprise]=0&filters[is_editorial]=0&filters[content_type:image]=1&k=" + find + "&order=relevance&safe_search=1&search_page=" + page + "&get_facets=0&limit=all"
        promises.push(fetch(url).then(result => result.json()))
    }
    return Promise.all(promises).then(results => Promise.all(results.map(data => {
        const items = data["items"]
        Object.entries(items).forEach(async ([key, value]) => {
            console.log(`${key}:${value['thumbnail_url']}`)
            const response = await fetch(value['thumbnail_url'])
            const bindata = new DataView(await response.arrayBuffer())
            fs.writeFile("images/" + 100 * Math.random() + ".jpg", bindata, 'binary', function (err) { })
        })
    })))
}

adobeStockStealer(5,"eustoma")
