import { createSlice } from '@reduxjs/toolkit'
import { User } from '../Interfaces/TodoInterfaces'

const initialUser: User = {
    id: null,
    isDeleted: false,
    todos: [],
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
            state.isDeleted = action.payload.isDeleted;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            state.todos = action.payload.todos;
        },
        logout: () => { return initialUser },
    }
});
