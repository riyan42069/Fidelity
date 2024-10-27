import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import NavigationBar from "../components/budgetBar";
import { FaTrash } from "react-icons/fa";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6666",
  "#8884D8",
];

const Budget = () => {
  const [incomeItems, setIncomeItems] = useState([
    { id: 1, label: "Paycheck 1", dollars: 500, cents: 0, editable: false },
    { id: 2, label: "Paycheck 2", dollars: 1000, cents: 0, editable: false },
  ]);

  const [givingItems, setGivingItems] = useState([
    { id: 1, label: "Church", dollars: 11, cents: 0, editable: false },
    { id: 2, label: "Charity", dollars: 19, cents: 0, editable: false },
  ]);

  const [incomeChartData, setIncomeChartData] = useState([]);
  const [givingChartData, setGivingChartData] = useState([]);

  const calculateTotal = (items) => {
    return items.reduce(
      (total, item) => total + item.dollars + item.cents / 100,
      0
    );
  };

  const totalIncome = calculateTotal(incomeItems);
  const totalGiving = calculateTotal(givingItems);
  const leftToBudget = totalIncome - totalGiving;

  const generateChartData = (items) => {
    return items.map((item) => ({
      name: item.label,
      value: item.dollars + item.cents / 100,
    }));
  };

  const handleGenerateIncomeChart = () => {
    setIncomeChartData(generateChartData(incomeItems));
  };

  const handleGenerateGivingChart = () => {
    setGivingChartData(generateChartData(givingItems));
  };

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
          onGenerateIncomeChart={handleGenerateIncomeChart}
          onGenerateGivingChart={handleGenerateGivingChart}
        />
        <Row>
          <Col md={6} className="p-3">
            {incomeChartData.length > 0 && (
              <div className="bg-white shadow-sm p-4 rounded">
                <h4>Income Distribution</h4>
                <PieChart width={300} height={300}>
                  <Pie
                    data={incomeChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {incomeChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            )}
          </Col>
          <Col md={6} className="p-3">
            {givingChartData.length > 0 && (
              <div className="bg-white shadow-sm p-4 rounded">
                <h4>Giving Distribution</h4>
                <PieChart width={300} height={300}>
                  <Pie
                    data={givingChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {givingChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            )}
          </Col>
        </Row>
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
  onGenerateIncomeChart,
  onGenerateGivingChart,
}) => {
  const addIncomeItem = () => {
    if (incomeItems.length < 6) {
      const newItem = {
        id: incomeItems.length + 1,
        label: `Paycheck ${incomeItems.length + 1}`,
        dollars: 0,
        cents: 0,
        editable: true,
      };
      setIncomeItems([...incomeItems, newItem]);
    }
  };

  const addGivingItem = () => {
    if (givingItems.length < 6) {
      const newItem = {
        id: givingItems.length + 1,
        label: `Item ${givingItems.length + 1}`,
        dollars: 0,
        cents: 0,
        editable: true,
      };
      setGivingItems([...givingItems, newItem]);
    }
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
              <Button
                variant="link"
                onClick={addIncomeItem}
                disabled={incomeItems.length >= 6}
              >
                Add Income
              </Button>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" onClick={onGenerateIncomeChart}>
                Generate Pie Chart
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
              <Button
                variant="link"
                onClick={addGivingItem}
                disabled={givingItems.length >= 6}
              >
                Add Item
              </Button>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" onClick={onGenerateGivingChart}>
                Generate Pie Chart
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
