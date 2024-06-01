export default function filterProducts(products, filters) {
  if (!products) return [];
  return products.filter((product) => {
    return (
      (filters.model === "All" ||
        (product.iphoneModel[0] &&
          product.iphoneModel[0].name === filters.model) ||
        (product.iphoneModel[1] &&
          product.iphoneModel[1].name === filters.model)) &
      (filters.category === "All" ||
        product.category.name === filters.category) &
      (filters.type === "All" || product.type.name === filters.type) &
      (product.stock > 0)
    );
  });
}
