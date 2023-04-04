import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import GamesIcon from "@mui/icons-material/Games";
import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis } from "victory";
import React, { useState, useEffect } from "react";
import "./style.css";
import { getUsers } from "../../api/user";
import { getGames } from "../../api/game";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [alert, setAlert] = useState({
    message: "",
    severity: "success",
    show: false,
  });
  const [gameCategories, setGameCategories] = useState([]);
  const [pieChartData, setpieChartData] = useState([{ x: "", y: "" }]);
  const [barChartData, setBarChartData] = useState([{ x: "", y: "" }]);

  useEffect(() => {
    getUsersFromAPI();
    getGamesFromAPI();
  }, []);
  useEffect(() => {
    if (games.length > 0 && users.length) {
      const categoryCount = games.reduce((acc, game) => {
        acc[game.category] = (acc[game.category] || 0) + 1;
        return acc;
      }, {});

      const countArray = Object.entries(categoryCount).map(
        ([category, count]) => ({
          category,
          count,
        })
      );
      const categories = games.filter(({ category }) => category);
      setBarChartData(countArray);
      setGameCategories(categories);

      setpieChartData([
        { x: "users", y: users.length },
        { x: "games", y: games.length },
      ]);
    }
  }, [games, users]);

  const getUsersFromAPI = (filter = "") => {
    getUsers(filter)
      .then(({ response }) => {
        setUsers(response);
      })
      .catch(() => {
        setAlert({
          ...alert,
          show: true,
          message: "Something went wrong",
          severity: "error",
        });
      });
  };

  const getGamesFromAPI = (
    filter = { startDate: "", endDate: "", searchValue: "" }
  ) => {
    getGames(filter)
      .then(({ response }) => {
        setGames(response);
      })
      .catch(() => {
        setAlert({
          ...alert,
          show: true,
          message: "Something went wrong",
          severity: "error",
        });
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, show: false, severity: "", message: "" });
  };

  return (
    <div>
      <h1>Overview</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="data-container">
            <div className="data-count-header">
              <h2>Users</h2>
              <PersonIcon className="data-icons" />
            </div>
            <div className="data-count">
              <h1>{users.length}</h1>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="data-container">
            <div className="data-count-header">
              <h2>Games</h2>
              <GamesIcon className="data-icons" />
            </div>
            <div className="data-count">
              <h1>{games.length}</h1>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="data-container">
            <div className="data-count-header">
              <h2>Game Categories</h2>
            </div>
            <div className="chart">
              <div className="pie-chart">
                <VictoryPie
                  data={pieChartData}
                  colorScale={["red", "aqua"]}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="data-container">
            <div className="data-count-header">
              <h2>Game Categories</h2>
            </div>
            <div className="chart">
              <div className="pie-chart">
                <VictoryChart domainPadding={20}>
                  <VictoryAxis
                    tickValues={gameCategories}
                    style={{
                      tickLabels: { fontSize: 10 },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(tick) => `${tick}`}
                    style={{
                      tickLabels: { fontSize: 10 },
                    }}
                  />
                  <VictoryBar
                    data={barChartData}
                    x="category"
                    y="count"
                    style={{ data: { fill: "#c43a31" } }}
                  />
                </VictoryChart>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
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
export default Dashboard;
