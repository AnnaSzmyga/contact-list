import { render, screen, fireEvent } from "@testing-library/react";
import { PersonInfo } from "../PersonInfo";

jest.mock("../../../utils/getAvatarInitials", () => ({
  getAvatarInitials: () => "AB",
}));

describe("PersonInfo component", () => {
  const mockItem = {
    id: "1",
    firstNameLastName: "Adam Brown",
    jobTitle: "Engineer",
    emailAddress: "adam.brown@example.com",
  };
  const mockClick = jest.fn();

  it("renders person info correctly", () => {
    const { container } = render(
      <PersonInfo item={mockItem} isSelected={false} onItemClick={mockClick} />
    );

    expect(screen.getByText(/Adam Brown/)).toBeInTheDocument();
    expect(screen.getByText(/ENGINEER/)).toBeInTheDocument();
    expect(screen.getByText(/adam.brown@example.com/)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("renders correctly when selected", () => {
    const { container } = render(
      <PersonInfo item={mockItem} isSelected={true} onItemClick={mockClick} />
    );

    expect(container.firstChild).toHaveClass("selected-item");

    expect(container).toMatchSnapshot();
  });

  it("renders correctly as small variant", () => {
    const { container } = render(
      <PersonInfo
        item={mockItem}
        isSelected={false}
        isSmall={true}
        onItemClick={mockClick}
      />
    );

    expect(container.firstChild).toHaveClass("small-item");
    expect(container).toMatchSnapshot();
  });

  it("calls onItemClick on click", () => {
    render(
      <PersonInfo item={mockItem} isSelected={false} onItemClick={mockClick} />
    );

    fireEvent.click(screen.getByText(/Adam Brown/));

    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockClick).toHaveBeenCalledWith(mockItem);
  });
});
