import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

const BudgetBar = () => {
  const { isAuthenticated, logout } = useAuth0(); // Destructure Auth0 properties
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleToggleClick = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-primary text-light p-3 position-sticky top-0"
        style={{ zIndex: 1000 }}
        expanded={!isNavCollapsed}
      >
        <Container fluid>
          <Navbar.Brand className="text-light me-5" href="#home">
            Budget Tool
          </Navbar.Brand>

          <Button
            variant="outline-light"
            className="border-0 d-lg-none"
            onClick={handleToggleClick}
            style={{
              color: "white",
              borderColor: "transparent",
              backgroundColor: "transparent",
            }}
          >
            {isNavCollapsed ? <FaBars size={25} /> : <FaTimes size={25} />}
          </Button>

          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#why"
                className="text-light me-5"
                onClick={handleToggleClick}
              >
                Income Sources
              </Nav.Link>
              <Nav.Link
                href="#features"
                className="text-light me-5"
                onClick={handleToggleClick}
              >
                Budgeting
              </Nav.Link>
              <Nav.Link
                href="#updates"
                className="text-light me-5"
                onClick={handleToggleClick}
              >
                Savings
              </Nav.Link>
            </Nav>

            {/* Conditional buttons */}
            <div className="d-flex">
              <Link to="/signIn">
                <Button variant="outline-light" className="me-2">
                  Login
                </Button>
              </Link>
              {isAuthenticated ? (
                <Button
                  variant="outline-light"
                  className="ms-2"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Sign Out
                </Button>
              ) : (
                <Link to="/register">
                  <Button variant="outline-light" className="ms-2">
                    Register
                  </Button>
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default BudgetBar;
