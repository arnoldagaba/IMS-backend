import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
});
export type createCategoryDTO = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
});
export type updateCategoryDTO = z.infer<typeof updateCategorySchema>;
