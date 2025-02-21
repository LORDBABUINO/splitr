import { Container, Card } from "react-bootstrap";
import "./style.css";

export const Expense = ({ date, cost, description, payer, splitedValue }) => (
  <Card>
    <Container className="inline">{date}</Container>
    <Container className="inline">
      <Card.Title>{description}</Card.Title>
      <Card.Subtitle>{`${payer} paid $${cost}`}</Card.Subtitle>
    </Container>
    <Container className="inline">${splitedValue}</Container>
  </Card>
);
