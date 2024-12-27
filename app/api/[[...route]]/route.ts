import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import AddressRouter from "./address";
import TotalAddressRouter from "./total-address";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/:email/address", AddressRouter)
  .route("/:email/total-addresses", TotalAddressRouter);

console.log(routes);

app.onError((err, ctx) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return ctx.json({ error: err.message }, 500);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
