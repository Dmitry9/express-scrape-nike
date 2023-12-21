import { StatusMap } from "../types";
import { extractHtml } from "../helpers/html-extract/nike";
import { simulateProcessing } from "../helpers/simulate";
import { URL_BASE } from "../constants";
import url from "url";

// Simulated function for scraping Nike.com
export async function scrapeNikeProduct(
  productId: string,
  statusMap: StatusMap
): Promise<any> {
  try {
    console.log("Scraping data:", { productId });

    await simulateProcessing(10000, false); // Simulate 10 second processing time
    const urlToScrape = url.format(URL_BASE.nike(productId));
    const result = await extractHtml(urlToScrape);

    statusMap[productId].status = "ready";
    statusMap[productId].data = result;
  } catch (error) {
    statusMap[productId].status = "error";
    statusMap[productId].error = error;
  }
}
