// components/QRCodeModal.js
import React, { useState } from "react";
import Modal from "react-modal";

const QRCodeModal = ({ isOpen, onClose, data, ValidateCode }) => {
  const [otp, setOtp] = useState("");

  const handleVerifyAndActivate = () => {
    ValidateCode(otp);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      centered
      size="lg"
      className=" modal border-0"
      modalClassName="modal"
    >
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 max-h-[800px]">
        <div className="flex flex-col h-full text-gray-800">
          {" "}
          {/* Added text-gray-800 for text color */}
          <div className="mb-auto">
            {" "}
            {/* This div takes up remaining space */}
            <h2 className="text-lg font-semibold mb-1">
              Two-Factor Authentication (2FA)
            </h2>
            <p className="mb-1">Configuring Google Authenticator or Authy</p>
            {/* <ol className="list-decimal ml-6 mb-1">
              <li>Install Google Authenticator (iOS- Android) or Authy (iOS- Android).</li>
              <li>In the authenticator app, select "+" icon.</li>
              <li>Select "Scan a barcode (or QR code)" and use the phone's camera to scan this barcode.</li>
            </ol> */}
            <p className="mb-1">Scan QR Code</p>
            <img
              src={`data:image/png;base64, ${data?.base64_image}`}
              alt="QR Code"
              className="mx-auto mb-1"
            />
            <div className="mb-1">
              <p className="mb-1">Or Enter Code Into Your App</p>
              <p className="mb-1">
                <span className="font-semibold">Secret Key:</span>{" "}
                {data?.secret_key}
              </p>
              <p>
                <span className="font-semibold">Recover Key:</span>{" "}
                {data?.recover_key}
              </p>
            </div>
            <div className="mb-1">
              <p className="mb-1">Verify Code</p>
              <p className="mb-1">
                For changing the setting, please verify the authentication code:
              </p>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Authentication code"
                className="border border-gray-300 rounded-md w-full px-3 py-2 mb-2"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-600 px-4 py-2 rounded-md border border-gray-300 mr-2"
            >
              Close
            </button>
            <button
              onClick={handleVerifyAndActivate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Verify & Activate
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QRCodeModal;
