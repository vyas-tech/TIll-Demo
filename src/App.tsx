import { useState } from "react";
import "./App.css";
import { Alert, Button, Input, Modal } from "antd";
import axios from "axios";

function App() {
  const [items, setItems] = useState<string[]>([]);
  console.log(items);
  const [otp, setOtp] = useState<string>();
  const [otpFromOrder, setOtpFromOrder] = useState<string>();
  const [itemsfromorder, setItemsFromOrder] = useState<string[]>([]);
  const [otpFailed, setOtpFailed] = useState<string>();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const sendReceipt = () => {
    if (otp == otpFromOrder) {
      axios
        .post(`http://localhost:3000/otp/` + otp, {
          items: itemsfromorder,
        })
        .then(() => {
          // setOtp("");
          // setOtpFailed("");
          // setOpen(false);
        });
    } else {
      setOtpFailed("Otp Failed");
    }
  };

  const sendItems = () => {
    axios
      .post("http://localhost:3000/items", {
        items: items, // sending the items array
      })
      .then((response: any) => {
        alert(response.data.message);
        setOtpFromOrder(response.data.otp);
        setItemsFromOrder(response.data.order);
        console.log("Items sent successfully:", response.data);
      })
      .catch((error: any) => {
        console.error("Error sending items:", error);
      });
  };

  return (
    <div className="main">
      <div className="itemcontainer">
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "coffee"]);
          }}
          className="c1"
        >
          <p>Coffee</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "Hot Coffee"]);
          }}
          className="c2"
        >
          <p>Hot Coffee</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "cold Coffee"]);
          }}
          className="c3"
        >
          <p>Cold Coffee</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "Ice"]);
          }}
          className="c4"
        >
          <p>Ice</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "Tea"]);
          }}
          className="c5"
        >
          <p>Tea</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "Greeen Tea"]);
          }}
          className="c6"
        >
          <p>Green Tea</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "coffee"]);
          }}
          className="c1"
        >
          <p>Coffee</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "Hot Coffee"]);
          }}
          className="c2"
        >
          <p>Hot Coffee</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "cold Coffee"]);
          }}
          className="c3"
        >
          <p>Cold Coffee</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "Ice"]);
          }}
          className="c4"
        >
          <p>Ice</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "Tea"]);
          }}
          className="c5"
        >
          <p>Tea</p>
        </button>
        <button
          onClick={() => {
            setItems((prevItems) => [...prevItems, "Greeen Tea"]);
          }}
          className="c6"
        >
          <p>Green Tea</p>
        </button>
      </div>
      <div className="section2">
        <div className="itemsSection">
          {items.map((items) => {
            return <p className="menuItems">{items}</p>;
          })}
        </div>
        <button
          onClick={() => {
            setItems([]);
            sendItems();
            showLoading();
          }}
          className="payment"
        >
          Pay
        </button>
      </div>
      <Modal
        title={<p>OTP</p>}
        footer={
          <Button
            type="primary"
            onClick={() => {
              sendReceipt();
            }}
          >
            Send Receipt
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Input
          type="number"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        ></Input>
        <p>{otpFailed}</p>
      </Modal>
    </div>
  );
}

export default App;
