import "server-only";

import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Add serverToken to allow secure fetching of drafts on the server
  serverToken: process.env.SANITY_SERVER_TOKEN,

  // Add browserToken to enable draft previews in the browser
  browserToken: process.env.SANITY_BROWSER_TOKEN,
});
