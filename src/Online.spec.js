import React from "react";
import { render, act } from "@testing-library/react";
import Online from "./Online";

describe("Online", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      value: true
    });
  });

  it("should render children when online", () => {
    const { getByText } = render(
      <Online>
        <h1>Hello World</h1>
      </Online>
    );

    expect(getByText(/Hello World/)).toBeDefined();
  });

  it("should render children when online and using a custom polling URL", () => {
    const { getByText } = render(
      <Online pollingUrl="https://www.google.com/">
        <h1>Hello World</h1>
      </Online>
    );

    expect(getByText(/Hello World/)).toBeDefined();
  });

  it("should not render children when offline", () => {
    Object.defineProperty(navigator, "onLine", { value: false });

    const { queryByText } = render(
      <Online>
        <h1>Hello World</h1>
      </Online>
    );

    expect(queryByText(/Hello World/)).toBeNull();
  });

  it("should not render children when offline and using a custom polling URL", () => {
    Object.defineProperty(navigator, "onLine", { value: false });

    const { queryByText } = render(
      <Online pollingUrl="https://www.google.com/">
        <h1>Hello World</h1>
      </Online>
    );

    expect(queryByText(/Hello World/)).toBeNull();
  });

  it("should not render children when going from online to offline", () => {
    window.addEventListener = jest.fn();
    const { queryByText } = render(
      <Online>
        <h1>Hello World</h1>
      </Online>
    );

    // get the listener with name "offline" (param 0) and call the function (param 1)
    const offlineListener = window.addEventListener.mock.calls.find(
      call => call[0] === "offline"
    )[1];

    act(() => {
      offlineListener();
    });
    expect(queryByText(/Hello World/)).toBeNull();
    window.addEventListener.mockReset();
  });

  it("should remove event listeners when unmounting", () => {
    window.removeEventListener = jest.fn();
    const { unmount } = render(
      <Online>
        <h1>Hello World</h1>
      </Online>
    );
    unmount();

    const listenerNames = window.removeEventListener.mock.calls.map(
      call => call[0]
    );
    expect(listenerNames).toContain("online");
    expect(listenerNames).toContain("online");

    window.removeEventListener.mockReset();
  });
});
