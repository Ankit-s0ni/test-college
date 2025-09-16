export interface StudentLeadSubmission {
  name: string;
  email: string;
  phone: string;
  stateProvince: string;
  locale: string;
}

export interface StudentLeadAPI {
  submit: (leadData: StudentLeadSubmission) => Promise<StudentLeadResponse>;
}

export interface StudentLeadResponse {
  success: boolean;
  message?: string;
  data?: any;
}
