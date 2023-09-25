import {render, screen} from "@testing-library/react";
import {NumberInput} from "../NumberInput";
import userEvent from "@testing-library/user-event";

test("User are able to see and use  the number input", () => {
  const onChange = jest.fn();
  render(
    <NumberInput
      name="passengers"
      label="label test"
      value={0}
      onChange={onChange}
    />,
  );
  const label = screen.getByText(/abel test/i);
  expect(label).toBeInTheDocument();

  const input = screen.getByRole("spinbutton", {name: /passengers/i});
  expect(input).toHaveValue(0);

  const incrementButton = screen.getByRole("button", {
    name: /\+/i,
  });

  userEvent.click(incrementButton);
  expect(onChange).toHaveBeenCalledWith(1);
});
