export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}
