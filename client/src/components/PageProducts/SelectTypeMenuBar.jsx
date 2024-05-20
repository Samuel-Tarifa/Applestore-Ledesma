import { useContext } from "react";
import { FiltersContext } from "../../context/filterProducts";
import { useTypes } from "../../hooks/useTypes";

const SelectTypeMenuBar = () => {
  const { filters, setFilters } = useContext(FiltersContext);

  const { types } = useTypes();

  const handleChange = (type) => {
    if ((filters.model === "All") & (filters.category === "All")) {
      setFilters((prevState) => ({ ...prevState, type: type }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        type: type,
        model: "All",
        category: "All",
      }));
    }
  };

  return (
    <ul className="flex max-w-96 px-1 justify-between rounded-lg border border-menuBorder">
      {types.map((type) => (
        <li
          key={type.id}
          className={`p-1 px-4 rounded my-1 flex items-center ${
            filters.type === type.name ? "bg-accent" : ""
          }`}
        >
          <button onClick={() => handleChange(type.name)}>
            {type.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectTypeMenuBar;
