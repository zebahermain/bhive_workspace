import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { Phone } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.grey[50]}`, // Using theme greys
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="/static_assets/bhive_logo.jpg"
              alt="BHive Workspace"
              sx={{ height: isMobile ? 32 : 40 }}
            />
          </Box>

          {/* Phone Button - Use theme colors */}
          <IconButton
            size="small"
            sx={{
              backgroundColor: theme.palette.primary.main, // Using theme primary color
              color: theme.palette.secondary.main, // Using theme text primary color
              width: isMobile ? 36 : 40,
              height: isMobile ? 36 : 40,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: theme.palette.primary.light, // Using theme primary light
              },
            }}
          >
            <Phone fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
