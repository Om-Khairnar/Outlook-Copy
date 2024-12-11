export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  short_description: string;
  date: number;
  read?: boolean;
  favorite?: boolean;
}

export interface EmailBody {
  id: string;
  body: string;
}