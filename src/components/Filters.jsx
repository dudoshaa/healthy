import React from "react";

const Filters = ({
  options,
  title,
  activeFilters,
  setActiveFilters,
  isOpen,
  setIsOpen,
}) => {
  const handleClear = () => setActiveFilters([]);
  return (
    <div className="filters__container">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="filter__btn"
      >
        <span>{title}</span>{" "}
        <img
          width={20}
          height={20}
          src="../assets/images/icon-chevron-down.svg"
          alt=""
        />
      </button>

      {isOpen && (
        <ul className="filter__item-wrapper">
          {options.map((o) => (
            <div className="f__item" key={o.value}>
              <input
                className="filter__checkbox"
                type="checkbox"
                name={o.value}
                value={o.value}
                checked={activeFilters.includes(o.value)}
                onChange={() =>
                  setActiveFilters((prev) => {
                    if (prev.includes(o.value)) {
                      return prev.filter((v) => v !== o.value);
                    }
                    return [o.value];
                  })
                }
              />
              {o.label}
            </div>
          ))}
          <button className="clear__btn" type="button" onClick={handleClear}>
            Clear
          </button>
        </ul>
      )}
    </div>
  );
};

export default Filters;
