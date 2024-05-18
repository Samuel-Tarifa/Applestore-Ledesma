import { useContext, useId } from "react";
import { useIPhoneModels } from "../../hooks/useIPhoneModels";
import { FiltersContext } from "../../context/filterProducts";

const SelectModelFilter = () => {
  const { filters, setFilters } = useContext(FiltersContext);
  const { IPhoneModels } = useIPhoneModels();
  const selectModelId = useId();

  const handleChange = (event) => {
    const selectedModel = event.target.value;
    setFilters((prevState) => ({ ...prevState, model: selectedModel }));
  };

  return (
    filters.category !== 'Cargadores' && (
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <label htmlFor={selectModelId} className="text-pretty grow text-center">
          Selecciona tu modelo de iPhone:
        </label>
        <select
          name="modelsFilter"
          id={selectModelId}
          className="rounded border border-menuBorder w-auto text-center p-1 h-min"
          onChange={handleChange}
          value={filters.model}
        >
          <option value="All">Todos</option>
          {IPhoneModels?.map((model) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
    )
  );
};

export default SelectModelFilter;
