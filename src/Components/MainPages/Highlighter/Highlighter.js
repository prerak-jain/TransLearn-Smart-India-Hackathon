// import React, { useState, useEffect, Fragment } from "react";
// import axios from "axios";
// import { Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import pdf from "./SDE-PROBLEMS.pdf";
// import pdf2 from "./XDShortcuts.pdf";
// import clouds from "../../../Assets/Images/clouds-sunset.jpg";
// import highimage from "../../../Assets/Images/highlight.jpg";
// import logoimage from "../../../Assets/Images/TL_LOGO.jpg";

// const useStyles = makeStyles((theme) => ({
//   // root: {
//   //   "& > *": {
//   //     margin: theme.spacing(1),
//   //   },
//   // },
//   input: {
//     display: "none",
//   },
// }));

// function Highlighter() {
//   // const uploadFile = ({target: files}) => {
//   //   console.log(files[0]);
//   //   let data = new FormData();
//   //   data.append('files', files[0])

//   //   axios.post("")
//   // }
//   const classes = useStyles();
//   const images = [clouds, highimage, logoimage];
//   const pdfs = [pdf, pdf2];
//   const [files, setFiles] = useState([]);

//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [ratio, setRatio] = useState(10);
//   // showUploadedFilesList - state or component?
//   const [isHighlightBtnActive, setIsHighlightBtnActive] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   // cancel btn? optional
//   const [isResponseReceived, setIsResponseReceived] = useState(false);
//   const [response, setResponse] = useState({});

//   useEffect(() => {
//     console.log("inside useeffect");
//     axios({
//       method: "post",
//       url: "https://run.mocky.io/v3/d4766fb4-3b98-4040-94cc-aa25b37b072f",
//       // url: "https://translearn-check.herokuapp.com/highlight",
//       data: {
//         file: images,
//       },
//     })
//       .then((res) => {
//         console.log("then block entered.........got some response");
//         // console.log(res);
//         console.log(res.status);
//         console.log("then finished..........got response");
//       })
//       .catch((err) => console.log(err));
//   });
//   return (
//     <Fragment>
//       {/* // <Button variant="contained" component="label">
//     //   Upload File
//     //   <input
//     //     type="file"
//     //     multiple
//     //     // onChange={uploadFile}
//     //   />
//     // </Button> */}
//       <input
//         // className={classes.input}
//         accept="image/*"
//         id="contained-button-file"
//         multiple
//         type="file"
//       />
//       <label htmlFor="contained-button-file">
//         <Button variant="contained" color="primary" component="span">
//           Upload
//         </Button>
//       </label>
//     </Fragment>
//   );
// }

// export default Highlighter;

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import pdf from "./SDE-PROBLEMS.pdf";
import pdf2 from "./XDShortcuts.pdf";

function Highlighter() {
  const pdfs = [pdf, pdf2];
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log("inside useeffect");
    let filesData = new FormData();
    filesData.append("files", "./SDE-PROBLEMS.pdf");
    filesData.append("files", "./XDShortcuts.pdf");
    filesData.append("ratio", "0.1");
    // let reqOptions = {
    //   method: "POST",
    //   body: filesData,
    //   redirect: "follow",
    // };
    axios({
      method: "post",
      headers: { "Content-Type": undefined },
      url: "https://translearn-check.herokuapp.com/highlight",
      data: filesData,
    })
      .then((res) => {
        console.log("then block entered.........got some response");
        console.log(res);
        console.log("then finished..........got response");
      })
      .catch((err) => console.log(err));
    // fetch("https://translearn-check.herokuapp.com/highlight", reqOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));
  }, []);
  return (
    <Fragment>
      <input accept="image/*" id="contained-button-file" multiple type="file" />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </Fragment>
  );
}

export default Highlighter;
