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
}

const TodoItem: React.FC<Props> = ({element, index, handleActive, handleComplete, theme}) => {
    return (
        <li className={`li-${theme}`}>
            <div className={`circle-check ${element.isActive === true ? "circle-check-active" : ""}`} onClick={() => handleActive(index)}>
                {
                    element.isActive === true &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                }
            </div>
        <p className={`${element.isComplete === true ? "todo-completed" : ""}`} onClick={() => handleComplete(index)}> {element.content} </p>
    </li>
    );
}

export default TodoItem;