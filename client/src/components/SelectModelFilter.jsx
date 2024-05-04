import { useId } from "react";
import { useIPhoneModels } from "../hooks/useIPhoneModels";

const SelectModelFilter = () => {
  const {IPhoneModels}=useIPhoneModels()
  const selectModelId = useId();
  return (
    <div className="flex gap-2">
      <label htmlFor={selectModelId}>Selecciona tu modelo de iPhone:</label>
      <select name="modelsFilter" id={selectModelId} className="rounded border">
        <option value="All">Todos</option>
        {IPhoneModels?.map(model=>(
          <option key={model.id} value={model.name}>{model.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectModelFilter;
