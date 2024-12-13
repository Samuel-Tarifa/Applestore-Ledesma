import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetail } from "../services/getProductDetail";

export function useProductDetail(productId) {
  const location = useLocation();
  const productFromState = location.state?.product || null;

  const [product, setProduct] = useState(productFromState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!productFromState);

  useEffect(() => {
    if (!productFromState && productId) {
      getProductDetail(productId).then((result) => {
        if (!result.ok) {
          setError(result.error.message);
        } else {
          setProduct(result.data);
          setLoading(false);
        }
      });
    }
  }, [productFromState, productId]);

  return { product, error, loading };
}
