import React from "react";
import "./App.css";
import DateRangePicker from "./components/DateRangePicker";

function App() {
  return (
    <div style={{ display: "flex", flexFlow: "column" }}>
      <h1
        style={{
          margin: "10px auto",
          maxWidth: "fit-content",
        }}
      >
        Date Range Picker Demo
      </h1>
      <div>
        <DateRangePicker />
      </div>
    </div>
  );
}

export default App;
