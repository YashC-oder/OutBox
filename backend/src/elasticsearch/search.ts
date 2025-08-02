import { Email } from "../models/Email/EmailModel";
import { elasticClient } from "./elasticClient";

interface EmailSearchFilter {
  folder?: string;
  category?: string;
  account?: string;
  userAccount: string;
}

export async function searchEmailsByFilter(filter: EmailSearchFilter): Promise<Email[]> {
  const mustFilters = [];
  mustFilters.push({ term: { account: filter.userAccount } });
  if (filter.folder) mustFilters.push({ term: { folder: filter.folder } });
  if (filter.category) mustFilters.push({ term: { category: filter.category } });
  if (filter.account) mustFilters.push({ term: { account: filter.account } });

  const result = await elasticClient.search({
    index: 'emails',
    query: { bool: { filter: mustFilters } },
    size: 30,
  });

  return result.hits.hits.map(hit => hit._source as Email);
}

export async function getAllEmails(): Promise<Email[]> {
  const { hits } = await elasticClient.search({
    index: 'emails',
    size: 100,
    query: {
      match_all: {},
    },
  });

  return hits.hits.map(hit => hit._source as Email);
}