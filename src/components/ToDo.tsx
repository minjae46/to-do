import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const ToDoList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ToDoText = styled.span`
  padding-right: 20px;
  font-size: 20px;
`;

const CateBtn = styled.button`
  padding: 3px 10px;
  margin: 0 2.5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 9999px;
  background-color: inherit;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const DeleteBtn = styled.button`
  margin-left: 12.5px;
  color: red;
  background-color: inherit;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      // any를 쓰는 이 방식보다, 클릭 시 인자로 이름을 직접 보내주는 방식이 더 안전하다. 하지만 이런 방식도 있음을 알아두자.
      return [
        ...oldToDos.slice(0, targetIdx),
        newToDo,
        ...oldToDos.slice(targetIdx + 1),
      ];
    });
  };

  const onDelete = () => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((toDo) => toDo.id !== id);
      return newToDos;
    });
  };

  return (
    <ToDoList>
      <ToDoText>{text}</ToDoText>
      <div>
        {category !== Categories.DOING && (
          <CateBtn name={Categories.DOING} onClick={onClick}>
            DOING
          </CateBtn>
        )}
        {category !== Categories.TO_DO && (
          <CateBtn name={Categories.TO_DO} onClick={onClick}>
            TO DO
          </CateBtn>
        )}
        {category !== Categories.DONE && (
          <CateBtn name={Categories.DONE} onClick={onClick}>
            DONE
          </CateBtn>
        )}
        <DeleteBtn onClick={onDelete}>DELETE</DeleteBtn>
      </div>
    </ToDoList>
  );
}

export default ToDo;
