import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCards";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERIES } from "@/sanity/lib/queries";
import { StartupCardType } from "@/sanity/types";



export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERIES);
  console.log(JSON.stringify(posts,null,2));
  // const posts = [
  //   {
  //     _id: "1", 
  //     _createdAt: new Date(),
  //     views: 100,
  //     authors: { _id: "1", name: "prashant" },
  //     description: "this is the description", 
  //     image: "https://images.unsplash.com/photo-1677631231231-123123123123?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  //     category: "technology",
  //     title: "technologia",
  //   },
  // ];

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
            posts.map((post:StartupCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No Startup is found</p>
          )}
        </ul>
      </section>
    </>
  );
}
