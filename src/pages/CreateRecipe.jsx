import React, { useEffect } from "react";
import { useDatabase } from "../hooks/UseDatabase";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

function CreateRecipe() {
  const { postData, getPost, deletePost, data } = useDatabase("/recipes");

  useEffect(() => {
    getPost();
  }, []);

  const handleDelete = (id) => {
    deletePost(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title");
    const img = formData.get("image");
    const overview = formData.get("overview");
    const servings = formData.get("servings");
    const prepMinutes = formData.get("prepMinutes");
    const cookMinutes = formData.get("cookMinutes");
    const ingredients = formData.get("ingredients").split(",");
    const instructions = formData
      .get("instructions")
      .split(",")
      .map((i) => i.trim());
    if (
      title &&
      img &&
      overview &&
      servings &&
      prepMinutes &&
      cookMinutes &&
      ingredients &&
      instructions
    ) {
      postData({
        title,
        image: {
          small: img,
          large: img,
        },
        overview,
        servings,
        prepMinutes: Number(prepMinutes),
        cookMinutes: Number(cookMinutes),
        ingredients: ingredients.map((i) => i.trim()),
        instructions: instructions.map((i) => i.trim()),
      });
      alert("Recipe addded successfully");
    } else {
      alert("Please fil in all fields");
    }

    e.target.reset();
  };

  return (
    <>
      <form className="input__wrapper container" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="title" />
        <input type="url" name="image" placeholder="image url" />
        <input type="text" name="overview" placeholder="overview" />
        <input type="number" name="servings" placeholder="servings" />
        <input type="number" name="prepMinutes" placeholder="prepMinutes" />
        <input type="number" name="cookMinutes" placeholder="cookMinutes" />
        <input type="text" name="ingredients" placeholder="ingredients" />
        <input type="text" name="instructions" placeholder="instruction" />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateRecipe;
