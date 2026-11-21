import { ChangeEventHandler } from "react";
import { InputGroup, InputGroupButton, InputGroupInput } from "./input-group";

type Props = {
  title: string;
  item: string | number | readonly string[] | undefined;
  onSubmit: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function AddItem({ title, item, onSubmit, onChange }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputGroup>
        <InputGroupInput value={item} onChange={onChange}></InputGroupInput>
        <InputGroupButton
          className="bg-primary text-accent ml-auto cursor:pointer"
          size="sm"
          type="submit"
        >
          {title}
        </InputGroupButton>
      </InputGroup>
    </form>
  );
}
