import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  Button,
  TextField,
  InputLabel,
  Select,
  FormControl,
} from "@material-ui/core";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//create group
async function createGroup() {
  const token = localStorage.getItem("data");
  await axios
    .post(
      "http://localhost:5000/group/",
      {},
      {
        headers: {
          "auth-token": token,
        },
      }
    )
    .then((res) => {
      toast.configure();
      toast.success(
        `group created successfully , group code is ${res.data.newGroup.group_code}`
      );
      setTimeout(function () {
        window.location.href = `/lobby?group_code=${res.data.newGroup.group_code}`;
      }, 9000);
    })
    .catch((err) => {
      toast.configure();
      toast.success("something went wrong");
    });
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 800,
    margin: "auto",
    textAlign: "center",
 
  },
}));
export default function FullWidthTabs(props) {
  const [pin, setPin] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [groups, setGroups] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //joinning group
  async function joinGroup() {
    const token = localStorage.getItem("data");
    await axios
      .post(
        "http://localhost:5000/group/join/",
        {
          group_code: pin,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
        toast.configure();
        toast.success(res.data.error);
        setTimeout(function () {
          window.location.href = `/lobby?group_code=${pin}`;
        }, 1000);
      })
      .catch((err) => {
        toast.configure();
        toast.error(err.response.data);
      });
  }

  //availaible group
  async function getAvailaibleGroups() {
    await axios
      .get("http://localhost:5000/group/availaible/")
      .then((res) => {
        setGroups(res.data);
        toast.configure();
        toast.success(res);
      })
      .catch((err) => {
        toast.configure();
        toast.error(err);
      });
  }

  useEffect(() => {
    getAvailaibleGroups();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="create group" {...a11yProps(0)} />
            <Tab
              label="Codes List"
              {...a11yProps(1)}
              onClick={getAvailaibleGroups}
            />
            <Tab label="Join group" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            
              <Button
                variant="contained"
                size="large"
                fullWidth
                color="secondary"
                onClick={createGroup}
              >
                Create group
              </Button>
            
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            
              <h4>
                <span style={{ color: "red" }}>Note</span>: Not all codes will
                work (group limit is 4 memebers)
              </h4>

              <FormControl
                variant="filled"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel htmlFor="filled-age-native-simple">
                  Availaiblr group codes
                </InputLabel>
                <Select key={groups} native onChange={handleChange}>
                  <option aria-label="None" />
                  {groups.map((code) => (
                    <option key={code} disabled>
                      {code}
                    </option>
                  ))}
                </Select>
              </FormControl>
          
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
          
              <TextField
                id="group_code"
                fullWidth
                type="text"
                name="group_code"
                label="Group code"
                variant="filled"
                onChange={(e) => setPin(e.target.value)}
              />
              <br />
              <br />
              <Button
                variant="contained"
                size="large"
                fullWidth
                color="secondary"
                onClick={joinGroup}
              >
                Join group
              </Button>
          
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  );
}
