import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getUsers, deleteUser } from "../../api/user";
import UserModal from "./CustomerModal";
import Button from "../../components/Button";
import TextField from "../../components/TextField";

import "./style.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const columns = ["Name", "Email", "Address"];
  const [alert, setAlert] = useState({
    message: "",
    severity: "success",
    show: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getUsersFromAPI(searchValue);
  }, [searchValue]);

  const getUsersFromAPI = (filter = "") => {
    setIsLoading(true);
    getUsers(filter)
      .then(({ response }) => {
        setUsers(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setAlert({
          ...alert,
          show: true,
          message: "Something went wrong",
          severity: "error",
        });
      });
  };
  const addUser = () => {
    setSingleUser(null);
    setOpenModal(true);
  };

  const deleteHandler = async ({ _id }) => {
    try {
      const { message } = await deleteUser(_id);
      setAlert({ ...alert, show: true, message, severity: "success" });
      getUsersFromAPI();
    } catch (err) {
      setAlert({
        ...alert,
        show: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };
  const updateHandler = async (row) => {
    setOpenModal(true);
    setSingleUser(row);
  };

  const onChangeHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, show: false, severity: "", message: "" });
  };

  return (
    <div>
      <div className="header">
        <Button onClick={addUser} title="Add User" />
      </div>
      <div>
        <div className="search-field">
          <TextField
            value={searchValue}
            name="search"
            onChange={onChangeHandler}
            placeholder="Search..."
          />
        </div>
        <div class="table-data">
          <Table
            columns={columns}
            rows={users}
            onDelete={deleteHandler}
            onUpdate={updateHandler}
            isLoading={isLoading}
          />
        </div>
      </div>
      <UserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        user={singleUser}
        getUsersFromAPI={getUsersFromAPI}
        setAlert={setAlert}
        alert={alert}
      />
      <Snackbar
        open={alert.show}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Users;
