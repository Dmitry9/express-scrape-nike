import cheerio from "cheerio";
import { validateNikeProduct } from "../validation/nike";

export function parseHtml(html: string) {
  const $ = cheerio.load(html);
  const name = $("h1").text().trim();
  const price = $(".product-price.is--current-price").text().trim();
  const isInSale = $(".product-price.is--striked-out").length > 0;
  const saleDescription = isInSale
    ? $(".product-price.is--striked-out").text().trim()
    : "";
  const description = $('div[data-test="inline-product-description"] p')
    .text()
    .trim();

  const [brand, ...finalName] = name.split(" ");
  const result = {
    name: finalName.join(" "),
    brand,
    description,
    price,
    isAvailable: isInSale,
    isInSale,
    saleDescription,
  };
  const validated = validateNikeProduct(result);

  if (!validated.valid) {
    throw new Error(`Validation errors: ${JSON.stringify(validated.errors)}`);
  }

  return result;
}
