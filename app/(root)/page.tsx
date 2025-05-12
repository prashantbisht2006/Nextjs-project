import { promises } from "dns";
import SearchForm from "../componet/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{query?:string}>}) {
  const query = (await searchParams).query;
  return (
    <>
    <section className="pink_container">
    <div className=" items-center justify-center ">
    <h1 className="heading-section">helloguys,<br/>how are you</h1>
    <p className="sub-heading !max-w-3xl">welcome to world of mimic</p>
    <SearchForm query={query}/>
    </div>
    </section></>
  )
}