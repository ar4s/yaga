export const isArray = (value: any): value is any[] => {
  return typeof value === 'object' && value.length > 0;
};
