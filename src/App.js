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

const members = [
  {
    displayName: "LORDBABUINO",
    npubkey: "npub14jvgryts4c0xtkux29xy402lmezdrfh62jxl3jpdqwjfe2z7884q62pa0y",
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
  const [npubKey, setNpubKey] = useState("");
  const [expense, setExpense] = useState("");

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
              add members
            </Button>
            <Button variant="danger" onClick={handleShowExpense}>
              add expense
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
