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
    createdAt?: Date,
    updatedAt?: Date,
    projects: Project[],
    invites: Project[],
}

export interface Project {
    id: number,
    name: string,
    todos: TodoDatas[],
    users: User[],
    invites: User[],
    createdAt: Date,
    updatedAt: Date,
}
