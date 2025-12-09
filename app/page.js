import { deleteItem, getInventoryItems } from "@/utils/actions";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

/**
 * Renders the Home page, displaying a list of inventory items.
 * Allows users to view, add, edit, and delete inventory items.
 *
 * @returns {Promise<JSX.Element>} The Home page component.
 */
export default async function Home() {
  const items = await getInventoryItems();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Product Inventory
          </h1>
          <p className="text-gray-600">
            Learn to use NextJS Server Actions by building inventory application
          </p>
        </div>

        {/* Add New Item Button */}
        <Link
          href="/inventory"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 mb-6"
        >
          <FiPlus size={20} />
          Add New Item
        </Link>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {/* Edit Button */}
                      <Link
                        href={`/inventory/${item._id}`}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FiEdit size={20} />
                      </Link>

                      <form action={deleteItem}>
                        <input
                          type="hidden"
                          name="id"
                          defaultValue={item._id.toString()}
                        />
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <MdDelete size={20} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No items in inventory yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
