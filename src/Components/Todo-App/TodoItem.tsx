import React from 'react'

type TodoDatas = {
    content: string,
    isActive: boolean,
    isComplete: boolean,
}

type Props = {
    element: TodoDatas,
    index: number,
    handleActive: Function,
    handleComplete: Function,
    theme: string,
    removeItem: Function,
}

const TodoItem: React.FC<Props> = ({element, index, handleActive, handleComplete, theme, removeItem}) => {
    return (
        <li className={`li-${theme}`}>
            <div className={`circle-check ${element.isActive === true ? "circle-check-active" : ""}`} onClick={() => handleActive(index)}>
                {
                    element.isActive === true &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                }
            </div>
        <p className={`${element.isComplete === true ? "todo-completed" : ""}`} onClick={() => handleComplete(index)}> {element.content} </p>
        <svg className="delete-item" onClick={() => removeItem(index)} xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </li>
    );
}

export default TodoItem;