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
            EduFinance
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
            <Nav className="w-100 d-flex justify-content-between align-items-center">
              {/* Add Investment with extra margin */}
              <Nav.Link
                href="#addInvestment"
                className="text-light ms-3" // Added left margin
                onClick={handleToggleClick}
              >
                Add Investment
              </Nav.Link>

              {/* Budgeting centered */}
              <Nav.Link
                href="#budgeting"
                className="text-light mx-auto"
                onClick={handleToggleClick}
              >
                Budgeting
              </Nav.Link>

              {/* Conditional buttons aligned to the right */}
              <div className="d-flex">
                {isAuthenticated ? (
                  <Button
                    variant="outline-light"
                    className="ms-2"
                    onClick={() =>
                      logout({ returnTo: window.location.origin })
                    }
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default BudgetBar;
