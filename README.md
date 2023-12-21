# express-scrape-nike

API using the Express, serving as an interface for scraping product information from Nike.com (US version), and providing real-time status updates to clients. This API will operate in full compliance with Nike's terms of service and legal standards.

# launch

For testing you can use `api-test.http`` with [vscode rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or curl

```sh
npm run build
npm run start

curl http://localhost:3001/scrape/readyset-baby-bodysuit-3wcVf9/66L344-782
```

# dev environment

```sh
npm run dev
curl http://localhost:3000/scrape/readyset-baby-bodysuit-3wcVf9/66L344-782

```

#### Accessible via a specific localhost port ✔️.

3000 development
3001 production

#### A single endpoint for both triggering processes and status monitoring ✔️.

/scrape/:productType/:productHash

#### Immediate HTTP 200 response upon request reception ✔️.

src/server.ts

#### Scraping client is sure about the loaded status of the website ✔️.

```typescript
await page.waitForSelector('button[aria-label="Accept All"]', {
  visible: true,
});
```

#### The API's controller should be responsible for initiating the scraping process upon receiving a trigger request ✔️.

`scrapeNikeProduct` is an async function which called without `await`

```typescript
if (!statusMap[productId]) {
  const processId = Date.now().toString();
  statusMap[productId] = {
    status: "processing",
    data: null,
    processId,
    error: null,
  };
  scrapeNikeProduct(productId, statusMap);
}
```

#### Capability to respond with a "not ready" status during the 10-second simulation.

You don`t realy need this beause puppeteer might take time to extract html

```typescript
await simulateProcessing(10000, false); // Simulate 10 second processing time
```

#### Provision of the final result using the initial endpoint post-calculation ✔️.
