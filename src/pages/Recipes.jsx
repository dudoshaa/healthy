import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import { useDatabase } from "../hooks/UseDatabase";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const { getPost, data } = useDatabase("/recipes");
  const [search, setSearch] = useState("");

  const [prepTimeFilters, setPrepTimeFilters] = useState([]);
  const [cookTimeFilters, setCookTimeFilters] = useState([]);
  const [isPrepFilterOpen, setIsPrepFilterOpen] = useState(false);
  const [isCookFilterOpen, setIsCookFilterOpen] = useState(false);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const filteredData = data
    ? data.filter((recipe) => {
        let ok = true;

        if (search.trim() !== "") {
          const lower = search.toLowerCase();
          ok = ok && recipe.title?.toLowerCase().includes(lower);
        }

        if (prepTimeFilters.length > 0) {
          const prepMinutes = recipe.prepMinutes;
          const prepLimits = prepTimeFilters.map((s) =>
            parseInt(s.split("-")[0], 10)
          );
          ok = ok && prepLimits.includes(prepMinutes);
        }

        if (cookTimeFilters.length > 0) {
          const cookMinutes = recipe.cookMinutes;
          const cookLimits = cookTimeFilters.map((s) =>
            parseInt(s.split("-")[0], 10)
          );
          ok = ok && cookLimits.includes(cookMinutes);
        }

        return ok;
      })
    : [];

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
              activeFilters={prepTimeFilters}
              setActiveFilters={setPrepTimeFilters}
              isOpen={isPrepFilterOpen}
              setIsOpen={setIsPrepFilterOpen}
              title="Max Prep Time"
              options={[
                { value: "0-min-prep", label: "0 minutes" },
                { value: "5-min-prep", label: "5 minutes" },
                { value: "10-min-prep", label: "10 minutes" },
              ]}
            />
            <Filters
              activeFilters={cookTimeFilters}
              setActiveFilters={setCookTimeFilters}
              isOpen={isCookFilterOpen}
              setIsOpen={setIsCookFilterOpen}
              title="Max Cook Time"
              options={[
                { value: "0-min-cook", label: "0 minutes" },
                { value: "5-min-cook", label: "5 minutes" },
                { value: "10-min-cook", label: "10 minutes" },
                { value: "15-min-cook", label: "15 minutes" },
                { value: "20-min-cook", label: "20 minutes" },
              ]}
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
