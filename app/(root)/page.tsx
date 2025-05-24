import SearchForm from "@/components/SearchForm";
import StartupCard,{ StartupTypeCard }  from "@/components/StartupCards";

import { STARTUPS_QUERIES } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";




export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const param = {search: query || null};
  const session = await auth();
  console.log("session", session?.id);
   


  const {data:posts} = await sanityFetch({query:STARTUPS_QUERIES, params: param});

  console.log(JSON.stringify(posts,null,2));

  return (
    <>
      <section className="pink_container">
        <div className="items-center justify-center">
          <h1 className="heading-section">
            helloguys,
            <br />
            how are you
          </h1>
          <p className="sub-heading !max-w-3xl">welcome to world of mimic</p>
          <SearchForm query={query} />
        </div>
      </section>

      <section className="section_container">
        <p className="text-3xl font-semibold ">
          {query ? `Search result for: " ${query}"` : "Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts && posts.length > 0 ? (
            posts.map((post: StartupTypeCard  ) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No Startup is found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
