export interface SingleTodoProps {
  id: number;
  title: string;
  isDone: boolean;
  toggleIsDone: (checked: boolean, index: number) => void;
  index: number;
}
