export interface Todo {
  id: string;
  title: string;
  description: string;
  important: boolean;
  completed: boolean;
  createdAt: Date;
}

export interface TodoFormValues {
  title?: string;
  description?: string;
  important?: boolean;
  completed?: boolean;
}
