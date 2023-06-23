export interface EOEvent {
  id: string;
  createdTime: string;
  fields: {
    Host?: string;
    Status?: string;
    Blurb?: string;
    "Location Type"?: string;
    "Image Background"?: string;
    Location?: string;
    Summary?: string;
    Ends?: string;
    Starts?: string;
    "Event Number"?: number;
    "Last Modified"?: number | string;
    Created?: string;
    "Shared By"?: string[];
    Followers?: string[];
    "Event ID"?: string;
  };
}
