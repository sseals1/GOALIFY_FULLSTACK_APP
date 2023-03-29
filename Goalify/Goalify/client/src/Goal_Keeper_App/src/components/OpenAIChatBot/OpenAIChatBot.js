import React, { useState } from "react";

const OpenAIChatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await fetch("https://localhost:5001/getresult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      const json = await result.text();
      console.log(json); // Log the response to the console
      setResponse(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {/* <div className="col-md-6"> */}
        <div
          className="card"
          style={{ width: "120%", height: "100%", maxWidth: "800px" }}
        >
          <div className="card-header">
            <h4>Goalbot Assistant</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ask your goal questions here"
                  value={message}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group text-right">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </form>
            {response !== null && (
              <div className="alert alert-success" role="alert">
                <ol>
                  <li>{response}</li>
                </ol>
              </div>
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
export default OpenAIChatbot;
