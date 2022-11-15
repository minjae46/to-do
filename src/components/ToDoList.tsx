import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import Selector from "./Selector";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  width: 400px;
  padding: 30px 0;
  font-size: 45px;
  text-align: center;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  // const value = useRecoilValue(toDoState); -> 값만 가져오고 싶을 때
  // const modifierFn = useSetRecoilState(toDoState); -> 스테이트값을 바꾸고 싶을 때
  //const [toDos, setToDos] = useRecoilState(toDoState); -> 둘 다 해야 할 때

  return (
    <Container>
      <Title>TO DOs</Title>
      <Selector />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
