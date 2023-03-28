// import React, { useState } from "react";
// import axios from "axios";

// const OpenAIChatbot = () => {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");

//   const handleChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const result = await axios.post(
//         "https://localhost:5001/getresult",
//         { prompt: message },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setResponse(result.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={message} onChange={handleChange} />
//         <button type="submit">Send</button>
//       </form>
//       <div >{response}</div>
//     </div>
//   );
// };

// export default OpenAIChatbot;

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
      const json = await result.json();
      console.log(json); // Log the response to the console
      setResponse(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" value={message} onChange={handleChange} />
    //     <button type="submit">Send</button>
    //   </form>
    //   <div>{response}</div>
    // </div>

    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>OpenAI Chatbot</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message here"
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
              {response && (
                <div className="alert alert-success" role="alert">
                  {response}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenAIChatbot;
