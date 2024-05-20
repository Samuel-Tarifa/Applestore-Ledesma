import { useContext, useId } from "react";
import { FiltersContext } from "../../context/filterProducts";
import { useCategory } from "../../hooks/useCategory";

const SelectCategoryFilter = () => {
  const { filters, setFilters } = useContext(FiltersContext);
  const { category } = useCategory();
  const selectCategoryId = useId();

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setFilters((prevState) => ({ ...prevState, category: selectedCategory }));
  };

  return (
    filters.type === "Fundas" && (
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <label
          htmlFor={selectCategoryId}
          className="text-pretty grow text-center"
        >
          Estilo
        </label>
        <select
          name="modelsFilter"
          id={selectCategoryId}
          className="rounded border border-menuBorder w-auto text-center p-1 h-min"
          onChange={handleChange}
          value={filters.category}
        >
          <option value="All">Todos</option>
          {category?.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    )
  );
};

export default SelectCategoryFilter;
