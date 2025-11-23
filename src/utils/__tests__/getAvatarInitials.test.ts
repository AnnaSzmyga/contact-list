import { getAvatarInitials } from "../getAvatarInitials";

describe("getAvatarInitials", () => {
  it("should return initials for a full name", () => {
    expect(getAvatarInitials("John Doe")).toBe("JD");
  });

  it("should return initials for a name with more than two words", () => {
    expect(getAvatarInitials("John Michael Doe")).toBe("JD");
  });

  it("should handle names with extra spaces", () => {
    expect(getAvatarInitials("  John   Doe  ")).toBe("JD");
  });
});
