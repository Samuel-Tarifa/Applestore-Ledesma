import ProductsList from "./ProductsList";
import PageProductsHeader from "./PageProductsHeader";
import { FiltersProvider } from "../../context/filterProducts";
const Products = () => {
  return (
    <FiltersProvider>
      <main className="w-full px-8 pt-4 flex flex-col gap-4 grow">
        <PageProductsHeader />
        <ProductsList />
      </main>
    </FiltersProvider>
  );
};

export default Products;
