export type TResponse<T> = {
  data: any;
  status: 'SUCCESS' | 'ERROR';
  message: string;
};
