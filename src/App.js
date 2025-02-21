import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Expense } from "./expense";
import { MembersList } from "./members-list";
import axios from "axios";

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
  const [show, setShow] = useState(false);
  const [npubKey, setNpubKey] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = async () => {
    const nostrData = await fetchNostrData(npubKey.trim());
    members.push({ ...nostrData, npubKey });
    console.log({ members });
    handleClose();
  };

  return (
    <div className="App">
      <Container className="master-container">
        <Container className="header">
          <Container className="group-name">Group: {groupName}</Container>
          <Container className="button-group">
            <Button
              variant="primary"
              style={{ marginRight: "5px" }}
              onClick={handleShow}
            >
              add members
            </Button>
            <Button variant="danger">add expense</Button>
          </Container>
        </Container>
        {expenses.map((expense, index) => (
          <Expense {...expense} key={index} />
        ))}
      </Container>
      <MembersList
        show={show}
        handleClose={handleClose}
        handleSave={handleSave}
        npubKey={npubKey}
        handleInputChange={({ target }) => setNpubKey(target.value)}
      />
    </div>
  );
}

export default App;
