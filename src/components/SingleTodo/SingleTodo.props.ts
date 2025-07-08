export interface SingleTodoProps {
  id: number;
  title: string;
  isDone: boolean;
  toggleIsDone: (id: number, checked: boolean) => void;
}
