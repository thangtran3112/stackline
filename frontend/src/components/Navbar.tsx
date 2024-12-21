import { useAppDispatch } from "../stores/hooks";
import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { DARK, LIGHT } from "../commons/constants";
import { setMode } from "../stores/slices/globalSlice";
import logo from "../assets/logo.svg";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* RIGHT SIDE */}
        <FlexBetween>
          {theme.palette.mode === DARK && (
            <img
              onClick={() => navigate("/")}
              src={logo}
              style={{ width: "100px", height: "100px" }}
              alt="Logo"
            />
          )}
          {theme.palette.mode === LIGHT && (
            <h1 onClick={() => navigate("/")}>Stackline</h1>
          )}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === DARK ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
