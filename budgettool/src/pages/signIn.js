import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/forgotPassword");
  };

  return (
    <Container
      fluid
      className="vh-auto d-flex align-items-center justify-content-center mb-5 mt-5"
      style={{ width: "100%" }}
    >
      <Row className="w-100">
        <Col className="d-flex align-items-center justify-content-center h-auto">
          <Card
            style={{ width: "100%", maxWidth: "1000px" }}
            className="p-3 shadow-lg h-100"
          >
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4">Sign In</h2>
              <Form className="w-100">
                {/* Email field */}
                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label>
                    <h3>Email</h3>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                {/* Password field */}
                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>
                    <h3>Password</h3>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {/* Checkbox for Show/Hide Password */}
                <Form.Group controlId="formBasicCheckbox" className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label={showPassword ? "Hide Password" : "Show Password"}
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                </Form.Group>

                {/* Forgot Password */}
                <div className="mt-3">
                  <p>
                    Forgot Password? Click{" "}
                    <span
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={handleReset}
                    >
                      <b>here</b>
                    </span>{" "}
                    to Reset
                  </p>
                </div>

                {/* Sign In button */}
                <Button
                  variant="primary"
                  className="w-100 py-3 mb-3 mt-3"
                  type="button"
                  size="lg"
                >
                  Sign in
                </Button>

                {/* Don't have an account text */}
                <div className="text-center mt-3">
                  <p>Don't have an account yet?</p>
                </div>

                {/* Register button wrapped in Link */}
                <Link to="/register" className="w-100">
                  <Button variant="dark" className="w-100 py-3 mt-2" size="lg">
                    Register
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
