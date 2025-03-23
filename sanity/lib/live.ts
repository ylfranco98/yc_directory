import "server-only";

import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // serverToken: process.env.SANITY_SERVER_TOKEN, // Use a token with more privileges (server-side)
  // browserToken: process.env.SANITY_BROWSER_TOKEN, // Use a read-only token (exposed to the browser)
});
