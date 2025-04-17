// This type casts Events extracted from an Airtable API response.
export interface EOEvent {
  id: string;
  createdTime: string; // TODO: Consider casting to Date?
  fields: {
    "Event Number": number; // Airtable primary field (primary key)
    Blurb: string;
    Host: string;
    Starts: string; // TODO: Consider casting to Date?
    Ends: string; // TODO: Consider casting to Date?
    Location: string;
    "Location Type": string;
    Summary: string;
    Status: string;
    "Image Background": string;
    "Shared By": string[]; // Total participation, Airtable linked records (foreign key to Airtable User)
    Followers?: string[]; // Partial participation, Airtable linked records (foreign key to Airtable User)
  };
}
