import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Editor({ database }) {
  let navigate = useNavigate();
  let databaseCollection = collection(database, "docs-data");
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  let params = useParams();
   
  //console.log(params.id);
  const getEditorData = (value) => {
    setEditorData(value);
    //console.log(value);
  };
  useEffect(() => {
    const updateDocument = setTimeout(() => {
      let docToUpdate = doc(databaseCollection, params.id);
      updateDoc(docToUpdate, {
        body: editorData
      })
        .then(() => {
          toast.success("Data Updated", {
            autoClose: 1000
          });
        })
        .catch(() => {
          toast.error("Cannot update data");
        });

      //console.log(editorData);
    }, 2000);
    return () => clearTimeout(updateDocument);
  }, [editorData]);

  useEffect(() => {
    const document = doc(databaseCollection, params.id);
    onSnapshot(document, (docs) => {
      setTitle(docs.data().title);
      setEditorData(docs.data().body);
    });
  },[]);

  return (
    <div>
      <div>
        <button className="goback-btn" onClick={() => navigate("/home")}>
          {" "}
          Go back{" "}
        </button>
      </div>
      <ToastContainer />
      <h3>{title}</h3>
      <ReactQuill value={editorData} onChange={getEditorData} />
    </div>
  );
}
