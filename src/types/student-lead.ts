export interface StudentLeadSubmission {
  name: string;
  email: string;
  phone: string;
  program?: string;
  stateProvince: string;
  status?: string;
  message?: string;
  leadSource?: string;
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
