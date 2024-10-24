export default interface AccountFormObject {
  Name: string;
  ib: number;
  limit: number;
  selectedInstitution: string;
  selectedAccountTypeId: string;
  paymentDate: Date;
  interest?: number;
  jointUsername?: string;
}
