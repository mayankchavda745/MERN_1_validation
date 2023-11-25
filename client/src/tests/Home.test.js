import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import axios from 'axios';
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../components/Home.js";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

jest.mock('axios');

const mockRequests1 = [
  {
    _id: "1",
    name: "user one",
    email: "userone@abc.com",
    type: "call",
    status: "new",
    raised_on: "2023-04-12",
    issue_description: "Hearing more cross talks in the calls",
    comment: ""
},
{
    _id: "2",
    name: "user one",
    email: "userone@abc.com",
    type: "data",
    raised_on: "2023-05-20",
    status: "resolved",
    issue_description: "Internet speed is too slow",
    comment: "We are working on adding up few more towers, it will be resolved soon"
},
{
    _id: "3",
    name: "user two",
    email: "usertwo@abc.com",
    type: "call",
    raised_on: "2023-05-19",
    status: "in-progress",
    issue_description: "Having voice lags during the calls",
    comment: ""
  },
  {
    _id: "4",
    name: "user one",
    email: "usernew@abc.com",
    type: "call",
    status: "new",
    raised_on: "2023-4-21",
    issue_description: "Hearing more cross talks in the calls",
    comment: ""
},
{
    _id: "5",
    name: "user three",
    email: "userthree@abc.com",
    type: "others",
    raised_on: "2023-05-23",
    status: "rejected",
    issue_description: "Not getting good signal at most of the places",
    comment: "The issue is not currently taken"
}
];

const checkRequests1 = [
  {
    _id: "1",
    name: "user one",
    email: "userone@abc.com",
    type: "call",
    status: "new",
    raised_on: "12/4/2023",
    issue_description: "Hearing more cross talks in the calls",
    comment: ""
},
{
    _id: "2",
    name: "user one",
    email: "userone@abc.com",
    type: "data",
    raised_on: "20/5/2023",
    status: "resolved",
    issue_description: "Internet speed is too slow",
    comment: "We are working on adding up few more towers, it will be resolved soon"
},
{
    _id: "3",
    name: "user two",
    email: "usertwo@abc.com",
    type: "call",
    raised_on: "19/5/2023",
    status: "in-progress",
    issue_description: "Having voice lags during the calls",
    comment: ""
  },
  {
    _id: "4",
    name: "user one",
    email: "usernew@abc.com",
    type: "call",
    status: "new",
    raised_on: "21/4/2023",
    issue_description: "Hearing more cross talks in the calls",
    comment: ""
},
{
    _id: "5",
    name: "user three",
    email: "userthree@abc.com",
    type: "others",
    raised_on: "23/5/2023",
    status: "rejected",
    issue_description: "Not getting good signal at most of the places",
    comment: "The issue is not currently taken"
}
];

const mockRequests2 = [
{
  _id: "1",
  name: "user one",
  email: "userone@abc.com",
  type: "call",
  status: "new",
  raised_on: "2023-04-12",
  issue_description: "Hearing more cross talks in the calls",
  comment: ""
},
{
  _id: "4",
  name: "user one",
  email: "usernew@abc.com",
  type: "call",
  status: "in-progress",
  raised_on: "2023-4-21",
  issue_description: "Hearing more cross talks in the calls",
  comment: "currently working on that"
}
]

const checkRequests2 = [
  {
    _id: "1",
    name: "user one",
    email: "userone@abc.com",
    type: "call",
    status: "new",
    raised_on: "12/4/2023",
    issue_description: "Hearing more cross talks in the calls",
    comment: ""
  },
  {
    _id: "4",
    name: "user one",
    email: "usernew@abc.com",
    type: "call",
    status: "in-progress",
    raised_on: "21/4/2023",
    issue_description: "Hearing more cross talks in the calls",
    comment: "currently working on that"
  }
  ]

