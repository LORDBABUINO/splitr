import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Expense } from "./expense";

const expenses = [
  {
    date: "2025-02-21T19:06:47.076Z",
    cost: 20,
    description: "redbull",
    payer: "herberson",
    splitedValue: 10,
  },
  {
    date: "2025-02-21T19:06:47.076Z",
    cost: 20,
    description: "redbull",
    payer: "herberson",
    splitedValue: 10,
  },
  {
    date: "2025-02-21T19:06:47.076Z",
    cost: 20,
    description: "redbull",
    payer: "herberson",
    splitedValue: 10,
  },
  {
    date: "2025-02-21T19:06:47.076Z",
    cost: 20,
    description: "redbull",
    payer: "herberson",
    splitedValue: 10,
  },
];

function App() {
  return (
    <div className="App">
      <Container>
        <Container className="header">
          <Button variant="primary">add members</Button>
          <Button variant="danger">add expense</Button>
        </Container>
        {expenses.map((expense, index) => (
          <Expense {...expense} key={index} />
        ))}
      </Container>
    </div>
  );
}

export default App;
