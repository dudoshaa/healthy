import React, { useState } from "react";
import FiltersItem from "./FiltersItem";

function Filters({ title }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <div className="filters__container">
      <button onClick={() => setOpen(!open)} className="filter__btn">
        <span>{title}</span>{" "}
        <img
          width={20}
          height={20}
          src="../assets/images/icon-chevron-down.svg"
          alt=""
        />
      </button>
      {open && (
        <ul className="filters__list">
          <FiltersItem text="0 minutes" />
          <FiltersItem text="5 minutes" />
          <FiltersItem text="10 minutes" />
          {title === "Max Cook Time" && (
            <>
              <FiltersItem text="15 minutes" />
              <FiltersItem text="20 minutes" />
            </>
          )}
          <li>
            <button onClick={() => {}} className="clear__btn">
              Clear
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Filters;
