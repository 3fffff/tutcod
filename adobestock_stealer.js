import fetch from "node-fetch";
import request from "request"
import fs from 'fs'

async function RequestPage(page, find) {
  const response = await fetch("https://stock.adobe.com/Ajax/Search?filters[content_type:photo]=1&filters[content_type:illustration]=1&filters[content_type:zip_vector]=1&filters[content_type:video]=0&filters[content_type:template]=0&filters[content_type:3d]=0&filters[include_stock_enterprise]=0&filters[is_editorial]=0&filters[content_type:image]=1&k=" + find + "&order=relevance&safe_search=1&search_page=" + page + "&get_facets=0&limit=all")
  return await response.json()
}
async function makeRequest(page) {
  try {
    const find = "eustoma"
    let response_body = await RequestPage(page, find);
    const items = response_body["items"]
    Object.entries(items).forEach(([key, value]) => {
      console.log(`${key}: ${value["thumbnail_url"]}`)
      getImage(value["thumbnail_url"])
    });
  }
  catch (error) {
    console.log(error);
  }
}

function getImage(url) {
  request.get({
    uri: url,
    method: 'GET',
    encoding: 'binary'
  },
    function (err, res, body) {
      fs.writeFile("images/" + 100 * Math.random() + ".jpg", body, 'binary', function (err) { })
    }
  );
}

const asyncPages = {
  [Symbol.asyncIterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 5) return Promise.resolve({ value: makeRequest(this.i++), done: false });
        return Promise.resolve({ done: true });
      }
    };
  }
};

(async function () {
  //for await (let page of asyncPages)
  //  page.then(result=>console.log(result))
  const createRequests = []
  for (let i = 0; i < 5; i++)
    createRequests.push(Promise.resolve(makeRequest(i)))
  Promise.all(createRequests)
})();
