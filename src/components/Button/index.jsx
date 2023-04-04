import { Button, CircularProgress } from "@mui/material";
import "./style.css";
// import CircularProgress from '@mui/material/CircularProgress';

const BasicButton = ({ onClick, title, isLoading }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      className="button"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : title}
    </Button>
  );
};

export default BasicButton;
