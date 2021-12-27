import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = await this.categories.find((c) => c.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };