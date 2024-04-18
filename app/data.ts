import { Images } from "./images/Walls";
import { Image } from "./types";

export const images = {
  records: {} as Record<string, Image>,
  async get(id: string): Promise<Image | null> {
    return images.records[id] || null;
  },
  async getAll(): Promise<Image[]> {
    return Object.keys(images.records).map((key) => images.records[key]);
  },
  async create(values: Image): Promise<Image> {
    const newImage = { ...values };
    images.records[values.name] = newImage;
    return newImage;
  },
};

Images.forEach((img) => images.create(img));
