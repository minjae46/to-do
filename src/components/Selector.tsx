import { useRecoilState } from "recoil";
import { Categories, categoryState } from "../atoms";
import styled from "styled-components";

const Select = styled.select`
  width: 65px;
  height: 25px;
  margin: 20px 0;
`;

function Selector() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Select value={category} onInput={onInput}>
      <option value={Categories.TO_DO}>To Do</option>
      <option value={Categories.DOING}>Doing</option>
      <option value={Categories.DONE}>Done</option>
    </Select>
  );
}

export default Selector;
