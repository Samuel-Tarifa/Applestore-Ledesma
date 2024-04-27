export const getProducts = () => {
  return fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin")
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
      throw error;
    });
};
