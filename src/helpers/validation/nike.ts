import Ajv from "ajv";
const ajv = new Ajv();

export function validateNikeProduct(data: any) {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string" },
      brand: { type: "string" },
      price: { type: "string" },
      isAvailable: { type: "boolean" },
      isInSale: { type: "boolean" },
      saleDescription: { type: "string" },
      description: { type: "string" },
    },
    required: [
      "name",
      "brand",
      "price",
      "isAvailable",
      "isInSale",
      "saleDescription",
      "description",
    ],
    additionalProperties: false,
  };

  const valid = ajv.validate(schema, data);
  return { valid, errors: ajv.errors };
}
