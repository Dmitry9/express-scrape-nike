import url from "url";

export const placeholder = {
  name: "Nike Air Max",
  brand: "Nike",
  price: "$100",
  isAvailable: true,
  isInSale: false,
  saleDescription: "",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export const URL_BASE = {
  nike(path: string) {
    const baseURL = "https://www.nike.com";
    const resource = "t";
    const urlParsed = baseURL + "/" + resource + "/" + path;
    return url.format(urlParsed);
  },
} as const;
