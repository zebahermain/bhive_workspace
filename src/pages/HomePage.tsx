// src/components/HomePage.tsx
import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import WorkspaceCard from "../components/WorkspaceCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchCenters } from "../state/centersSlice";
import { RootState, AppDispatch } from "../state/store";

// Import icons
import {
  Wifi,
  LocalCafe,
  Event,
  FitnessCenter,
  AccessTime,
  AttachMoney,
  Weekend,
  SportsSoccer,
} from "@mui/icons-material";

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();
  const {
    list: centers,
    loading,
    error,
  } = useSelector((state: RootState) => state.centers);

  useEffect(() => {
    dispatch(fetchCenters());
  }, [dispatch]);

  // Feature icons with labels
  const features = [
    { icon: <Event color="primary" />, label: "Community Events" },
    { icon: <FitnessCenter color="primary" />, label: "Gym Facilities" },
    { icon: <Wifi color="primary" />, label: "High-Speed WiFi" },
    { icon: <LocalCafe color="primary" />, label: "Cafe & Tea Bar" },
    { icon: <AttachMoney color="primary" />, label: "Affordable" },
    { icon: <Weekend color="primary" />, label: "Comfort Lounges" },
    { icon: <AccessTime color="primary" />, label: "Quick Booking" },
    { icon: <SportsSoccer color="primary" />, label: "Sports Area" },
  ];

  return (
    <>
      <Header />

      {/* Hero Banner Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
          position: "relative",
          overflow: "hidden",
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          {isMobile ? (
            // Mobile view - stacked layout with video on top
            <Box>
              {/* Video first on mobile */}
              <Box sx={{ mb: 4 }}>
                <video
                  src="/static_assets/coworking_animation.mp4"
                  autoPlay
                  muted
                  loop
                  style={{
                    width: "100%",
                    maxWidth: 400,
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </Box>

              {/* Text below video on mobile */}
              <Box sx={{ position: "relative", zIndex: 2 }}>
                <Typography
                  variant="h1"
                  sx={{ mb: 2 }}
                >
                  Host your meeting with world-class amenities.
                </Typography>
                <Typography variant="h1" component="div">
                  Starting at{" "}
                  <Box
                    component="span"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    ₹199/-
                  </Box>
                  !
                </Typography>
              </Box>
            </Box>
          ) : (
            // Web view - side-by-side layout
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Text on left for web */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: "60%",
                  pr: 3,
                }}
              >
                <Typography variant="h1" sx={{ mb: 2 }}>
                  Host your meeting with world-class amenities.
                </Typography>
                <Typography variant="h1" component="div">
                  Starting at{" "}
                  <Box
                    component="span"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    ₹199/-
                  </Box>
                  !
                </Typography>
              </Box>

              {/* Video on right for web */}
              <Box
                sx={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <video
                  src="/static_assets/coworking_animation.mp4"
                  autoPlay
                  muted
                  loop
                  style={{
                    width: "100%",
                    maxWidth: 400,
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: 8,
                  }}
                />
              </Box>
            </Box>
          )}
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            backgroundColor: `${theme.palette.primary.main}1A`, // 10% opacity using hex
            top: "-100px",
            right: "-100px",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            backgroundColor: `${theme.palette.primary.main}1A`, // 10% opacity using hex
            bottom: "-80px",
            left: "-80px",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Why Choose Us Section - Updated to match Figma */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom sx={{ mb: 4,pt: 3, textAlign: "left" }}>
          Why Choose us?
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1 }}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "50%", sm: "25%" },
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 1,
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="body1" fontWeight="500">
                  {feature.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Our Space Overview Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h2" gutterBottom sx={{ mb: 3,pt: 3 }}>
          Our Space Overview
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <Typography>Loading workspaces...</Typography>
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: "center", my: 4 }}>
            {error}
          </Typography>
        ) : centers.length === 0 ? (
          <Typography sx={{ textAlign: "center", my: 4 }}>
            No workspaces available at the moment.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1 }}>
            {centers.slice(0, 6).map((workspace) => (
              <Box
                key={workspace.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "50%",
                    md: "33.33%",
                  },
                  p: 1,
                }}
              >
                <WorkspaceCard workspace={workspace} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <Footer/>
    </>
  );
};

export default HomePage;
