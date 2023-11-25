import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Raise from "../components/Raise.js";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("Testing Home Component", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: {
          type: "Created",
          message: "Request registered successfully with request id 1",
        },
      })
    );
  });

  test("reg - invalid form check - validation error", async () => {
    global.alert = jest.fn();
    axios.post.mockImplementation(() =>
      Promise.reject({
        response: { data: { error: "Request validation failed" } },
      })
    );
    render(
      <Router>
        <Raise />
      </Router>
    );

    const emailField = await waitFor(() => screen.getByTestId("input-email"));
    const nameField = await waitFor(() => screen.getByTestId("input-name"));
    const typeField = await waitFor(() => screen.getByTestId("input-type"));
    const issueField = await waitFor(() =>
      screen.getByTestId("input-issue_description")
    );
    const raiseBtn = await waitFor(() => screen.getByTestId("raise-btn"));

    await act(async () => {
      render(
        <Router>
          <Raise />
        </Router>
      );
      userEvent.type(emailField, "    ");
      userEvent.type(nameField, "user one");
      userEvent.selectOptions(typeField, "call");
      userEvent.type(issueField, "there is some issue with calling");
      userEvent.click(raiseBtn);
    });

    const reqURL = "http://localhost:8000/requests";
    const reqBody = {
      email: "",
      issue_description: "there is some issue with calling",
      name: "user one",
      type: "call",
    };
    expect(axios.post).toHaveBeenCalledWith(reqURL, reqBody);
    expect(global.alert).toHaveBeenCalledWith("Request validation failed");
  });

  test("reg - valid form check - post data failure", async () => {
    global.alert = jest.fn();
    axios.post.mockImplementation(() =>
      Promise.reject({
        response: {
          data: { message: "You cannot raise multiple requests at a time" },
        },
      })
    );
    render(
      <Router>
        <Raise />
      </Router>
    );

    const emailField = await waitFor(() => screen.getByTestId("input-email"));
    const nameField = await waitFor(() => screen.getByTestId("input-name"));
    const typeField = await waitFor(() => screen.getByTestId("input-type"));
    const issueField = await waitFor(() =>
      screen.getByTestId("input-issue_description")
    );
    const raiseBtn = await waitFor(() => screen.getByTestId("raise-btn"));

    await act(async () => {
      render(
        <Router>
          <Raise />
        </Router>
      );
      userEvent.type(emailField, "same@email.com");
      userEvent.type(nameField, "user one");
      userEvent.selectOptions(typeField, "call");
      userEvent.type(issueField, "there is some issue with calling");
      userEvent.click(raiseBtn);
    });

    const reqURL = "http://localhost:8000/requests";
    const reqBody = {
      email: "same@email.com",
      issue_description: "there is some issue with calling",
      name: "user one",
      type: "call",
    };
    expect(axios.post).toHaveBeenCalledWith(reqURL, reqBody);
    expect(global.alert).toHaveBeenCalledWith(
      "You cannot raise multiple requests at a time"
    );
  });

  test("reg - valid form check - post data success", async () => {
    global.alert = jest.fn();

    render(
      <Router>
        <Raise />
      </Router>
    );

    const emailField = await waitFor(() => screen.getByTestId("input-email"));
    const nameField = await waitFor(() => screen.getByTestId("input-name"));
    const typeField = await waitFor(() => screen.getByTestId("input-type"));
    const issueField = await waitFor(() =>
      screen.getByTestId("input-issue_description")
    );
    const raiseBtn = await waitFor(() => screen.getByTestId("raise-btn"));

    await act(async () => {
      render(
        <Router>
          <Raise />
        </Router>
      );
      userEvent.type(emailField, "userone@abc.com");
      userEvent.type(nameField, "user one");
      userEvent.selectOptions(typeField, "call");
      userEvent.type(issueField, "there is some issue with calling");
      expect(emailField.value).toBe("userone@abc.com");
      expect(nameField.value).toBe("user one");
      expect(typeField.value).toBe("call");
      expect(issueField.value).toBe("there is some issue with calling");
      userEvent.click(raiseBtn);
    });
    const reqURL = "http://localhost:8000/requests";
    const reqBody = {
      email: "userone@abc.com",
      issue_description: "there is some issue with calling",
      name: "user one",
      type: "call",
    };
    expect(axios.post).toHaveBeenCalledWith(reqURL, reqBody);

    expect(emailField.value).toBe("");
    expect(nameField.value).toBe("");
    expect(typeField.value).toBe("");
    expect(issueField.value).toBe("");
    expect(global.alert).toHaveBeenCalledWith(
      "Request registered successfully with request id 1"
    );
  });
});
