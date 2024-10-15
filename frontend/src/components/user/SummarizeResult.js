import React from "react";

const SummarizeResult = ({ orgText, summarizeData }) => {
  return (
    <div>
      <div className="col-md-10 mx-auto">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Text Input</h4>
              </div>
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col-sm-3">
                    <h4>Text : </h4>
                  </div>
                  <div className="col-sm-9">
                    <p className="fw-700">{orgText}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h4>Text Length: </h4>
                  </div>
                  <div className="col-sm-9">
                    <p className="fw-700">{orgText.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Summarized Result</h4>
              </div>
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col-sm-3">
                    <h4>Text : </h4>
                  </div>
                  <div className="col-sm-9">
                    <p className="fw-700">{summarizeData.summary}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <h4>Text Length : </h4>
                  </div>
                  <div className="col-sm-9">
                    <p className="fw-700">{summarizeData.summary_length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizeResult;
