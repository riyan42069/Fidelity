import React, { useState } from "react";
import NavigationBar from "../components/budgetBar";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Budget = () => {
  return (
    <>
      <NavigationBar /> {/* Navigation Bar */}
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
      {/* Buttons placed after the image */}
      <div className="d-flex justify-content-center mt-4">
        <GetStarted />
      </div>
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

  return (
    <PieChart width={700} height={700}>
      <Pie
        activeIndex={activeIndex}
        data={data}
        dataKey="students"
        outerRadius={250}
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

const GetStarted = () => {
  // Button for Get Started
  return (
    <Link to="/home">
      <Button
        style={{ color: "white" }}
        className="mx-2 btn btn-primary custom-btn mt-4"
        variant="outline-dark"
      >
        Goals
      </Button>
    </Link>
  );
};

export default Budget;
