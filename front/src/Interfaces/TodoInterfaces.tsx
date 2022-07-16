export interface TodoDatas {
    id: number,
    content: string,
    isActive: boolean,
    isComplete: boolean,
    pos: number,
    createdAt: Date,
    updatedAt: Date,
}

export interface User {
    id: number | null,
    name?: string,
    email?: string,
    password?: string,
    isDeleted: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    todos: TodoDatas[],
}

export interface Project {
    id: number,
    name: string,
    todos: TodoDatas[],
    users: User[],
    createdAt: Date,
    updatedAt: Date,
}
