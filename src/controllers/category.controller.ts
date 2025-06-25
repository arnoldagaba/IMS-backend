import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { categoryService } from "../services/category.service.js";
import { createCategoryDTO, updateCategoryDTO } from "../validators/category.validator.js";

/**
 * Create a new category
 * @param req Request object
 * @param res Response object
 */
export const createCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const categoryData: createCategoryDTO = req.body;
    const category = await categoryService.createCategory(categoryData);

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Category created successfully",
        data: category,
    });
});

/**
 * Get all categories
 * @param req Request object
 * @param res Response object
 */
export const getAllCategories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const categories = await categoryService.getAllCategories();

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Categories fetched successfully",
        data: categories,
    });
});

/**
 * Get a category by ID
 * @param req Request object
 * @param res Response object
 */
export const getCategoryById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const categoryId = req.params.id;
    const category = await categoryService.getCategoryById(categoryId!);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Category fetched successfully",
        data: category,
    });
});

/**
 * Update a category
 * @param req Request object
 * @param res Response object
 */
export const updateCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const categoryId = req.params.id;
    const categoryData: updateCategoryDTO = req.body;
    const updatedCategory = await categoryService.updateCategory(categoryId!, categoryData);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
    });
});

/**
 * Delete a category
 * @param req Request object
 * @param res Response object
 */
export const deleteCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const categoryId = req.params.id;
    await categoryService.deleteCategory(categoryId!);

    res.status(StatusCodes.NO_CONTENT).json({
        success: true,
        message: "Category deleted successfully",
    });
});
