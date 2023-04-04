import { useEffect, useState } from "react";
import { createUser, updateUser } from "../../../api/user";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
const AddUser = (props) => {
  const { user, getUsersFromAPI } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState({
    name: {
      isError: false,
      errorText: "",
    },
    email: {
      isError: false,
      errorText: "",
    },
    address: {
      isError: false,
      errorText: "",
    },
  });

  const resetForm = () => {
    if (!user) {
      setFormFields({ ...formFields, name: "", email: "", address: "" });

      setError({
        ...error,
        name: { isError: false, errorText: "" },
        email: { isError: false, errorText: "" },
        address: { isError: false, errorText: "" },
      });
    }
  };

  const checkValidation = () => {
    const { name, email, address } = formFields;
    let nameError = {};
    let emailError = {};
    let addressError = {};
    let isErrors = false;

    if (email === "") {
      emailError = {
        ...emailError,
        isError: true,
        errorText: "Please fill the required field",
      };
      isErrors = true;
    } else {
      const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isValidEmail = emailRegex.test(email);
      if (isValidEmail) {
        emailError = { ...emailError, isError: false, errorText: "" };
      } else {
        emailError = {
          ...emailError,
          isError: true,
          errorText: "Please enter a valid Email",
        };
        isErrors = true;
      }
    }
    if (name === "") {
      nameError = {
        ...nameError,
        isError: true,
        errorText: "Please fill the required field",
      };

      isErrors = true;
    }
    if (address === "") {
      addressError = {
        ...addressError,
        isError: true,
        errorText: "Please fill the required field",
      };

      isErrors = true;
    }
    setError({
      ...error,
      name: nameError,
      email: emailError,
      address: addressError,
    });
    return isErrors;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { setAlert, alert } = props;
    setIsLoading(true);
    try {
      if (!checkValidation()) {
        if (!user) {
          const {
            data: { message },
          } = await createUser(formFields);
          setAlert({ ...alert, show: true, message, severity: "success" });
          // setAlert(true);
          resetForm();
        } else {
          const { _id } = user;
          const {
            data: { message },
          } = await updateUser(_id, formFields);
          // setAlertMessage(message);
          // setAlert(true);
          setAlert({ ...alert, show: true, message, severity: "success" });
        }

        getUsersFromAPI();
      }
    } catch (err) {
      const {
        response: { status, data },
      } = err;
      if (status === 409) {
        const { message } = data;
        setError({
          ...error,
          email: {
            isError: true,
            errorText: message,
          },
        });
      } else {
        setAlert({
          ...alert,
          show: true,
          message: "Something went wrong",
          severity: "error",
        });
      }
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
    if (user) {
      const { name, email, address } = user;
      setFormFields({ ...formFields, name, email, address });
    } else {
      setFormFields({ ...formFields, name: "", email: "", address: "" });
    }
  }, [user]);
  return (
    <div>
      <Modal {...props}>
        <div className="modal-header">
          <h1>Add User</h1>
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
          <div className="input-field">
            <TextField
              label="Email"
              value={formFields.email}
              onChange={changeHandler}
              name="email"
              error={error.email.isError}
              helperText={error.email.errorText}
              placeholder="Email"
            />
          </div>
          <div className="input-field">
            <TextField
              label="Address"
              value={formFields.address}
              onChange={changeHandler}
              error={error.address.isError}
              name="address"
              helperText={error.address.errorText}
              placeholder="Address"
            />
          </div>
          <Button type="submit" title="Submit" isLoading={isLoading} />
        </form>
      </Modal>
    </div>
  );
};
export default AddUser;
