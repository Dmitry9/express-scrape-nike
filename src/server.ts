import express from "express";
import morgan from "morgan";
import cors from "cors";
import { StatusMap } from "./types";
import { scrapeNikeProduct } from "./helpers/worker";

export const createServer = () => {
  const app = express();

  // In-memory storage for status tracking
  const statusMap: StatusMap = {};

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  app.get("/healthz", (req, res) => {
    return res.json({ ok: true, environment: process.env.NODE_ENV });
  });

  // Endpoint for triggering processes and status monitoring
  app.get("/scrape/:productType/:productHash", async (req, res) => {
    try {
      const { productType, productHash } = req.params;
      if (!productType || !productHash) {
        return res.status(400).send("Invalid input");
      }

      const productId = `${productType}/${productHash}`;

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

      switch (statusMap[productId].status) {
        case "error":
          let error = statusMap[productId].error;
          if (error instanceof Error) {
            error = error.message;
          }
          return res.status(500).json({
            processId: statusMap[productId].processId,
            status: "error",
            error,
          });

        case "processing":
          return res.status(200).json({
            processId: statusMap[productId].processId,
            status: "processing",
          });

        case "ready":
          return res
            .status(200)
            .json({ status: "ready", data: statusMap[productId].data });
        default:
          console.error("Invalid status:", statusMap[productId].status);
          throw new Error("Invalid status");
      }
    } catch (error) {
      console.error("Error during scraping:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  return app;
};
