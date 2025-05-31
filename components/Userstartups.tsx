import React from "react";
import { STARTUPS_BY_AUTHOR_QUERYS } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import StartupCards, { StartupTypeCard } from "./StartupCards";

interface Props {
  id: string;
}

const Userstartups = async ({ id }: Props) => {
  const startups: StartupTypeCard[] = await client.fetch(STARTUPS_BY_AUTHOR_QUERYS, { id });

  return (
    <div>
      {startups.length > 0 ? (
        startups.map((startup) => (
          <StartupCards key={startup._id} post={startup} />
        ))
      ) : (
        <p className="text-20-normal text-center">No startups found</p>
      )}
    </div>
  );
};

export default Userstartups;
