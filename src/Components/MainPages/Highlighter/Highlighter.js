// SEE FROM LINE NUMBER 104 FOR API REQUEST

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

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import FileInput from "./FileInput";
import pdf from "./SDE-PROBLEMS.pdf";
import pdf2 from "./XDShortcuts.pdf";

function Highlighter() {
  const pdfs = [pdf, pdf2];
  const [files, setFiles] = useState([]);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const isMounted = useRef(true);
  const fileInput = useRef(null);

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    console.log("initial useEffect on render faltu....");
  }, []);

  const getUploadedFiles = () => {
    console.log("inside get uploaded files");

    const filesObj = fileInput.current.files;
    if (Object.keys(filesObj).length === 0) {
      return null;
    }

    const filesData = new FormData();
    let numberOfFiles = filesObj.length;

    for (let file = 0; file < numberOfFiles; file++) {
      filesData.append("files", filesObj[file]);
    }

    filesData.append("ratio", "0.1");
    console.log("endof getUploadedFiles function");
    return filesData;
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("inside usecallback onsubmit vala");
      if (isSendingRequest) {
        console.log("already sending req");
        return;
      }
      let filesData = getUploadedFiles();
      if (filesData === null) {
        alert("no files selected");
        return;
      }
      console.log("filesData in useCallback - ", filesData); // check the format
      setIsSendingRequest(true);
      console.log("sending request set to true....");

      await axios({
        method: "post",
        url: "https://translearn-check.herokuapp.com/highlight",
        data: filesData,
      })
        .then((res) => {
          console.log("then block entered.........got some response");
          // console.log(
          //   `https://translearn-check.herokuapp.com${
          //     JSON.parse(res.request.response).highlighted_doc[0]
          //       .highlighted_doc
          //   }`
          // );
          let highlightedDocs = JSON.parse(res.request.response)
            .highlighted_doc;
          console.log(highlightedDocs);
          // let arr = [...ress];
          // setFiles(highlightedDocs.map(doc => {
          //   {highlighted_doc: doc.highlighted_doc, status: doc.status}
          // }));
          setFiles(highlightedDocs);
          // console.log(files);
          // console.log(arr);
          console.log("then finished..........got response");
        })
        .catch((err) => console.log(err));

      // only update if we are still mounted
      if (isMounted.current) {
        console.log("setting sending request to false");
        setIsSendingRequest(false);
      }
    },
    [isSendingRequest]
  );

  function fileNames() {
    const { current } = fileInput;

    if (current && current.files.length > 0) {
      let messages = [];
      for (let file of current.files) {
        messages = messages.concat(<p key={file.name}>{file.name}</p>);
      }
      return messages;
    }
    return null;
  }
  return (
    <Fragment>
      {/* <input accept="image/*" id="contained-button-file" multiple type="file" />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label> */}
      {/* <FileInput /> */}
      <form>
        <input
          id="file"
          type="file"
          ref={fileInput}
          // The onChange should trigger updates whenever
          // the value changes?
          // Try to select a file, then try selecting another one.
          // onChange={forceUpdate}
          multiple
        />
        <label htmlFor="file">
          <span tabIndex="0" role="button" aria-controls="filename">
            Upload file(s):{" "}
          </span>
        </label>
        {fileNames()}
        {files.map((file) => {
          return (
            <div>
              <a
                href={`https://translearn-check.herokuapp.com${file.highlighted_doc}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.status}
              </a>
            </div>
          );
        })}
        <br />
        <button type="submit" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </Fragment>
  );
}

export default Highlighter;
