import React, { useState } from "react";
import NavigationBar from "../components/budgetBar";
import Image from "react-bootstrap/Image";
import { Button, Form, Col, Row, Container } from "react-bootstrap";

const Budget = () => {
  return (
    <>
      <NavigationBar />
      <div className="landing-content">
        <Header />
        <BudgetSections />
      </div>
    </>
  );
};

const Header = () => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light">
      <h2>October 2024</h2>
      <h4 className="text-success">$225.00 left to budget</h4>
    </div>
  );
};

const BudgetSections = () => {
  return (
    <Container fluid>
      <Row>
        {/* Income Section */}
        <Col md={6} className="p-3">
          <div className="bg-white shadow-sm p-4 rounded">
            <h4>Income for October</h4>
            <BudgetItem label="Paycheck 1" planned="500" received="0" />
            <BudgetItem label="Paycheck 2" planned="1000" received="0" />
            <div className="d-flex justify-content-end mt-3">
              <Button variant="link">Add Income</Button>
            </div>
          </div>
        </Col>

        {/* Giving Section */}
        <Col md={6} className="p-3">
          <div className="bg-white shadow-sm p-4 rounded">
            <h4>Giving</h4>
            <BudgetItem label="Church" planned="0" remaining="0" />
            <BudgetItem label="Charity" planned="0" remaining="0" />
            <div className="d-flex justify-content-end mt-3">
              <Button variant="link">Add Item</Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Transactions Section */}
        <Col md={12} className="p-3">
          <div className="bg-white shadow-sm p-4 rounded">
            <h4>Transactions</h4>
            <div className="d-flex justify-content-between mb-3">
              <Button variant="primary">New</Button>
              <Button variant="secondary">Tracked</Button>
              <Button variant="danger">Deleted</Button>
            </div>
            <Form.Control type="text" placeholder="Search" className="mb-3" />
            <Button variant="link">Load August Transactions</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const BudgetItem = ({ label, planned, received, remaining }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div>
        <strong>{label}</strong>
      </div>
      <div className="d-flex">
        <Form.Control
          type="text"
          defaultValue={planned}
          className="me-2"
          style={{ width: "80px" }}
          readOnly
        />
        {received ? (
          <Form.Control
            type="text"
            defaultValue={received}
            style={{ width: "80px" }}
            readOnly
          />
        ) : (
          <Form.Control
            type="text"
            defaultValue={remaining}
            style={{ width: "80px" }}
            readOnly
          />
        )}
      </div>
    </div>
  );
};

export default Budget;
