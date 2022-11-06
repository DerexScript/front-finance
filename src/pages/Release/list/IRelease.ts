export interface IRelease {
  id: number;
  name: string;
  description: string;
  status: number;
  release_id: number | null;
  company_id: number | null;
}
