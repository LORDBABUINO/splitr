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

const groupName = "Stardust Crusaders";

function App() {
  return (
    <div className="App">
      <Container className="master-container">
        <Container className="header">
          <Container className="group-name">Group: {groupName}</Container>
          <Container className="button-group">
            <Button variant="primary" style={{ marginRight: "5px" }}>
              add members
            </Button>
            <Button variant="danger">add expense</Button>
          </Container>
        </Container>
        {expenses.map((expense, index) => (
          <Expense {...expense} key={index} />
        ))}
      </Container>
    </div>
  );
}

export default App;
