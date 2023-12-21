import puppeteer from "puppeteer";
import { parseHtml } from "../html-parse/nike";

export async function extractHtml(url: string) {
  let browser;
  let html;

  try {
    console.log("⛏️⛏️⛏️ PUPPETTEER STARTS");
    browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--no-zygote",
        "--hide-scrollbars",
        "--disable-web-security",
      ],
      headless: "new",
      ignoreHTTPSErrors: true,
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url, { timeout: 30000, waitUntil: "domcontentloaded" });

    await page.waitForSelector('button[aria-label="Accept All"]', {
      visible: true,
    });
    const res = await page.evaluate(
      () =>
        document.querySelector("[aria-labelledby^='product-detail']")?.innerHTML
    );
    html = res;
  } catch (e) {
    console.log(e);
    await browser?.close();
    console.log("🚫🚫🚫 PUPPETTEER EXITS");
    throw new Error("No HTML returned from puppeteer!");
  }

  await browser?.close();
  console.log("✔️✔️✔️ PUPPETTEER EXITS");

  if (!html) {
    throw new Error("No HTML returned from puppeteer!");
  }

  return parseHtml(html);
}
