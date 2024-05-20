import { useContext } from "react";
import { FiltersContext } from "../../context/filterProducts";
import { useCategory } from "../../hooks/useCategory";

const SelectCategoryMenuBar = () => {
  const { filters, setFilters } = useContext(FiltersContext);

  const {category} = useCategory();

  const handleChange = (category) => {
    if (filters.model === "All") {
      setFilters((prevState) => ({ ...prevState, category: category }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        category: category,
        model: "All",
      }));
    }
  };

  return (
    <ul className="flex w-[75%] max-w-60 px-1 justify-between rounded-lg border border-menuBorder">
      {category.map((category) => (
        <li
          key={category.id}
          className={`p-1 px-4 rounded my-1 flex items-center ${
            filters.category === category.name ? "bg-accent" : ""
          }`}
        >
          <button onClick={() => handleChange(category.name)}>
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectCategoryMenuBar;
