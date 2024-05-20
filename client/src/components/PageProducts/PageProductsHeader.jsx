import SelectModelFilter from "./SelectModelFilter"
import SelectTypeMenuBar from "./SelectTypeMenuBar"
// import SelectCategoryFilter from "./SelectCategoryFilter"

const PageProductsHeader=()=>{
  return(
    <section className="w-full flex flex-col items-center justify-center gap-4">
      <SelectTypeMenuBar/>
      <SelectModelFilter/>
      {/* <SelectCategoryFilter/> */}
    </section>
  )
}

export default PageProductsHeader