import React from "react";

function FiltersItem({ text }) {
  return (
    <li className="filters__item" tabindex="0">
      <input className="filter__checkbox" type="checkbox" />
      <p className="filter__text">{text}</p>
    </li>
  );
}

export default FiltersItem;
