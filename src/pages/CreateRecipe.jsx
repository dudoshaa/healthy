import React, { useEffect } from "react";
import { useDatabase } from "../hooks/UseDatabase";
import toast from "react-hot-toast";

function CreateRecipe() {
  const { postData, getPost, deletePost, data } = useDatabase("/recipes");

  useEffect(() => {
    getPost();
  }, []);

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
      toast.success("Recipe addded successfully");
    } else {
      toast.error("Please fil in all fields");
    }

    e.target.reset();
  };

  return (
    <>
      <form className="input__wrapper container" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="TITLE" />
        <input type="url" name="image" placeholder="IMAGE URL" />
        <input type="text" name="overview" placeholder="OVERWIEW" />
        <input type="number" name="servings" placeholder="SERVINGS" />
        <input type="number" name="prepMinutes" placeholder="PREPMINUTES" />
        <input type="number" name="cookMinutes" placeholder="COOKMINUTES" />
        <input type="text" name="ingredients" placeholder="INGREDIENTS" />
        <input type="text" name="instructions" placeholder="INSCTRUCTION" />
        <button type="submit" className="btn">
          +CREATE
        </button>
      </form>
    </>
  );
}

export default CreateRecipe;
