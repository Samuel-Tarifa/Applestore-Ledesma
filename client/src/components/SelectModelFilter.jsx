import { useContext, useId } from "react";
import { useIPhoneModels } from "../hooks/useIPhoneModels";
import { FiltersContext } from "../context/filterProducts";

const SelectModelFilter = () => {
  const {filters,setFilters}=useContext(FiltersContext)
  const {IPhoneModels}=useIPhoneModels()
  const selectModelId = useId();

  const handleChange=()=>{
    const selectedModel=event.target.value;
    setFilters(prevState=>({...prevState,model:selectedModel}))
  }

  console.log(filters)

  return (
    <div className="flex gap-2">
      <label htmlFor={selectModelId}>Selecciona tu modelo de iPhone:</label>
      <select name="modelsFilter" id={selectModelId} className="rounded border" onChange={handleChange}>
        <option value="All" selected>Todos</option>
        {IPhoneModels?.map(model=>(
          <option key={model.id} value={model.name}>{model.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectModelFilter;
