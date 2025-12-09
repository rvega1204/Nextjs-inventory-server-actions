import mongoose from "mongoose";

/**
 * InventoryItem model.
 * @typedef {Object} InventoryItem
 * @property {string} name - The name of the inventory item.
 * @property {number} quantity - The quantity of the inventory item.
 * @property {string} description - The description of the inventory item.
 */
const inventoryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const InventoryItem =
  mongoose.models.InventoryItem ||
  mongoose.model("InventoryItem", inventoryItemSchema);

export default InventoryItem;
