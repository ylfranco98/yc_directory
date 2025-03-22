import { type SchemaTypeDefinition } from "sanity";

import { author } from "@/sanity/schemaTypes/author";
import { startup } from "@/sanity/schemaTypes/startup";
import { playlist } from "@/sanity/schemaTypes/playlist";
import { hello } from "@/sanity/schemaTypes/hello";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist, hello],
};
