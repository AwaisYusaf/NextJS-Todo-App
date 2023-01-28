import { AppReducer } from "./AppReducer";
import { createContext, useReducer } from "react";
import type { Dispatch } from "react";

type Todo = {
  id: number;
  name: string;
  todos: { text: string; status: "complete" | "pending" }[];
  createdAt: string;
};

let initialState: Todo[] = [
  {
    id: 1,
    name: "Grocery",
    todos: [
      { text: "Go for a walk", status: "pending" },
      { text: "Buy Some carrots", status: "pending" },
    ],
    createdAt: "1-3-2022",
  },
  {
    id: 2,
    name: "University",
    todos: [{ text: "Go for laptop repairing", status: "pending" }],
    createdAt: "1-4-2022",
  },
];
type MyContextType = {
  data: Todo[];
  dispatch?: Dispatch<any> | null;
};
const MyContext = createContext<MyContextType>({ data: initialState });

const GlobalContext = (props: any) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <MyContext.Provider value={{ data: state, dispatch: dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
};

export { MyContext, GlobalContext };