describe("Testing Home Component", () => {

  jest.spyOn(window, "alert").mockImplementation(() => {});

  beforeEach(() => {
    axios.get.mockImplementation(() => Promise.resolve({data: { requests: mockRequests1 }}) );
    axios.patch.mockImplementation(() => Promise.resolve({data: { type: "Created", message: "Request status updates successfully" }}))
  });

  test('displaying events data - mockRequests1', async () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/requests")
    const requestsData = await waitFor(() => screen.findAllByTestId("requests-data"));
    expect(requestsData).toHaveLength(5);
    for(let i=0;i< requestsData.length; i++) {
      expect(requestsData[i].querySelectorAll("td")[1].textContent).toContain(checkRequests1[i].name);
      expect(requestsData[i].querySelectorAll("td")[2].textContent).toContain(checkRequests1[i].email)
      expect(requestsData[i].querySelectorAll("td")[3].textContent).toContain(checkRequests1[i].type);
      expect(requestsData[i].querySelectorAll("td")[4].querySelector("select").value).toContain(checkRequests1[i].status);
      expect(requestsData[i].querySelectorAll("td")[5].textContent).toContain(checkRequests1[i].raised_on);
      expect(requestsData[i].querySelectorAll("td")[6].textContent).toContain(checkRequests1[i].issue_description);
      if(checkRequests1[i].comment === "") expect(requestsData[i].querySelectorAll("td")[7].textContent).toContain("No comments yet");
      else expect(requestsData[i].querySelectorAll("td")[7].textContent).toContain(checkRequests1[i].comment);
    }
  });

  test('displaying events data - mockRequests2', async () => {
    axios.get.mockImplementation(() => Promise.resolve({data: { requests: mockRequests2 }}) );
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/requests")
    const requestsData = await waitFor(() => screen.findAllByTestId("requests-data"));
    expect(requestsData).toHaveLength(2);
    for(let i=0;i< requestsData.length; i++) {
      expect(requestsData[i].querySelectorAll("td")[1].textContent).toContain(checkRequests2[i].name);
      expect(requestsData[i].querySelectorAll("td")[2].textContent).toContain(checkRequests2[i].email)
      expect(requestsData[i].querySelectorAll("td")[3].textContent).toContain(checkRequests2[i].type);
      expect(requestsData[i].querySelectorAll("td")[4].querySelector("select").value).toContain(checkRequests2[i].status);
      expect(requestsData[i].querySelectorAll("td")[5].textContent).toContain(checkRequests2[i].raised_on);
      expect(requestsData[i].querySelectorAll("td")[6].textContent).toContain(checkRequests2[i].issue_description);
      if(checkRequests2[i].comment === "") expect(requestsData[i].querySelectorAll("td")[7].textContent).toContain("No comments yet");
      else expect(requestsData[i].querySelectorAll("td")[7].textContent).toContain(checkRequests2[i].comment);
    }
  });

  test("switch UI - update status - patch request success", async () => {

    global.alert = jest.fn();
    
    await act( async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
    }); 
    const requestsData = await waitFor(() => screen.findAllByTestId("requests-data"));
    let selectInput = requestsData[0].querySelectorAll("td")[4].querySelector("select")
    
    let commentBox = screen.queryByTestId("input-comments")
    expect(commentBox).toBe(null);
    
    await act( async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
      userEvent.selectOptions(selectInput, "in-progress");
    }); 

    commentBox = screen.queryByTestId("input-comments")
    expect(commentBox).not.toBe(null);

    let commentInput = await waitFor(() => screen.getByTestId("input-comments"));
    let changeBtn = await waitFor(() => screen.getByTestId("change-status-btn"));

    await act(async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
      userEvent.type(commentInput, "there is an issue with the messaging")
      userEvent.click(changeBtn);
    })

    const patchRequest = "http://localhost:8000/requests/1";
    const patchBody = {
      comment: "there is an issue with the messaging",
      status: "in-progress"
    }
    expect(axios.patch).toHaveBeenCalledWith(patchRequest, patchBody);
    expect(global.alert).toHaveBeenCalledWith("Request status updates successfully")
  });

  test("switch UI - update status - patch request failure", async () => {
    axios.patch.mockImplementation(() => Promise.reject({response: {data: { type: "Bad Request", message: "Error" }}}))

    global.alert = jest.fn();
    
    await act( async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
    }); 
    const requestsData = await waitFor(() => screen.findAllByTestId("requests-data"));
    let selectInput = requestsData[2].querySelectorAll("td")[4].querySelector("select");

    await act( async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
      userEvent.selectOptions(selectInput, "in-progress");
    }); 

    let commentInput = await waitFor(() => screen.getByTestId("input-comments"));
    let changeBtn = await waitFor(() => screen.getByTestId("change-status-btn"));

    await act(async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
      userEvent.type(commentInput, "there is an issue with the call")
      userEvent.click(changeBtn);
    })

    const patchRequest = "http://localhost:8000/requests/3";
    const patchBody = {
      comment: "there is an issue with the call",
      status: "in-progress"
    }
    expect(axios.patch).toHaveBeenCalledWith(patchRequest, patchBody);
    expect(global.alert).toHaveBeenCalledWith("Error")
  });

  test("switch UI to change status and press back button", async () => {

    global.alert = jest.fn();
    
    await act( async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
    }); 
    expect(screen.queryByTestId("requests-view")).toBeInTheDocument();
    expect(screen.queryByTestId("update-view")).not.toBeInTheDocument();
    const requestsData = await waitFor(() => screen.findAllByTestId("requests-data"));
    let selectInput = requestsData[0].querySelectorAll("td")[4].querySelector("select")
    await act( async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
      userEvent.selectOptions(selectInput, "in-progress");
    }); 
    expect(screen.queryByTestId("update-view")).toBeInTheDocument();
    
    let backBtn = await waitFor(() => screen.getByTestId("back-btn"));
    
    await act(async () => {
      render(
        <Router>
          <Home />
        </Router>
      );
      userEvent.click(backBtn);
    })
    
    expect(screen.queryByTestId("update-view")).not.toBeInTheDocument();
  });
  
});