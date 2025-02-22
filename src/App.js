import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Expense } from "./expense";
import { MembersList } from "./members-list";
import axios from "axios";
import { AddExpense } from "./add-expense";

const expenses = [
  {
    date: "2025-02-21T19:06:47.076Z",
    cost: 30,
    description: "Red Bull",
    payer: "Breno Brito",
    splitedValue: 10,
  },
  {
    date: "2025-02-22T11:30:00.000Z",
    cost: 52.5,
    description: "Lunch",
    payer: "LORDBABUINO",
    splitedValue: 17.5,
  },
  {
    date: "2025-02-23T09:15:00.000Z",
    cost: 15,
    description: "Coffee",
    payer: "luisschwab",
    splitedValue: 5,
  },
];

const groupName = "Stardust Crusaders";

const members = [
  {
    displayName: "LORDBABUINO",
    npubkey: "npub1dkpmrtcuqlngclt27ftd8yec3vrmmxsehkvq2l6uns64w4q656rqapwlwd",
  },
  {
    displayName: "Breno Brito",
    npubkey: "npub1v22qyndskpawjnsjn8zce53nwldza5ejw67f8y33ntt8qlmpm5rq7ra0z2",
  },
  {
    displayName: "luisschwab",
    npubkey: "npub1d2x9c0e5gwwg6ask88c87y4v425fh4wz3hwhskvcwzpzdn7dzg5sl4eu8n",
  },
];

async function fetchNostrData(npub) {
  const { data: nostrData } = await axios.get(`https://nostrhttp.com/${npub}`);
  return {
    displayName: JSON.parse(nostrData.profileEvent.content).display_name,
  };
}

function App() {
  const [showMembers, setShowMembers] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showSettleUp, setShowSettleUp] = useState(false);
  const [npubKey, setNpubKey] = useState("");

  const handleCloseMembers = () => setShowMembers(false);
  const handleShowMembers = () => setShowMembers(true);
  const handleSaveMembers = async () => {
    const nostrData = await fetchNostrData(npubKey.trim());
    members.push({ ...nostrData, npubKey });
    handleCloseMembers();
  };

  const handleCloseExpense = () => setShowExpenses(false);
  const handleShowExpense = () => setShowExpenses(true);
  const handleSaveExpense = (refDescription, refCost, refPayer) => (e) => {
    e.preventDefault();
    const cost = refCost.current.value.trim();
    expenses.push({
      date: new Date().toISOString(),
      description: refDescription.current.value.trim(),
      cost,
      payer: refPayer.current.value.trim(),
      splitedValue: Number(cost) / members.length,
    });
    handleCloseExpense();
  };

  const handleCloseSettleUp = () => setShowSettleUp(false);
  const handleShowSettleUp = () => setShowSettleUp(true);
  const handleSaveSettleUp = (e) => {};

  return (
    <div className="App">
      <Container className="master-container">
        <Container className="header">
          <Container className="group-info">
            <span className="group-name">{`Group: ${groupName}`}</span>
            <Container className="member-list">
              {members.map((member, index) => (
                <span
                  className="member-name"
                  key={index}
                >{`• ${member.displayName}`}</span>
              ))}
            </Container>
          </Container>
          <Container className="button-group">
            <Button
              variant="primary"
              style={{ marginRight: "5px" }}
              onClick={handleShowMembers}
            >
              Add members
            </Button>
            <Button
              variant="danger"
              style={{ marginRight: "5px" }}
              onClick={handleShowExpense}
            >
              Add expense
            </Button>
            <Button variant="success" onClick={handleShowSettleUp}>
              Settle up
            </Button>
          </Container>
        </Container>
        {expenses.map((expense, index) => (
          <Expense {...expense} key={index} />
        ))}
      </Container>
      <MembersList
        handleClose={handleCloseMembers}
        show={showMembers}
        handleSave={handleSaveMembers}
        npubKey={npubKey}
        handleInputChange={({ target }) => setNpubKey(target.value)}
      />
      <AddExpense
        show={showExpenses}
        handleClose={handleCloseExpense}
        handleSave={handleSaveExpense}
      />
    </div>
  );
}

export default App;
