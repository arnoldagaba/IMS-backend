import prisma from "../config/prisma.js";
import { createCategoryDTO, updateCategoryDTO } from "../validators/category.validator.js";

class CategoryService {
    /**
     * Create a new category
     * @param data createCategoryDTO
     * @returns The created category
     */
    createCategory = async (data: createCategoryDTO) => {
        const category = await prisma.category.create({
            data: {
                name: data.name,
                description: data?.description,
            },
        });

        return category;
    };

    /**
     * Get all categories
     */
    getAllCategories = async () => {
        return await prisma.category.findMany({
            orderBy: {
                name: "asc",
            },
        });
    };

    /**
     * Get a category by ID
     * @param id Category ID
     */
    getCategoryById = async (id: string) => {
        const category = await prisma.category.findUnique({
            where: {
                id,
            },
        });

        if (!category) {
            throw new Error("Category not found");
        }

        return category;
    };

    /**
     * Update a category
     * @param id Category ID
     * @param data Data to update
     */
    updateCategory = async (id: string, data: updateCategoryDTO) => {
        const category = await prisma.category.update({
            where: {
                id,
            },
            data: {
                name: data?.name,
                description: data?.description,
            },
        });

        return category;
    };

    /**
     * Delete a category
     * @param id Category ID
     */
    deleteCategory = async (id: string) => {
        await prisma.category.delete({
            where: {
                id,
            },
        });

        return;
    };
}

export const categoryService = new CategoryService();
