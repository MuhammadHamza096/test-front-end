import { useEffect, useState } from "react";
import { createGame, updateGame } from "../../../api/game";
import Modal from "../../../components/Modal";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import "react-datepicker/dist/react-datepicker.css";
import CloseIcon from "@mui/icons-material/Close";

const GameModal = (props) => {
  const { game, getGamesFromAPI } = props;
  const [isLoading, setIsLoading] = useState(false);
  const gamesCategoriesList = [
    "Action",
    "Adventure",
    "Role-playing",
    "Strategy",
    "Simulation",
    "Sports",
    "Racing",
    "Puzzle",
    "Fighting",
    "Casual",
  ];
  const [formFields, setFormFields] = useState({
    name: "",
    category: "",
  });
  const [error, setError] = useState({
    name: {
      isError: false,
      errorText: "",
    },
    category: {
      isError: false,
      errorText: "",
    },
  });

  const checkValidation = () => {
    const { name, category } = formFields;
    let nameError = {};
    let categoryError = {};

    let isErrors = false;

    if (name === "") {
      nameError = {
        ...nameError,
        isError: true,
        errorText: "Please fill the required field",
      };

      isErrors = true;
    }
    if (category === "") {
      categoryError = {
        ...categoryError,
        isError: true,
        errorText: "Please fill the required field",
      };

      isErrors = true;
    }
    setError({
      ...error,
      name: nameError,
      category: categoryError,
    });
    return isErrors;
  };
  const resetForm = () => {
    if (!game) {
      setFormFields({ ...formFields, name: "", category: "" });

      setError({
        ...error,
        name: { isError: false, errorText: "" },
        category: { isError: false, errorText: "" },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { setAlert, alert } = props;
    setIsLoading(true);
    try {
      if (!checkValidation()) {
        if (!game) {
          const {
            data: { message },
          } = await createGame(formFields);
          // setAlert(true);
          // setAlertMessage(message);
          setAlert({ ...alert, show: true, message, severity: "success" });
          resetForm();
        } else {
          const { _id } = game;
          const {
            data: { message },
          } = await updateGame(_id, formFields);
          setAlert({ ...alert, show: true, message, severity: "success" });
        }

        getGamesFromAPI();
      }
    } catch (err) {
      setAlert({
        ...alert,
        show: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
    setIsLoading(false);
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormFields({ ...formFields, [name]: value });
    const updateError = { isError: false, errorText: "" };
    setError({ ...error, [name]: updateError });
  };

  useEffect(() => {
    if (game) {
      const { name, category } = game;
      setFormFields({ ...formFields, name, category });
    } else {
      setFormFields({ ...formFields, name: "", category: "" });
    }
  }, [game]);
  return (
    <div>
      <Modal {...props}>
        <div className="modal-header">
          <h1>Add Game</h1>
          <CloseIcon
            className="cross-icon"
            onClick={() => {
              props.setOpenModal(false);
              resetForm();
            }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <TextField
              label="Name"
              value={formFields.name}
              onChange={changeHandler}
              error={error.name.isError}
              name="name"
              helperText={error.name.errorText}
              placeholder="Name"
            />
          </div>
          <div className="input-field" style={{ marginBottom: "40px" }}>
            <FormControl sx={{ minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-autowidth"
                name="category"
                value={formFields.category}
                onChange={changeHandler}
                fullWidth
                error={error.category.isError}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {gamesCategoriesList.map((category) => (
                  <MenuItem value={category}>{category}</MenuItem>
                ))}
              </Select>
              {error && (
                <span className="error-text">{error.category.errorText}</span>
              )}
            </FormControl>
          </div>
          <Button type="submit" title="Submit" isLoading={isLoading} />
        </form>
      </Modal>
    </div>
  );
};
export default GameModal;
