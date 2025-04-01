import React, { useState } from "react";
import "./DonateForm.css";

const DonateForm = () => {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1); // 1 for Amount, 2 for Payment Details

  const handleAmountChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const handlePresetAmount = (value) => {
    // Add the preset amount to the current amount
    const currentAmount = amount ? parseInt(amount) : 0;
    const presetAmount = parseInt(value);
    setAmount((currentAmount + presetAmount).toString());
  };

  const handleNext = () => {
    if (amount) {
      setStep(2);
    }
  };

  return (
    <div className="donateform-container">
      <div className="donateform-progress-steps">
        <div className="donateform-step donateform-active">
          <span className="donateform-step-text">Amount</span>
          <div className="donateform-step-indicator"></div>
        </div>
        <div className="donateform-step-divider">
          <div className="donateform-step-circle">
            <svg
              className="donateform-check-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>
        <div className="donateform-step">
          <span className="donateform-step-text">Payment Details</span>
          <div className="donateform-step-indicator"></div>
        </div>
      </div>
      <div className="donateform-card">
        {/* Amount Input */}
        <div className="donateform-amount-input-container">
          <div className="donateform-amount-label">Enter amount</div>
          <div className="donateform-amount-field">
            <span className="donateform-currency-symbol">₹</span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="donateform-amount-input"
              placeholder="0000"
            />
          </div>

          <div className="donateform-or-divider">or</div>

          {/* Preset Amounts */}
          <div className="donateform-preset-amounts">
            <button
              onClick={() => handlePresetAmount("100")}
              className="donateform-preset-button"
            >
              <span>₹100</span>
              <span>&gt;</span>
            </button>
            <button
              onClick={() => handlePresetAmount("500")}
              className="donateform-preset-button"
            >
              <span>₹500</span>
              <span>&gt;</span>
            </button>
            <button
              onClick={() => handlePresetAmount("1000")}
              className="donateform-preset-button"
            >
              <span>₹1000</span>
              <span>&gt;</span>
            </button>
          </div>
        </div>

        {/* Next Button */}
        <button onClick={handleNext} className="donateform-next-button">
          Enter your details
        </button>
      </div>
    </div>
  );
};

export default DonateForm;
