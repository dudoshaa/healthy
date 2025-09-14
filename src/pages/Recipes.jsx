import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import { useDatabase } from "../hooks/UseDatabase";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const { getPost, data } = useDatabase("/recipes");
  const [filters, setFilters] = useState({ maxPrep: null, maxCook: null });
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPost();
  }, [getPost, data]);

  const filteredData = data
    ? data.filter((recipe) => {
        let ok = true;

        if (search.trim() !== "") {
          const lower = search.toLowerCase();
          ok = ok && recipe.title?.toLowerCase().includes(lower);
        }

        return ok;
      })
    : [];

  const handleFilterChange = (title, value) => {
    if (title === "Max Prep Time") {
      setFilters((prev) => (console.log(prev), { ...prev, maxPrep: value }));
    }
    if (title === "Max Cook Time") {
      setFilters((prev) => ({ ...prev, maxCook: value }));
    }
  };

  return (
    <>
      <section>
        <div className="container simple__container">
          <h1 className="simple__title">Explore our simple, healthy recipes</h1>
          <p className="simple__desc">
            Discover quick, whole-food dishes that fit real-life schedules.
          </p>
        </div>
      </section>

      <section>
        <div className="container recipes__filter">
          <div className="filters__wrapper">
            <Filters
              title="Max Prep Time"
              onFilterChange={handleFilterChange}
            />
            <Filters
              title="Max Cook Time"
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="search__wrapper">
            <input
              className="search"
              type="search"
              placeholder="Search by name or ingredient…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              className="search__icon"
              src="./assets/images/icon-search.svg"
              alt="search"
            />
          </div>
        </div>
      </section>

      <ul className="recipes__list container">
        {!data && <li>Loading...</li>}
        {filteredData.length === 0 && data && <li>No recipes found</li>}
        {filteredData.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </ul>
    </>
  );
}

export default Recipes;
