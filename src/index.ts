import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();
app.use(logger());

app.all("*", (c) => {
  const originalRequest = c.req.raw.clone();
  const url = new URL(originalRequest.url);
  url.protocol = "https:";
  url.hostname = "image.tmdb.org";
  url.port = "";

  console.log(`Proxying ${originalRequest.method} ${url.toString()}`);

  return fetch(url, originalRequest);
});

export default app;
