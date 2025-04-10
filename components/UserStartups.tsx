import React from "react";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  const params = { id }; // Pass the author ID to the query
  // const { data: startups } = await sanityFetch({
  //   query: STARTUPS_BY_AUTHOR_QUERY,
  //   params,
  // });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} authorId={id} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
      {/* <SanityLive /> */}
    </>
  );
};
export default UserStartups;
