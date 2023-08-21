import * as React from "react";
import { responsiveFontSizes, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import User from "../pages/User";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Staff from "../pages/Staff";
import Dashboard from "../pages/Dashboard";
import Students from './../pages/Students';
import Accountant from './../pages/Accountant';


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function LeftMenuBar() {
  const navigate = useNavigate();
  const [adminSubMenuOpen, setAdminSubMenuOpen] = React.useState(false);
  const [adminSubMenuItems, setAdminSubMenuItems] = React.useState([

    { label: "User", route: "/user" },
    { label: "Classes", route: "/classes" },
    // Add more submenu items as needed
  ]);

  React.useEffect(()=>{
navigate('/');
  }, [])

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [subMenu, setSubMenu] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const adminSubMenuHandleClick = () => {
    setAdminSubMenuOpen(!adminSubMenuOpen);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const subMenuHandleClick = (route) => {
    setSubMenu(!subMenu);
  };

  const profileIconHandler = () => {
    console.log("hello i am here!");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ fontSize: "19  px", position: "fixed", marginLeft: "50px" }}
          >
            Techweaver
          </Typography>
          <AccountCircleIcon
            style={{ fontSize: "40px", width: "190%" }}
            onClick={profileIconHandler}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* <List> */}
          {/* <ListItemButton onClick={() => subMenuHandleClick("/")}>
            <ListItemIcon>
              <ExpandCircleDownIcon /> 
            </ListItemIcon>
            <ListItemText primary="aaa" />
          </ListItemButton> */}

          {/* <Collapse in={subMenu} timeout="auto" unmountOnExit sx={{ transformOrigin: '0 0 0' }}> */}

            <List disablePadding>
              <Link to={"/"}  className="custom-anchor-tag">
                <ListItemButton onClick={adminSubMenuHandleClick}>
                  <ListItemIcon>
                
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                  {adminSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={adminSubMenuOpen} timeout="auto" unmountOnExit sx={{ transformOrigin: '0 0 0' }}>

                  <List component="div" disablePadding>
                    {adminSubMenuItems.map((item) => (
                      <Link to={item.route} key={item.route}  className="custom-anchor-tag">
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <AdminPanelSettingsIcon />
                          </ListItemIcon>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </Link>
            </List>
            <List disablePadding>
              <Link to={"/user"} className="custom-anchor-tag">
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="User" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link to={"/staff"} className="custom-anchor-tag">
                <ListItemButton>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Teacher" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link to={"/students"} className="custom-anchor-tag">
                <ListItemButton>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary="Students" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link to={"/accountant"} className="custom-anchor-tag">
                <ListItemButton>
                  <ListItemIcon>
                    <CurrencyRupeeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Accountant" />
                </ListItemButton>
              </Link>
            </List>
          {/* </Collapse> */}

        {/* </List> */}
      </Drawer>

      <Main open={open}>
        <DrawerHeader />

        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/students" element={<Students />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/staff" element={<Staff />}></Route>
          <Route path="/accountant" element={<Accountant />}></Route>

        </Routes>
      </Main>
    </Box>
  );
}
