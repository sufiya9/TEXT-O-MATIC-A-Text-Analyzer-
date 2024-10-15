import React from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import myimg2 from "./images/sentiment.png"

const SentimentAnalysis = () => {
  return (
    <div>
    <header className="bg-secondary">
       <div className="container">
         <p className="display-2 text-center fw-bold text-white ">
           Sentiment Analysis
         </p>

         <div class="header-text-box">
           <p class="text-center fw-bold">
             A text summarizer is an online tool that wraps up a text to a
             specified short length. It condenses a long article to main
             points. The need for text summarizers is increasing day by day,
             because of time constraints. People are looking for shortcut
             methods to learn ideas in lesser time. Even text summarizers are
             helping them to decide whether a book, a research paper, or an
             article is worth reading or not.
           </p>
         </div>
         <div>
            <img
              src={myimg2}
              className="img-fluid animate__animated animate__fadeInRight"
              width="540"
              height="356"
              alt="Photo"
            />
          </div>
       </div>
     </header>
     <div style={{ background: "#dff1ee" }}>
       <div className="container ">
         <div className="card">
           <div className="card-body">
             <p className="display-5 text-center fw bold animate__animated animate__fadeInBottomLeft">
               {" "}
               Sentiment Analysis <i class="fas fa-headphones"></i>
             </p>
             <hr />

             <TextField
               label="Paste or write about your topic then click on the generate button"
               multiline
               rows={12}
               size="100"
               variant="filled"
               fullWidth
               sx={{ m: 1 }}
             />
             <label className="btn btn-primary" htmlFor="upload-doc">
               <i class="fas fa-upload"></i>&nbsp; Upload
             </label>
               <input id="upload-doc" hidden accept="document/*" type="file" />

             <Fab
               variant="extended"
               size="medium"
               color="success"
               aria-label="add"
               style={{ float: "right" }}
             >
               Generate
             </Fab>
           </div>
         </div>
       </div>
     </div>
   </div>
  )
}

export default SentimentAnalysis