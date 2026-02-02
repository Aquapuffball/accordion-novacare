import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAccordions } from "../contentful";

const { mockRequest } = vi.hoisted(() => {
  return {
    mockRequest: vi.fn(),
  };
});

vi.mock("graphql-request", () => {
  class GraphQLClient {
    request = mockRequest;
  }

  return {
    GraphQLClient,
  };
});

describe("getAccordions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRequest.mockReset();
  });

  it("fetches and transforms accordion data correctly", async () => {
    const mockData = {
      accordionCollection: {
        items: [
          {
            sys: { id: "accordion-1" },
            title: "FAQ Section",
            internalName: "FAQ",
            accordionItemsCollection: {
              items: [
                {
                  sys: { id: "item-1" },
                  name: "Question 1",
                  text: "Answer 1",
                },
                {
                  sys: { id: "item-2" },
                  name: "Question 2",
                  text: "Answer 2",
                },
              ],
            },
          },
        ],
      },
    };

    mockRequest.mockResolvedValue(mockData);

    const result = await getAccordions();

    expect(result).toEqual([
      {
        id: "accordion-1",
        title: "FAQ Section",
        internalName: "FAQ",
        accordionItems: [
          { id: "item-1", name: "Question 1", text: "Answer 1" },
          { id: "item-2", name: "Question 2", text: "Answer 2" },
        ],
      },
    ]);
  });

  it("handles empty accordion collection", async () => {
    mockRequest.mockResolvedValue({
      accordionCollection: {
        items: [],
      },
    });

    const result = await getAccordions();
    expect(result).toEqual([]);
  });

  it("handles accordion with no items", async () => {
    mockRequest.mockResolvedValue({
      accordionCollection: {
        items: [
          {
            sys: { id: "accordion-1" },
            title: "Empty FAQ",
            internalName: "Empty",
            accordionItemsCollection: {
              items: [],
            },
          },
        ],
      },
    });

    const result = await getAccordions();
    expect(result).toEqual([
      {
        id: "accordion-1",
        title: "Empty FAQ",
        internalName: "Empty",
        accordionItems: [],
      },
    ]);
  });

  it("throws error when request fails", async () => {
    const error = new Error("Network error");
    mockRequest.mockRejectedValue(error);

    await expect(getAccordions()).rejects.toThrow("Network error");
  });
});
