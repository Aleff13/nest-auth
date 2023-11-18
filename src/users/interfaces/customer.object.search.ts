export interface ICustomerSearchObjectResult {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: {
    name: string;
    email: string;
    password: string;
    role: string;
    id: number;
  };
}
