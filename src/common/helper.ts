import { FetchResponse } from "./apiClient";

interface Entity {
  Id?: number | undefined;
  Name: string;
  deleted?: boolean;
}

interface EntitySelected<T extends Entity> {
  data: T;
  checked: boolean;
}
export class HelperEntity<T extends Entity> {
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

  getMappedCheckboxEntity = (data: T[], selectedIds?: number[]) => {
    return data.map((d) => {
      const mapped: EntitySelected<T> = {
        data: d,
        checked: selectedIds?.includes(d.Id!!) ?? false,
      };
      return mapped;
    });
  };

  getMappedRadioEntity = (data: T[]) => {
    return data.map((d) => {
      return { id: d.Id!!, name: d.Name };
    });
  };
}

interface Enum {
  id: number;
  name: string;
}

export class HelperEnum<T extends Enum> {
  getMappedRadioEnum = (data: T[]) => {
    return data.map((d) => {
      const mappedBank = { label: d.name, value: d.id };
      return mappedBank;
    });
  };

  getMappedCheckboxEnum = (data: T[], selectedIds?: number[]) => {
    return data.map((d) => {
      return {
        data: { Id: d.id, Name: d.name },
        checked: selectedIds?.includes(d.id) ?? false,
      };
    });
  };
}
