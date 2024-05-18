import SelectModelFilter from "./SelectModelFilter"
import SelectCategoryMenuBar from "./SelectCategoryMenuBar"

const PageProductsHeader=()=>{
  return(
    <section className="w-full flex flex-col items-center justify-center gap-4">
      <SelectCategoryMenuBar/>
      <SelectModelFilter/>
    </section>
  )
}

export default PageProductsHeader