import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Navigate, Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center mb-5 mt-5"
      style={{ width: "100%" }}
    >
      <Row className="w-100">
        <Col className="d-md-flex align-items-center justify-content-center h-auto">
          <Card
            style={{ width: "100%", maxWidth: "1000px" }}
            className="p-3 shadow-lg h-100"
          >
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-center mb-4">Create your Account</h2>
              <Form>
                {/* Full Name field */}
                <Form.Group controlId="formFullName" className="mb-4">
                  <Form.Label>
                    <h3>Full Name</h3>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="text"
                    placeholder="Enter your Full Name"
                  />
                </Form.Group>

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

                {/* Re-enter Password field */}
                <Form.Group controlId="formReEnterPassword" className="mb-4">
                  <Form.Label>
                    <h3>Re-enter Password</h3>
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

                {/* Create Account button */}
                <Button
                  variant="primary"
                  className="w-100 py-3 mb-3"
                  type="button"
                  size="lg"
                >
                  Create Account
                </Button>

                {/* Already a member text */}
                <div className="text-center mt-1">
                  <p>Already a member?</p>
                  <Link to="/signIn" className="w-100">
                    <Button
                      variant="dark"
                      className="w-100 py-3 mb-3"
                      size="lg"
                    >
                      Log In
                    </Button>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
