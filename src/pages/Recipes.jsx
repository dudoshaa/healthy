import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import { useDatabase } from "../hooks/UseDatabase";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const { postData, getPost, deletePost, data } = useDatabase("/recipes");

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <>
      <section>
        <div className="container simple__container">
          <h1 className="simple__title">Explore our simple, healthy recipes</h1>
          <p className="simple__desc">
            Discover eight quick, whole-food dishes that fit real-life schedules
            and taste amazing. Use the search bar to find a recipe by name or
            ingredient, or simply scroll the list and let something delicious
            catch your eye.
          </p>
        </div>
      </section>
      <section>
        <div className="container recipes__filter">
          <div className="filters__wrapper">
            <Filters title="Max Prep Time" />
            <Filters title="Max Cook Time" />
          </div>

          <div className="search__wrapper">
            <input
              className="search"
              type="search"
              placeholder="Search by name or ingredient…"
            />
            <img
              className="search__icon"
              src="./assets/images/icon-search.svg"
              alt=""
            />
          </div>
        </div>
      </section>

      <ul className="recipes__list container">
        {!data && <li>Loading...</li>}
        {data &&
          data.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe.id} />;
          })}
      </ul>
    </>
  );
}

export default Recipes;
