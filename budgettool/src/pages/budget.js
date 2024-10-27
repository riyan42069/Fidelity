import React, { useState } from "react";
import NavigationBar from "../components/budgetBar";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Budget = () => {
  return (
    <>
      <NavigationBar />
      <div className="landing-content">
        <ImageSection />
        <Tagline />
        <ExploreFeature />
      </div>
    </>
  );
};

const ImageSection = () => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center mt-4">
      <Image
        src={`${process.env.PUBLIC_URL}/images/pic.jpg`}
        alt="Aloo"
        height={800}
        width={800}
        fluid
      />
    </div>
  );
};

const Tagline = () => {
  return (
    <div className="container-fluid paragraph-section">
      <h2 className="d-flex justify-content-center mt-4">Budget App</h2>
      <h2 className="d-flex justify-content-center mt-4">
        Start Budgeting Smartly!
      </h2>
      <div className="d-flex justify-content-center"></div>
      <br />
      <PieChartSection />
    </div>
  );
};

const PieChartSection = () => {
  const data = [
    { name: "TRS", students: 12000 },
    { name: "403(b)", students: 7000 },
    { name: "IRAs", students: 4000 },
    { name: "401k", students: 10000 },
  ];

  const COLORS = ["#0f9e48", "#669ebb", "#000000", "#d9d9d9"];
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const total = data.reduce((sum, entry) => sum + entry.students, 0);

  return (
    <div className="d-flex align-items-center justify-content-center">
      {/* Pie Chart */}
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          data={data}
          dataKey="students"
          outerRadius={150}
          fill="green"
          onMouseEnter={onPieEnter}
          style={{ cursor: "pointer", outline: "none" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Legend */}
      <div className="ms-4">
        <h5>Categories</h5>
        {data.map((entry, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: "10px",
              }}
            ></div>
            <span>
              {entry.name}: {entry.students}
            </span>
          </div>
        ))}
        {/* Display Total */}
        <div className="mt-4">
          <strong>Total: {total}</strong>
        </div>
      </div>
    </div>
  );
};

const ExploreFeature = () => {
  return (
    <div className="container-fluid paragraph-section">
      <h1 className="container-fluid d-flex justify-content-center mt-4">
        <a id="features">Explore Features</a>
      </h1>
      <p className="text-center" justify-content-center>
        Currently, the worksite is under construction. We will be back shortly
        with features incorporating all the actions and functions to make your
        shopping smarter.
      </p>
    </div>
  );
};

export default Budget;
