import { createSlice } from '@reduxjs/toolkit'
import { User, TodoDatas } from '../Interfaces/TodoInterfaces'

const initialUser: User = {
    id: null,
    projects: [],
    invites: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            state.projects = action.payload.projects;
        },
        logout: () => { return initialUser },
        addProject: (state, action) => {
            state.projects.push(action.payload);
            return state;
        },
        deleteProject: (state, action) => {
            state.projects.slice(action.payload.index, 1);
        },
        replaceProjectArray: (state, action) => {
            state.projects = action.payload;
            return state;
        },
        addTodo: (state, action) => {   
            if (state.projects.length > 0)         
                state.projects[action.payload.projectIdx].todos.push(action.payload.todo);
            return state;
        },
        replaceTodosArray: (state, action) => {
            if (state.projects.length > 0)
                state.projects[action.payload.projectIdx].todos = action.payload.newTodosArray;
            return state;
        },
        changeActiveStatus: (state, action) => {
            if (state.projects.length > 0 && state.projects[action.payload.projectIdx].todos.length > 0)
                state.projects[action.payload.projectIdx].todos[action.payload.todoIdx].isActive = action.payload.status;
        },
        changeCompleteStatus: (state, action) => {
            if (state.projects.length > 0 && state.projects[action.payload.projectIdx].todos.length > 0)
                state.projects[action.payload.projectIdx].todos[action.payload.todoIdx].isComplete = action.payload.status;
        },
    }
});
