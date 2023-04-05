import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getGames, deleteGame } from "../../api/game";
import GameModal from "./GameModal";
import TextField from "../../components/TextField";
import DatePicker from "react-datepicker";
import Button from "../../components/Button";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Games = () => {
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    searchValue: "",
  });
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleGame, setSingleGame] = useState(null);
  const [alert, setAlert] = useState({
    message: "",
    severity: "success",
    show: false,
  });
  const [openModal, setOpenModal] = useState(false);

  const columns = ["Name", "Category", "Created"];
  useEffect(() => {
    getGamesFromAPI();
  }, [filter]);
  const getGamesFromAPI = () => {
    setIsLoading(true);
    getGames(filter)
      .then(({ response }) => {
        setGames(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setAlert({
          ...alert,
          show: true,
          message: "Something went wrong",
          severity: "error",
        });
        setIsLoading(false);
      });
  };
  const addGame = () => {
    setSingleGame(null);
    setOpenModal(true);
  };

  const deleteHandler = async ({ _id }) => {
    try {
      const { message } = await deleteGame(_id);
      setAlert({ ...alert, show: true, message, severity: "success" });
      getGamesFromAPI();
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
    setSingleGame(row);
  };

  const onChangeHandler = (event) => {
    const value = event.target.value;
    setFilter({ ...filter, searchValue: value });
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
        <Button onClick={addGame} title="Add Game" />
      </div>
      <div className="filters">
        <div className="filter-item">
          <TextField
            value={filter.searchValue}
            name="search"
            onChange={onChangeHandler}
            placeholder="Search..."
          />
        </div>
        <div className="filter-item date-range">
          <div className="date-range-item">
            <DatePicker
              selected={filter.startDate}
              onSelect={(date) => setFilter({ ...filter, startDate: date })}
              placeholderText="Date To"
            />
          </div>
          <div className="date-range-item">
            <DatePicker
              selected={filter.endDate}
              onSelect={(date) => {
                setFilter({ ...filter, endDate: date });
              }}
              placeholderText="Date From"
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        rows={games}
        onDelete={deleteHandler}
        onUpdate={updateHandler}
        isLoading={isLoading}
      />

      <GameModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        game={singleGame}
        getGamesFromAPI={getGamesFromAPI}
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
export default Games;
