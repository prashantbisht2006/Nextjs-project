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

            <div className="flex gap-2">
                {query && <SearchFormReset />}

                <button type="submit" className="search-btn text-white absolute top-111 right-45 -translate-y-1/2">
                    <Search className="size-5" />
                </button>
            </div>
        </Form>
    )
}

export default SearchForm