import ProductsList from "./ProductsList";
import PageProductsHeader from "./PageProductsHeader";
const Products = () => {
  return (
    <main className="w-full px-8 pt-4 flex flex-col gap-4">
      <PageProductsHeader/>
      <ProductsList />
    </main>
  );
};

export default Products;
