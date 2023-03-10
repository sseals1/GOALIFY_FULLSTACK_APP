import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getTips, GoalTips } from "../ApiManager";
import { Link, useHistory } from "react-router-dom";
import { Chatbot3 } from "../chatbot3/Chatbot3";
import config from "../chatbot3/ChatbotConfig";

export const NavigationBar = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    GoalTips().then((data) => {
      setSuggestions(data);
    });
  }, []);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Goalify</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/goalform">Create A Goal</Nav.Link>
              <Nav.Link href="/mygoals">My Goals</Nav.Link>
              <Nav.Link href="/review">Year In Review</Nav.Link>
              <NavDropdown
                title="Goalsetting Tips"
                id="collasible-nav-dropdown"
              >
                {suggestions.map((data) => {
                  return (
                    <NavDropdown.Item key={data.id} href={`/tips/${data.id}`}>
                      {data.suggestion}
                    </NavDropdown.Item>
                  );
                })}
                {/* <NavDropdown.Item href="#action/3.1">
                </NavDropdown.Item> */}
                {/* // <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("goal_keeper");
                }}
                href="/login"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div>
            <Chatbot3 config={config} />
          </div>
        </Container>
      </Navbar>
    </>
  );
};
