import React from "react";

export default function Admin() {
  const [code, setCode] = React.useState("");
  const [authorized, setAuthorized] = React.useState(false);
  const [devices, setDevices] = React.useState([]);

  function unlock() {
    if (code === "admin-secret") {
      setAuthorized(true);
      setDevices(["dev-abc123", "dev-xyz789"]);
    } else alert("Wrong code");
  }

  function addDevice() {
    const id = prompt("Device ID to add");
    if (id) setDevices((d) => [...d, id]);
  }

  return (
    <div className="card">
      {!authorized ? (
        <div>
          <h3>Admin Settings</h3>
          <p className="small">
            Enter admin code to manage devices (change in production).
          </p>
          <input
            className="input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Admin code"
          />
          <div style={{ marginTop: 8 }}>
            <button className="btn" onClick={unlock}>
              Unlock
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Devices</h3>
          <div className="small">Authorized devices:</div>
          <ul>{devices.map((d, i) => <li key={i}>{d}</li>)}</ul>
          <div style={{ marginTop: 8 }}>
            <button className="btn" onClick={addDevice}>
              Add Device
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
