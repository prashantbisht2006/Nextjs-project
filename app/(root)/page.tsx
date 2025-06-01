import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCards";

import { STARTUPS_QUERIES } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

type SearchParamsType = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParamsType
}) {
  const query = (await searchParams)?.query || null;
  const param = { search: query };

  const session = await auth();
  console.log("session", session?.id);

  const result = await sanityFetch({
    query: STARTUPS_QUERIES,
    params: param,
  });

  const posts: StartupTypeCard[] = result.data;

  return (
    <div>
      <section className="pink_container">
        <div className="items-center justify-center">
          <h1 className="heading-section">
            Invent. Host. Acale.
            <br />
            startup-next
          </h1>
          <p className="sub-heading !max-w-3xl">
            Start small, think big, move fast.
          </p>
          <SearchForm query={query as string || ""} />
        </div>
      </section>

      <section className="section_container">
        <p className="text-3xl font-semibold ">
          {query ? `Search result for: "${query}"` : "Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No Startup is found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </div>
  );
}
