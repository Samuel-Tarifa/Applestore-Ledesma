import { useContext } from "react";
import { FiltersContext } from "../../context/filterProducts";

const SelectCategoryMenuBar = () => {

  const { filters, setFilters } = useContext(FiltersContext);

  const handleChange = (category) => {
    setFilters((prevState) => ({ ...prevState, category: category }));
  };

  const categories = [
    { name: 'Fundas', value: 'Silicone Case' },
    { name: 'Cargadores', value: 'Cargadores' }
  ];

  return (
    <ul className="flex w-[75%] max-w-60 px-1 justify-between rounded-lg border border-menuBorder">
      {categories.map((category) => (
        <li
          key={category.value}
          className={`p-1 px-4 rounded my-1 flex items-center ${filters.category === category.value ? 'bg-accent' : ''}`}
        >
          <button onClick={() => handleChange(category.value)}>{category.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default SelectCategoryMenuBar;
