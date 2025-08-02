import { Email } from "../models/Email/EmailModel";
import { elasticClient } from "./elasticClient";


export async function indexEmail(email: Email) {
  await elasticClient.index({
    index: 'emails',
    document: email,
  });
}
