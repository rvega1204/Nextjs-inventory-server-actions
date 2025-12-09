"use server";
import InventoryItem from "../models/InventoryItem";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "./connectDB";

/**
 * Validates the parameters for adding or updating an inventory item.
 * @param {Object} params - The parameters to validate.
 * @param {string} params.name - The name of the inventory item.
 * @param {string} params.quantity - The quantity of the inventory item.
 * @param {string} params.description - The description of the inventory item.
 * @throws {Error} If any of the required fields are missing or if the quantity is not a number or is negative.
 */
function validateParams(params) {
  if (!params.name || !params.quantity || !params.description) {
    throw new Error("All fields are required");
  }

  if (isNaN(params.quantity)) {
    throw new Error("Quantity must be a number");
  }

  if (params.quantity < 0) {
    throw new Error("Quantity must be a positive number");
  }
}

/**
 * Validates the ID of an inventory item.
 * @param {string} id - The ID of the inventory item to validate.
 * @throws {Error} If the ID is missing.
 */
function validateId(id) {
  if (!id) {
    throw new Error("Item ID is required");
  }
}

/**
 * Adds a new inventory item.
 * @param {FormData} formData - The form data containing the item details.
 * @returns {Promise<void>} A promise that resolves when the item is added.
 */
export const addItem = async (formData) => {
  try {
    await connectDB();
    const name = formData.get("name");
    const quantity = formData.get("quantity");
    const description = formData.get("description");
    validateParams({ name, quantity, description });

    await InventoryItem.create({
      name,
      quantity: Number(quantity),
      description,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    throw new Error(error);
  }
  revalidatePath("/inventory");
  redirect("/inventory");
};

/**
 * Retrieves all inventory items.
 * @returns {Promise<Array<InventoryItem>>} A promise that resolves to an array of inventory items.
 */
export const getInventoryItems = async () => {
  try {
    await connectDB();
    return await InventoryItem.find();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch inventory items", error);
  }
};

/**
 * Retrieves an inventory item by ID.
 * @param {string} id - The ID of the inventory item to retrieve.
 * @returns {Promise<InventoryItem>} A promise that resolves to the inventory item.
 */
export const getItemById = async (id) => {
  try {
    validateId(id);
    await connectDB();
    return await InventoryItem.findById(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch inventory item", error);
  }
};

/**
 * Updates an inventory item.
 * @param {FormData} formData - The form data containing the updated item details.
 * @returns {Promise<void>} A promise that resolves when the item is updated.
 */
export const updateItem = async (formData) => {
  try {
    await connectDB();
    const id = formData.get("id");
    validateId(id);
    const name = formData.get("name");
    const quantity = formData.get("quantity");
    const description = formData.get("description");
    validateParams({ name, quantity, description });

    await InventoryItem.findByIdAndUpdate(
      id,
      {
        name,
        quantity: Number(quantity),
        description,
      },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update item in inventory", error);
  }
  revalidatePath("/");
  redirect("/");
};

/**
 * Deletes an inventory item.
 * @param {FormData} formData - The form data containing the ID of the item to delete.
 * @returns {Promise<void>} A promise that resolves when the item is deleted.
 */
export const deleteItem = async (formData) => {
  try {
    await connectDB();
    const id = formData.get("id");
    validateId(id);
    await InventoryItem.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete item from inventory", error);
  }
  revalidatePath("/");
  redirect("/");
};
