export interface Project {
  name: string;
  description: string;
  deadLine: Date;
  stack: string[];
  maker: number;
  owner?: number;
}
