import EnumType from "../../common/EnumType";

export default interface AccountFormObject {
  Name: string;
  ib: number;
  selectedBank: string;
  selectedAccountTypes: {
    data: {
      Id: number;
      Name: string;
    };
    checked: boolean;
  }[];
}
