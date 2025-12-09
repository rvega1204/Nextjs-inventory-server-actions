import {
  addItem,
  getInventoryItems,
  deleteItem,
  updateItem,
} from "@/utils/actions";
import InventoryItem from "@/models/InventoryItem";
import connectDB from "@/utils/connectDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Mocks the InventoryItem Mongoose model to prevent actual database interactions during tests.
 * Each Mongoose method used in the actions is mocked with a Jest mock function,
 * allowing us to track calls and control return values.
 */

jest.mock("@/models/InventoryItem", () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
});

jest.mock("mongoose", () => {
  return {
    Schema: class {
      constructor() {}
    },
    model: jest.fn(),
    models: {},
    connect: jest.fn(),
  };
});

/**
 * Mocks the connectDB function to prevent actual database connections during tests.
 * The mock function is defined to return a Jest mock function, which allows us to track calls.
 */
jest.mock("@/utils/connectDB", () => jest.fn());

/**
 * Mocks the revalidatePath function from next/cache to prevent actual cache invalidation during tests.
 * The mock function is defined to return a Jest mock function, which allows us to track calls.
 */
jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

/**
 * Mocks the redirect function from next/navigation to prevent actual navigation during tests.
 * The mock function is defined to return a Jest mock function, which allows us to track calls.
 */
jest.mock("next/navigation", () => ({ redirect: jest.fn() }));

/**
 * Sets up a test suite for server actions.
 * Each test case is wrapped in a describe block for better organization.
 * beforeEach is used to reset all mocks before each test case.
 */
describe("Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addItem", () => {
    it("should create a new item and redirect", async () => {
      const formData = new FormData();
      formData.append("name", "Test Item");
      formData.append("quantity", "10");
      formData.append("description", "Test Description");

      // Setup the mock implementation
      InventoryItem.create.mockResolvedValueOnce({});

      await addItem(formData);

      expect(connectDB).toHaveBeenCalled();
      expect(InventoryItem.create).toHaveBeenCalledWith({
        name: "Test Item",
        quantity: 10,
        description: "Test Description",
      });
      expect(revalidatePath).toHaveBeenCalledWith("/inventory");
      expect(redirect).toHaveBeenCalledWith("/inventory");
    });

    it("should throw an error if creation fails", async () => {
      const formData = new FormData();
      InventoryItem.create.mockRejectedValueOnce(new Error("DB Error"));

      await expect(addItem(formData)).rejects.toThrow("Error: DB Error");
    });
  });

  describe("getInventoryItems", () => {
    it("should return inventory items", async () => {
      const mockItems = [{ name: "Item 1" }, { name: "Item 2" }];
      InventoryItem.find.mockResolvedValueOnce(mockItems);

      const items = await getInventoryItems();

      expect(connectDB).toHaveBeenCalled();
      expect(InventoryItem.find).toHaveBeenCalled();
      expect(items).toEqual(mockItems);
    });

    it("should throw an error if fetch fails", async () => {
      InventoryItem.find.mockRejectedValueOnce(new Error("DB Error"));

      await expect(getInventoryItems()).rejects.toThrow(
        "Failed to fetch inventory items"
      );
    });
  });

  describe("updateItem", () => {
    it("should update an item and redirect", async () => {
      const formData = new FormData();
      formData.append("id", "123");
      formData.append("name", "Updated Item");
      formData.append("quantity", "20");
      formData.append("description", "Updated Description");

      InventoryItem.findByIdAndUpdate.mockResolvedValueOnce({});

      await updateItem(formData);

      expect(connectDB).toHaveBeenCalled();
      expect(InventoryItem.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        {
          name: "Updated Item",
          quantity: 20,
          description: "Updated Description",
        },
        { new: true }
      );
      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(redirect).toHaveBeenCalledWith("/");
    });

    it("should throw an error if update fails", async () => {
      const formData = new FormData();
      InventoryItem.findByIdAndUpdate.mockRejectedValueOnce(
        new Error("DB Error")
      );

      await expect(updateItem(formData)).rejects.toThrow(
        "Failed to update item in inventory"
      );
    });
  });

  describe("deleteItem", () => {
    it("should delete an item and redirect", async () => {
      const formData = new FormData();
      formData.append("id", "123");

      InventoryItem.findByIdAndDelete.mockResolvedValueOnce({});

      await deleteItem(formData);

      expect(connectDB).toHaveBeenCalled();
      expect(InventoryItem.findByIdAndDelete).toHaveBeenCalledWith("123");
      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(redirect).toHaveBeenCalledWith("/");
    });

    it("should throw an error if deletion fails", async () => {
      const formData = new FormData();
      InventoryItem.findByIdAndDelete.mockRejectedValueOnce(
        new Error("DB Error")
      );

      await expect(deleteItem(formData)).rejects.toThrow(
        "Failed to delete item from inventory"
      );
    });
  });
});
