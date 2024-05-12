import { useContext, useId } from "react";
import { useIPhoneModels } from "../../hooks/useIPhoneModels";
import { FiltersContext } from "../../context/filterProducts";

const SelectModelFilter = () => {
  const { filters,setFilters } = useContext(FiltersContext);
  const { IPhoneModels } = useIPhoneModels();
  const selectModelId = useId();

  const handleChange = () => {
    const selectedModel = event.target.value;
    setFilters((prevState) => ({ ...prevState, model: selectedModel }));
  };

  return (
    <div className="flex gap-2">
      <label htmlFor={selectModelId} className="text-pretty">Selecciona tu modelo de iPhone:</label>
      <select
        name="modelsFilter"
        id={selectModelId}
        className="rounded border"
        onChange={handleChange}
        value={filters.model}
      >
        <option value="All" defaultValue={"All"}>
          Todos
        </option>
        {IPhoneModels?.map((model) => (
          <option key={model.id} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectModelFilter;
