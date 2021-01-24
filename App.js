import React from "react";
import { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import "./App.css";

function App() {
  const [items, setItems] = useState("");
  const [toList, setToList] = useState([]);
  const [toId, setToId] = useState(0);
  const [showEditBox, setShowEditBox] = useState(false);
  const [editId, setEditId] = useState(1);
  const [editBoxText, setEditBoxText] = useState("");
  const [select, setSelection] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: ""
  });
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const [errormsg, Seterrormsg] = useState("");
  //const [wlcmsg, Setwlcmsg] = useState("");
  //const [open, Setopen] = useState(false);
  const handleChange = (event) => {
    setItems(event.target.value);
  };
  const handleAdd = () => {
    let toListCopy = [...toList];
    toListCopy.push({ id: toId, text: items });
    setToId(toId + 1);
    setToList(toListCopy);
    setItems("");
  };
  const handleEdit = (id) => {
    setShowEditBox(!showEditBox);
    setEditId(id);
  };
  const handleDelete = (id) => {
    let newToList = toList.filter((task) => task !== toList[id]);
    setToList(newToList);
  };
  const handleEditBox = (event) => {
    let text = event.target.value;
    setEditBoxText(text);
  };

  const saveEdit = () => {
    const tempList = [...toList];
    tempList.forEach((task) => {
      if (task.id === editId) {
        task.text = editBoxText;
      }
    });
    setToList(tempList);
    setShowEditBox(false);
    setEditBoxText("");
  };

  const Change = (event) => {
    setSelection(event.target.value);
  };

  const handleSubmit = () => {
    console.log(user);
    if (
      user.name === "" ||
      user.email === "" ||
      user.gender === "" ||
      user.phoneNumber === "" ||
      user.password === ""
    ) {
      Seterrormsg("All fields are mandatory");
    } else if (!user.name.match(/^[a-zA-Z0-9_ ]*$/)) {
      Seterrormsg("Name is not alphanumeric");
    } else if (!user.email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]/)) {
      Seterrormsg("Email must contain @");
    } else if (
      user.gender != "male" &&
      user.gender != "female" &&
      user.gender != "others"
    ) {
      Seterrormsg("Please identify as male, female or others");
    } else if (!user.phoneNumber.match(/^[0-9]*$/)) {
      Seterrormsg("Phone Number must contain only numbers");
    } else if (user.password.length < 6) {
      Seterrormsg("Password must contain atleast 6 letters");
    } else {
      Seterrormsg(`Hello ${user.name}`);
    }
  };

  const classes = useStyles();
  return (
    <>
      <form>
        <div id="main">
          <div id="cl">
            Name :{" "}
            <input
              type="text"
              name="name"
              data-testid="name"
              placeholder="Enter Your Name..."
              onChange={handleChange}
            />
            <br />
            <br />
            Email Address :{" "}
            <input
              type="text"
              name="email"
              data-testid="email"
              placeholder="Enter Your Email..."
              onChange={handleChange}
            />
            <br />
            <br />
          </div>
          Role :
          <select name="Role" id="Role">
          <option value="Frontend">Frontend Developer</option>
          <option value="Backend">Backend Developer</option>
          
        </select>
          <button data-testid="Add" disabled={!items} onClick={handleAdd}>
            Add
          </button>
          <br />
          <br />
          <button data-testid="submit" onClick={handleSubmit}>
            {" "}
            Submit
          </button>
          <p>{errormsg} </p>
          <hr />
          {toList.length === 0 ? (
            "No Task"
          ) : (
            <>
              {toList.map((task, id) => {
                return (
                  <div>
                    <li key={id} className="list">
                      {task.text}
                    </li>
                    <button className="edit" onClick={() => handleEdit(id)}>
                      Edit
                    </button>
                    <button className="delete" onClick={() => handleDelete(id)}>
                      Delete
                    </button>
                  </div>
                );
              })}
            </>
          )}
          {showEditBox ? (
            <div>
              <textarea
                className="editTask"
                value={editBoxText}
                onChange={handleEditBox}
              />
              <button
                className="saveTask"
                disabled={!editBoxText}
                onClick={() => saveEdit()}
              >
                Save
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
}

export default App;
