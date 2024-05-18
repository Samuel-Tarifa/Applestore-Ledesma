import ProductsList from "./ProductsList";
import PageProductsHeader from "./PageProductsHeader";
import ProductDetail from './ProductDetail'
import { FiltersProvider } from "../../context/filterProducts";
import { Routes, Route } from "react-router-dom";

const PageProducts = () => {
  return (
    <FiltersProvider>
      <main className="w-full px-8 pt-4 flex flex-col gap-4 grow items-center">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageProductsHeader />
                <ProductsList />
              </>
            }
          />
          <Route path="/:productId" element={<ProductDetail/>}/>
        </Routes>
      </main>
    </FiltersProvider>
  );
};

export default PageProducts;
