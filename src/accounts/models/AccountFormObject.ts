export default interface AccountFormObject {
  Name: string;
  ib: string;
  limit?: string;
  selectedInstitution: string;
  selectedAccountTypeId: string;
  paymentDate?: Date;
  statementDate?: Date;
  interest?: string;
  goal?: string;
}
