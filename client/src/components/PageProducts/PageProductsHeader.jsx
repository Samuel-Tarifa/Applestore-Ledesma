import SelectModelFilter from "./SelectModelFilter"
import SelectTypeMenuBar from "./SelectTypeMenuBar"

const PageProductsHeader=()=>{
  return(
    <section className="w-full flex flex-col items-center justify-center gap-4">
      <SelectTypeMenuBar/>
      <SelectModelFilter/>
    </section>
  )
}

export default PageProductsHeader