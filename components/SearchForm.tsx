import Form from "next/form";
import SearchFormReset from "./SerchFormReset";
import {Search} from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
    return (
        <Form action="/" scroll={false} className="search-form">
            <input
                name="query"
                defaultValue={query}
                className="search-input"
                placeholder="Search Startups"
            />

            <div className="relative flex items-center gap-2 w-full">
  {query && <SearchFormReset />}

  

  <button
    type="submit"
    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black p-2 rounded-full text-white p-3 hover:bg-black transition"
  >
    <Search className="w-6 h-6" />
  </button>
</div>

        </Form>
    )
}

export default SearchForm