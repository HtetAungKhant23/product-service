export type CreateBrandDto = {
  name: string;
  desc: string;
  image?: string;
};

export type UpdateBrandDto = {
  id: string;
  name?: string;
  desc?: string;
  image?: string;
};
