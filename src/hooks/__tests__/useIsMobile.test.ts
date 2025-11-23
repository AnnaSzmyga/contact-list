import { renderHook, act } from "@testing-library/react";
import useIsMobile from "../useIsMobile";

describe("useIsMobile", () => {
  it("should return true if window width is less than or equal to 768", () => {
    window.innerWidth = 600;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it("should return false if window width is greater than 768", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("should update isMobile when window is resized", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 600;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);
  });
});
