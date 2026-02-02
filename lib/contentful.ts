import { GraphQLClient } from "graphql-request";
import type { Accordion } from "@/types/contentful";

const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE}/environments/${process.env.ENVIRONMENT}`;

const graphQLClient = new GraphQLClient(CONTENTFUL_GRAPHQL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
});

const ACCORDION_QUERY = `
  query GetAccordions {
    accordionCollection {
      items {
        sys {
          id
        }
        internalName
        title
        accordionItemsCollection {
          items {
            sys {
              id
            }
            name
            text
          }
        }
      }
    }
  }
`;

interface GraphQLAccordionItem {
  sys: { id: string };
  name: string;
  text: string;
}

interface GraphQLAccordion {
  sys: { id: string };
  title: string;
  internalName: string;
  accordionItemsCollection: {
    items: GraphQLAccordionItem[];
  };
}

interface GraphQLResponse {
  accordionCollection: {
    items: GraphQLAccordion[];
  };
}

export async function getAccordions(): Promise<Accordion[]> {
  try {
    const data = await graphQLClient.request<GraphQLResponse>(ACCORDION_QUERY);
    const accordions: Accordion[] = data.accordionCollection.items.map(
      (item) => {
        return {
          id: item.sys.id,
          title: item.title,
          internalName: item.internalName,
          accordionItems: item.accordionItemsCollection.items.map(
            (accordionItem) => ({
              id: accordionItem.sys.id,
              name: accordionItem.name,
              text: accordionItem.text,
            }),
          ),
        };
      },
    );
    return accordions;
  } catch (error) {
    console.error("Error fetching accordion entries:", error);
    throw error;
  }
}
