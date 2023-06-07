const validateNewOrder = async (userId: number, productIds: number[]): Promise<string | null> => {
  if (typeof userId !== 'number') return '"userId" must be a number';
  if (typeof productIds === 'string') return '"productIds" must be an array';
  if (productIds.length === 0) return '"productIds" must include only numbers';

  return null;
};

export default validateNewOrder;