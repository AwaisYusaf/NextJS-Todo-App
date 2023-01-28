
type Todo = {
    id: number;
    name: string;
    todos: { text: string; status: "complete" | "pending" }[];
    createdAt: string;
};


const AppReducer = (state: any, action: any) => {

    switch (action.type) {
        case "CREATE_NEW_LIST":
            const date = new Date();
            const newTodo: Todo = {
                id: state.length + 1,
                name: action.payload,
                todos: [],
                createdAt: date.toLocaleString(),
            };
            return [...state, newTodo];
        case "ADD_NEW_TODO":
            let newState = [...state];
            newState.forEach(todo => {
                if (todo.id == action.payload.id) {
                    todo.todos.push({ text: action.payload.text, status: "pending" });
                }
            })
            return newState;
        case "DELETE_TODO_LIST":
            return state;
        case "DELETE_A_TODO":
            let st3 = [...state];
            st3.forEach((todo) => {
                if (todo.id == action.payload.id) {
                    todo.todos.splice(action.payload.index, 1);
                }
            })
            return st3;
        case "MARK_COMPLETE":
            let state2 = [...state];
            state2.forEach((todo: Todo) => {
                if (todo.id == action.payload.id) {
                    todo.todos[action.payload.index].status = "complete";
                }
            })
            return state2;
        case "MARK_PENDING":
            let state3 = [...state];
            state3.forEach((todo: Todo) => {
                if (todo.id == action.payload.id) {
                    todo.todos[action.payload.index].status = "pending";
                }
            })
            return state3;
        default:
            return state;
    }
}

export { AppReducer };