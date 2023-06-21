import fs from 'fs'
import puppeteer from 'puppeteer'
import { parse } from 'node-html-parser';

/*const adobeStockStealer = (pages,find) => {
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

adobeStockStealer(5,"eustoma")*/

/*request.get(
    "https://www.asos.com/men/jeans/cat/?cid=4208", () => console.log(body)
)*/

/*fetch('URL_GOES_HERE', { 
    method: 'post', 
    headers: new Headers({
        'Authorization': 'Basic '+btoa('username:password'), 
        'Content-Type': 'application/x-www-form-urlencoded'
    }), 
    body: 'A=1&B=2'
});*/
/*
(async () => {
    const options = {
        method: 'GET',
        url: "https://www.asos.com/men/jeans/cat/?cid=4208&page=1",
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36' }
    }

    try {
        const response = await request(options)
        const $ = parse(response);
        //$.html();
        const products = $.querySelectorAll('[class^="productLink_"]')//$.querySelectorAll('[id^="product-"]')
        console.log(products)
        products.forEach(prod => {
            console.log(prod.getAttribute("href"))
        });
        console.log("")
        //console.log(response);
        //fs.writeFile("./file.html",response,(error)=>console.log(error));

    } catch (error) {
        console.log('error', error)
    }

})();*/


/*(async () => {
    const options = {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36' }
    }
    const cookie = 'abck=B78952302EF2743DB4CB2FD6E1E612BC~0~YAAQFwVJF9h1KaeIAQAAIIgQywrSZ7CD52FyEfxuZZMTOkZ+KIz2nQq/VjdPZ+2g/PeJyj96QetccgMnRzyXHRkOe2XhxCtt6lBAzq3fBjX2i+hKAml2qtoEOSzN6wyJVz7WkY+oQrn0e4+eUfd0l9m7gEZQB71R/iU/ghOazfkM/DX1r7WDMuKqbUKxlWuTkAJSUtX2wTIG6Dj/7KiQwWGuzWS+QnFyP52bBBzGKw1jWDvb+Db3e98DQRzIjvAQyv5lnORmrg07ISq9/25rD9Lc9rXZL6BgE7iCscFw5+3MCRovLElDU/9mUqq5//CK9sHiThEvo3MLNppd3jPhCevf9h8E8Ayd9wixwN0ygcFUmRbbS77MBpXrasMr~-1~-1~1687037178; AMCV_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=-1303530583%7CMCMID%7C426761919…fKXzCYDy72aZsbtC9p7wmEoYyg0/JwUDnr+lKkVR/fU3x4I6+z5kcp+txPBI/oIMy1ZrBs+DtGn6PbEJV3x3Bc/IJA==~1; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Jun+18+2023+01%3A27%3A26+GMT%2B0500+(%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%2C+%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D0%BE%D0%B5+%D0%B2%D1%80%D0%B5%D0%BC%D1%8F)&version=202301.2.0&isIABGlobal=false&hosts=&landingPath=https%3A%2F%2Fwww.asos.com%2Fmen%2Fjeans%2Fcat%2F%3Fcid%3D4208&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A1'
    const options = {
        method: 'GET',
        url: "https://www.asos.com/api/product/search/v2/categories/4208?offset=72&tst-search-advertisements=true&store=COM&lang=en-GB&currency=GBP&rowlength=4&channel=desktop-web&country=GB&keyStoreDataversion=ornjx7v-36&advertisementsPartnerId=100712&advertisementsVisitorId=ee44414e-3173-4fb9-8814-3a180a875217&advertisementsOptInConsent=true&limit=72",
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36' },
        'set-cookie': cookie
    }
    try {
       const response = await fetch(options);
        //const response = await fetch("https://www.asos.com/api/product/search/v2/categories/4208?offset=72&tst-search-advertisements=true&store=COM&lang=en-GB&currency=GBP&rowlength=4&channel=desktop-web&country=GB&keyStoreDataversion=ornjx7v-36&advertisementsPartnerId=100712&advertisementsVisitorId=ee44414e-3173-4fb9-8814-3a180a875217&advertisementsOptInConsent=true&limit=72", options)
        const data = await response.json()
        console.log(data)
    }
    catch (e) {
        console.log(e)
    }
})()*/

(async () => {
   // const cookie = 'abck=B78952302EF2743DB4CB2FD6E1E612BC~0~YAAQFwVJF9h1KaeIAQAAIIgQywrSZ7CD52FyEfxuZZMTOkZ+KIz2nQq/VjdPZ+2g/PeJyj96QetccgMnRzyXHRkOe2XhxCtt6lBAzq3fBjX2i+hKAml2qtoEOSzN6wyJVz7WkY+oQrn0e4+eUfd0l9m7gEZQB71R/iU/ghOazfkM/DX1r7WDMuKqbUKxlWuTkAJSUtX2wTIG6Dj/7KiQwWGuzWS+QnFyP52bBBzGKw1jWDvb+Db3e98DQRzIjvAQyv5lnORmrg07ISq9/25rD9Lc9rXZL6BgE7iCscFw5+3MCRovLElDU/9mUqq5//CK9sHiThEvo3MLNppd3jPhCevf9h8E8Ayd9wixwN0ygcFUmRbbS77MBpXrasMr~-1~-1~1687037178; AMCV_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=-1303530583%7CMCMID%7C426761919…fKXzCYDy72aZsbtC9p7wmEoYyg0/JwUDnr+lKkVR/fU3x4I6+z5kcp+txPBI/oIMy1ZrBs+DtGn6PbEJV3x3Bc/IJA==~1; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Jun+18+2023+01%3A27%3A26+GMT%2B0500+(%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%2C+%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D0%BE%D0%B5+%D0%B2%D1%80%D0%B5%D0%BC%D1%8F)&version=202301.2.0&isIABGlobal=false&hosts=&landingPath=https%3A%2F%2Fwww.asos.com%2Fmen%2Fjeans%2Fcat%2F%3Fcid%3D4208&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A1'
    const options = {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36' }
    }
    try {
        const response = await fetch("https://www.asos.com/api/product/search/v2/categories/4208?offset=72&tst-search-advertisements=true&store=COM&lang=en-GB&currency=GBP&rowlength=4&channel=desktop-web&country=GB&keyStoreDataversion=ornjx7v-36&advertisementsPartnerId=100712&advertisementsVisitorId=ee44414e-3173-4fb9-8814-3a180a875217&advertisementsOptInConsent=true&limit=72")
        const data = await response.text()
        console.log(data)
    } catch (e) {
        console.log(e)
    }
})()

/*let scrape = async () => {
    const results = []
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.asos.com/men/jeans/cat/?cid=4208');
    //await page.waitFor(1000);
    //for (let i = 0; i < 5; i++) {
    //    await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    const result = await page.evaluate(() => {
        let data = []; // Создаём пустой массив для хранения данных
        let elements = document.querySelectorAll('[id^="product-"]'); // Выбираем все товары
        console.log(elements)

        for (var element of elements){ // Проходимся в цикле по каждому товару
            data.push(element); // Помещаем объект с данными в массив
        }

        return data; // Возвращаем массив
    });
    //   results.push(result);
    //}
    console.log(result);
    // Код для скрапинга
    browser.close();
    //return result;
};

(async () => await scrape())()*/
