interface IApplication {
  no: number;
  existingType: string;
  applicationType: string;
  documentsToBeSubmitted: string;
  applicationDate: string;
  approval: string;
  reasonForRefusalOfApproval?: string | null;
  approvalDate: string;
}

export type { IApplication };
