import { EOEvent } from "./EOEvent";

export type RoutesParamList = {
  Details: {
    eventsList: string;
    details: EOEvent;
  };
  "Share Event": {
    formType: string;
    details?: EOEvent;
  };
};
