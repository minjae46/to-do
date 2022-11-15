import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

const Form = styled.form`
  margin-bottom: 50px;
`;

const InputToDo = styled.input`
  width: 300px;
  height: 35px;
  font-size: 22px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
`;

const AddBtn = styled.button`
  padding: 3px 10px;
  color: blue;
  border: none;
  background-color: inherit;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <InputToDo
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <AddBtn>Add</AddBtn>
    </Form>
  );
}

export default CreateToDo;
