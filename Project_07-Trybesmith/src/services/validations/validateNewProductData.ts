import { ProductInputtableTypes } from '../../database/models/product.model';

const validateNewProduct = (newProduct: ProductInputtableTypes): string | null => {
  const { name, price } = newProduct;
  if (typeof name !== 'string') return '"name" must be a string';
  if (name.length <= 2) return '"name" length must be at least 3 characters long';
  if (typeof price !== 'string') return '"price" must be a string';
  if (price.length <= 2) return '"price" length must be at least 3 characters long';

  return null;
};

export default validateNewProduct;
