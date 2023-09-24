import {DateInputWrapper, Label} from "./Input.style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  startDate: Date;
  onChange: (date: Date) => void;
  label: string;
  name: string;
}

export const DateInput = ({
  name,
  label,
  startDate,
  onChange,
}: DateInputProps) => {
  const dateNow = new Date();

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>

      <DateInputWrapper>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          minDate={dateNow}
        />
      </DateInputWrapper>
    </div>
  );
};
