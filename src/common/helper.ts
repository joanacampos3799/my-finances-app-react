import { FetchResponse } from "./apiClient";

interface Entity {
  Id?: number | undefined;
  Name: string;
  deleted?: boolean;
}

class Helper<T extends Entity> {
  getPendingData = (data: FetchResponse<T>, pendingData: T) => {
    let tData = data.data ?? [];
    let tCount = data.count ?? 0;
    if (tCount > 0 && tData.find((d) => d.Id === pendingData.Id)) {
      if (pendingData.Name === "Deleted" || pendingData.deleted) {
        tCount = tCount - 1;
        tData = tData.filter((t) => t.Id !== pendingData.Id);
      } else {
        tData = tData.map((c) => {
          if (c.Id === pendingData.Id) return pendingData;
          else return c;
        });
      }
    } else {
      tCount = tCount + 1;
      tData = [...tData, pendingData];
    }

    return { tCount, tData };
  };
}

export default Helper;
