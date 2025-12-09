"use client";
import React from "react";
import { addItem } from "../../utils/actions";
import { useFormStatus } from "react-dom";

/**
 * CreateInventoryForm component.
 * @returns {JSX.Element} The create inventory form component.
 */
const CreateInventoryForm = () => {
  const { pending } = useFormStatus();
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3">
          Add New Inventory Item
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill out the form below to add a new item to your inventory.
        </p>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form action={addItem}>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-800 font-semibold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              {pending ? "Adding..." : "Add Inventory Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInventoryForm;
