import { db } from '../db/client';
import { shoes } from '../db/schema';
import { AppError } from '../utils/AppError';
import { eq, and, ilike } from 'drizzle-orm';

export async function createShoe(shoeData: {
  name: string;
  brand: string;
  description?: string;
  price: number;
  size: string;
  color: string;
  category: string;
  inStock?: boolean;
  imageUrl?: string;
}) {
  const result = await db
    .insert(shoes)
    .values(shoeData)
    .returning({
      id: shoes.id,
      name: shoes.name,
      brand: shoes.brand,
      description: shoes.description,
      price: shoes.price,
      size: shoes.size,
      color: shoes.color,
      category: shoes.category,
      inStock: shoes.inStock,
      imageUrl: shoes.imageUrl,
      createdAt: shoes.createdAt,
      updatedAt: shoes.updatedAt,
    });

  return result[0];
}

export async function getShoes(
  page: number,
  limit: number,
  filters: {
    brand?: string;
    category?: string;
    inStock?: boolean;
  } = {}
) {
  const offset = (page - 1) * limit;
  const conditions = [];

  if (filters.brand) {
    conditions.push(ilike(shoes.brand, `%${filters.brand}%`));
  }
  if (filters.category) {
    conditions.push(ilike(shoes.category, `%${filters.category}%`));
  }
  if (filters.inStock !== undefined) {
    conditions.push(eq(shoes.inStock, filters.inStock));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select({
      id: shoes.id,
      name: shoes.name,
      brand: shoes.brand,
      description: shoes.description,
      price: shoes.price,
      size: shoes.size,
      color: shoes.color,
      category: shoes.category,
      inStock: shoes.inStock,
      imageUrl: shoes.imageUrl,
      createdAt: shoes.createdAt,
      updatedAt: shoes.updatedAt,
    })
    .from(shoes)
    .where(whereClause)
    .limit(limit)
    .offset(offset);
}

export async function getShoeById(id: string) {
  const result = await db
    .select({
      id: shoes.id,
      name: shoes.name,
      brand: shoes.brand,
      description: shoes.description,
      price: shoes.price,
      size: shoes.size,
      color: shoes.color,
      category: shoes.category,
      inStock: shoes.inStock,
      imageUrl: shoes.imageUrl,
      createdAt: shoes.createdAt,
      updatedAt: shoes.updatedAt,
    })
    .from(shoes)
    .where(eq(shoes.id, id));

  if (result.length === 0) {
    throw new AppError('Shoe not found', 404);
  }

  return result[0];
}

export async function updateShoe(
  id: string,
  updateData: Partial<{
    name: string;
    brand: string;
    description: string;
    price: number;
    size: string;
    color: string;
    category: string;
    inStock: boolean;
    imageUrl: string;
  }>
) {
  const result = await db
    .update(shoes)
    .set({ ...updateData, updatedAt: new Date() })
    .where(eq(shoes.id, id))
    .returning({
      id: shoes.id,
      name: shoes.name,
      brand: shoes.brand,
      description: shoes.description,
      price: shoes.price,
      size: shoes.size,
      color: shoes.color,
      category: shoes.category,
      inStock: shoes.inStock,
      imageUrl: shoes.imageUrl,
      createdAt: shoes.createdAt,
      updatedAt: shoes.updatedAt,
    });

  if (result.length === 0) {
    throw new AppError('Shoe not found', 404);
  }

  return result[0];
}

export async function deleteShoe(id: string) {
  const result = await db.delete(shoes).where(eq(shoes.id, id)).returning({ id: shoes.id });

  if (result.length === 0) {
    throw new AppError('Shoe not found', 404);
  }

  return { message: 'Shoe deleted successfully' };
}