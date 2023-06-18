import Airtable from "airtable";
import { AIRTABLE_BASE_ID, AIRTABLE_PERSONAL_ACCESS_TOKEN } from "@env";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: AIRTABLE_PERSONAL_ACCESS_TOKEN,
});

export const base = Airtable.base(AIRTABLE_BASE_ID);
