import React from "react";
import { pending } from "react-dom";
import { getItemById, updateItem } from "@/utils/actions";

/**
 * Renders the Update Inventory page for a specific item.
 * This page allows users to update the details of an existing inventory item.
 *
 * @param {object} props - The component props.
 * @param {object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the inventory item to update.
 * @returns {Promise<JSX.Element>} A promise that resolves to the JSX element for the update inventory page.
 */
const UpdateInventory = async ({ params }) => {
  const { id } = params;
  const inventory = await getItemById(id);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3">
          Your are updating {inventory?.name}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill out the form below to update this item to your inventory.
        </p>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form action={updateItem}>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-800 font-semibold mb-2"
              >
                Name:
              </label>
              <input
                hidden
                type="text"
                name="id"
                defaultValue={inventory?._id.toString()}
              />
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={inventory?.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Quantity Field */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-gray-800 font-semibold mb-2"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                defaultValue={inventory?.quantity}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Description Field */}
            <div className="mb-8">
              <label
                htmlFor="description"
                className="block text-gray-800 font-semibold mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={inventory?.description}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={pending}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-md transition duration-200"
            >
              {pending ? "Updating..." : "Update Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateInventory;
