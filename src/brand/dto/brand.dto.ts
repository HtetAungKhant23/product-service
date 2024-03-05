export type CreateBrandDto = {
  name: string;
  description: string;
  image?: string;
};

export type UpdateBrandDto = {
  id: string;
  name?: string;
  description?: string;
  image?: string;
};
