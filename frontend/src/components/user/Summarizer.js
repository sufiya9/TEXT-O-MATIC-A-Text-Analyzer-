import React, { useRef, useState } from "react";
import "animate.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import SummarizeResult from "./SummarizeResult";
import SummarizeResultFile from "./SummarizeResultFile";

const Summarizer = () => {
  const [selFile, setSelFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [summaryResult, setSummaryResult] = useState(null);
  const [summaryResultFile, setSummaryResultFile] = useState(null);

  const uploadFileToSummarize = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelFile(file.name);
    const fd = new FormData();
    fd.append("file", file);
    console.log("uploading File ...");

    fetch("http://localhost:8000/textomatic/api/v1/summarize", {
      method: "POST",
      body: fd,
    }).then(async (res) => {
      console.log(res.status);
      return res.json();
    }).then((data) => {
      console.log(data);
      setSummaryResultFile(data);
      setSummaryResult(null);
    })
  };

  const summarizeText = async () => {
    console.log(inputValue)
    const res = await fetch("http://localhost:8000/textomatic/api/v1/summarize/text", {
      method: "POST",
      body: `text=${inputValue}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });

    console.log(res.status);

    if(res.status === 200){
      const data = await res.json();

      console.log(data);
      setSummaryResult(data);
      setSummaryResultFile(null);
    }

  };

  return (
    <div>
      

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="row gx-lg-5 align-items-center my-5 my-lg-0">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1
              className="mb-5 display-3 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              <span style={{ color: "hsl(218, 81%, 75%)" }}>Summmarizer</span>
            </h1>
            <p className="text-dark lead mb-xl-0">
              A text summarizer is an online tool that wraps up a text to a
              specified short length. It condenses a long article to main
              points. The need for text summarizers is increasing day by day,
              because of time constraints. People are looking for shortcut
              methods to learn ideas in lesser time. Even text summarizers are
              helping them to decide whether a book, a research paper, or an
              article is worth reading or not.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://sassbook.com/images/sb_story_writer_card.svg"
                className=" img-fluid animate__animated animate__fadeInRight"
                allowFullScreen=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////////////////// */}

      {/* <div style={{ background: "#dff1ee" }}>
        <div className="container">
          <br />
          <p className="display-6  text-center "> Get started in minutes</p>
          <p className="display-4 text-center ">
            3 simple & easy step to launch.
          </p>
          <br />
          <br />
          <div className="row">
            <div className="col-sm-4">
              <div
                className="card w-80 animate__animated animate__slideInUp "
                style={{ background: "#dff1ee" }}
              >
                <div className="card-body" style={{ transition: "1sec" }}>
                  <img
                    src="https://www.sammurize.com/images/assets/ils_15.svg"
                    alt=""
                    className="img-fluid  card-img-top "
                  />
                  <p>Join Our Platform</p>
                  <p className=" fw-bold">
                    It only takes a minute. <br /> Set up is smooth and simple
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div
                className="card w-80 animate__animated animate__slideInUp"
                style={{ background: "#dff1ee" }}
              >
                <div className="card-body">
                  <img
                    src ="https://www.sammurize.com/images/assets/ils_16.svg"
                    alt=""
                    className="img-fluid  card-img-top"
                  />
                  <p>Create new research</p>
                  <p className=" fw-bold">
                    Create a new research and start gathering documents as pdf
                    files or public URL article links
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div
                className="card w-80 animate__animated animate__slideInUp"
                style={{ background: "#dff1ee" }}
              >
                <div className="card-body">
                  <img
                    src="https://www.sammurize.com/images/assets/ils_07.svg"
                    alt=" "
                    width="100"
                    className="img-fluid card-img-top"
                  />
                  <p>Start summarizing text</p>
                  <p className=" fw-bold">
                    Get detailed keywords and <br /> summarize main points{" "}
                    <br /> for each document
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div style={{ background: "#dff1ee" }} className="py-5">
        <div className="col-md-10 mx-auto">
          <div className="card my-4">
            <div className="card-body">
              <p className="display-5 text-center fw bold animate__animated animate__fadeInBottomLeft">
                {" "}
                Summarizer
              </p>
              <hr />

              <TextField
                label="Paste or write about your topic then click on the summarize button"
                multiline
                rows={12}
                size="100"
                variant="filled"
                fullWidth
                sx={{ m: 1 }}
                onChange={e => setInputValue(e.target.value)}
              />
              <label
                className="btn btn-primary rounded-pill"
                htmlFor="upload-doc"
              >
                <i class="fas fa-upload"></i>&nbsp; Upload
              </label>
              <input
                id="upload-doc"
                hidden
                accept="document/*"
                type="file"
                onChange={uploadFileToSummarize}
              />

              <Fab
                variant="extended"
                size="medium"
                color="success"
                aria-label="add"
                style={{ float: "right" }}
                onClick={summarizeText}
              >
                Summarize
              </Fab>
            </div>
          </div>
        </div>
          {
            summaryResult && (
              <SummarizeResult summarizeData={summaryResult} orgText={inputValue} />
            )
          }
          {
            summaryResultFile && (
              <SummarizeResultFile summarizeData={summaryResultFile} filename={selFile} />
            )
          }
      </div>

      {/* //////////////////////////////////////////////// */}
    </div>
  );
};

export default Summarizer;
