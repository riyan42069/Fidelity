import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import NavigationBar from "../components/budgetBar";
import { FaTrash } from "react-icons/fa";

const Budget = () => {
  const [incomeItems, setIncomeItems] = useState([
    { id: 1, label: "Paycheck 1", dollars: 500, cents: 0, editable: false },
    { id: 2, label: "Paycheck 2", dollars: 1000, cents: 0, editable: false },
  ]);

  const [givingItems, setGivingItems] = useState([
    { id: 1, label: "Church", dollars: 0, cents: 0, editable: false },
    { id: 2, label: "Charity", dollars: 0, cents: 0, editable: false },
  ]);

  // Calculate total income and total giving
  const calculateTotal = (items) => {
    return items.reduce(
      (total, item) => total + item.dollars + item.cents / 100,
      0
    );
  };

  const totalIncome = calculateTotal(incomeItems);
  const totalGiving = calculateTotal(givingItems);
  const leftToBudget = totalIncome - totalGiving;

  return (
    <>
      <NavigationBar />
      <div className="landing-content">
        <Header leftToBudget={leftToBudget} />
        <BudgetSections
          incomeItems={incomeItems}
          setIncomeItems={setIncomeItems}
          givingItems={givingItems}
          setGivingItems={setGivingItems}
        />
      </div>
    </>
  );
};

const Header = ({ leftToBudget }) => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light">
      <h2>October 2024</h2>
      <h4 className="text-success">
        ${leftToBudget.toFixed(2)} left to budget
      </h4>
    </div>
  );
};

const BudgetSections = ({
  incomeItems,
  setIncomeItems,
  givingItems,
  setGivingItems,
}) => {
  const addIncomeItem = () => {
    const newItem = {
      id: incomeItems.length + 1,
      label: `Paycheck ${incomeItems.length + 1}`,
      dollars: 0,
      cents: 0,
      editable: true,
    };
    setIncomeItems([...incomeItems, newItem]);
  };

  const addGivingItem = () => {
    const newItem = {
      id: givingItems.length + 1,
      label: `Item ${givingItems.length + 1}`,
      dollars: 0,
      cents: 0,
      editable: true,
    };
    setGivingItems([...givingItems, newItem]);
  };

  const deleteItem = (id, isIncome) => {
    if (isIncome) {
      setIncomeItems(incomeItems.filter((item) => item.id !== id));
    } else {
      setGivingItems(givingItems.filter((item) => item.id !== id));
    }
  };

  const toggleEdit = (id, isIncome) => {
    if (isIncome) {
      setIncomeItems(
        incomeItems.map((item) =>
          item.id === id ? { ...item, editable: !item.editable } : item
        )
      );
    } else {
      setGivingItems(
        givingItems.map((item) =>
          item.id === id ? { ...item, editable: !item.editable } : item
        )
      );
    }
  };

  const updateLabel = (id, newLabel, isIncome) => {
    if (isIncome) {
      setIncomeItems(
        incomeItems.map((item) =>
          item.id === id ? { ...item, label: newLabel } : item
        )
      );
    } else {
      setGivingItems(
        givingItems.map((item) =>
          item.id === id ? { ...item, label: newLabel } : item
        )
      );
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={6} className="p-3">
          <div className="bg-white shadow-sm p-4 rounded">
            <h4>Income for October</h4>
            {incomeItems.map((item) => (
              <BudgetItem
                key={item.id}
                label={item.label}
                defaultDollars={item.dollars}
                defaultCents={item.cents}
                editable={item.editable}
                onEditToggle={() => toggleEdit(item.id, true)}
                onLabelChange={(newLabel) =>
                  updateLabel(item.id, newLabel, true)
                }
                onDelete={() => deleteItem(item.id, true)}
              />
            ))}
            <div className="d-flex justify-content-end mt-3">
              <Button variant="link" onClick={addIncomeItem}>
                Add Income
              </Button>
            </div>
          </div>
        </Col>

        <Col md={6} className="p-3">
          <div className="bg-white shadow-sm p-4 rounded">
            <h4>Giving</h4>
            {givingItems.map((item) => (
              <BudgetItem
                key={item.id}
                label={item.label}
                defaultDollars={item.dollars}
                defaultCents={item.cents}
                editable={item.editable}
                onEditToggle={() => toggleEdit(item.id, false)}
                onLabelChange={(newLabel) =>
                  updateLabel(item.id, newLabel, false)
                }
                onDelete={() => deleteItem(item.id, false)}
              />
            ))}
            <div className="d-flex justify-content-end mt-3">
              <Button variant="link" onClick={addGivingItem}>
                Add Item
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const BudgetItem = ({
  label,
  defaultDollars,
  defaultCents,
  editable = false,
  onEditToggle,
  onLabelChange,
  onDelete,
}) => {
  const [dollars, setDollars] = useState(defaultDollars);
  const [cents, setCents] = useState(defaultCents);

  const handleDollarsChange = (e) => {
    setDollars(parseInt(e.target.value) || 0);
  };

  const handleCentsChange = (e) => {
    let newCents = Math.max(0, parseInt(e.target.value) || 0);

    if (newCents >= 100) {
      const extraDollars = Math.floor(newCents / 100);
      setDollars(dollars + extraDollars);
      newCents = newCents % 100;
    }

    setCents(newCents);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="d-flex align-items-center">
        {editable ? (
          <Form.Control
            type="text"
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
            onBlur={onEditToggle}
            style={{ width: "120px", marginRight: "8px" }}
          />
        ) : (
          <strong onClick={onEditToggle} style={{ cursor: "pointer" }}>
            {label}
          </strong>
        )}
      </div>
      <div className="d-flex align-items-center">
        <Form.Control
          type="number"
          value={dollars.toString().padStart(1, "0")}
          onChange={handleDollarsChange}
          className="me-2"
          style={{ width: "100px" }}
        />
        <span className="mx-1">.</span>
        <Form.Control
          type="number"
          value={cents.toString().padStart(2, "0")}
          onChange={handleCentsChange}
          className="ms-1"
          style={{ width: "80px" }}
        />
        <Button variant="link" className="ms-2 text-danger" onClick={onDelete}>
          <FaTrash />
        </Button>
      </div>
    </div>
  );
};

export default Budget;
