import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ database }) {
  let databaseCollection = collection(database, "docs-data");
  let userEmail = localStorage.getItem("userEmail");
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [docsData, setDocsData] = useState([]);
  let auth = getAuth();
  let navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  const addDocument = () => {
    addDoc(databaseCollection, {
      title: title,
      author: userEmail,
      body: ""
    })
      .then((response) => {
        toast.success("Document created ", {
          autoClose: 1000
        });
        setIsAdd(false);
        setTitle("");
      })
      .catch(() => {
        toast.error("Cannot add data", {
          autoClose: 1000
        });
      });
  };
  const openEditor = (id) => {
    navigate(`/editor/${id}`);
  };

  useEffect(() => {
    onSnapshot(databaseCollection, (response) => {
      setDocsData(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="logout-container">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
      <Button
        onClick={() => setIsAdd(!isAdd)}
        variant="outlined"
        startIcon={<Add />}
      >
        Add Document
      </Button>
      {isAdd ? (
        <div className="title-input">
          <input
            placeholder="Add a title"
            className="add-title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <button className="add-btn" onClick={addDocument}>
            Add
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="grid-main">
        {docsData.map((doc) => {
          return (
            <div className="grid-child" onClick={() => openEditor(doc.id)}>
              <h3>{doc.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
