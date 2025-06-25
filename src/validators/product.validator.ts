import { z } from "zod";

export const createProductSchema = z.object({
    sku: z.string().min(2).max(100),
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
    costPrice: z.number().min(0).optional(),
    sellingPrice: z.number().min(0).optional(),
    categoryId: z.string().uuid(),
});
export type createProductDTO = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
    sku: z.string().min(2).max(100).optional(),
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    costPrice: z.number().min(0).optional(),
    sellingPrice: z.number().min(0).optional(),
    categoryId: z.string().uuid().optional(),
});
export type updateProductDTO = z.infer<typeof updateProductSchema>;