import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme
} from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mb: 8 }}>
      {/* App Download Section */}
      <Typography variant="h2" gutterBottom sx={{ mb: 3, pt: 2, color: '#605F5F' }}>
        Download our app now
      </Typography>

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 1,
          boxShadow: 3,
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {/* Mobile Screens */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="/static_assets/bhive_screen.png"
            alt="BHive App Screen 1"
            sx={{
              height: 300,
              borderRadius: 1,
              boxShadow: 3,
            }}
          />
        </Box>

        {/* Text and Badges */}
        <Box sx={{ textAlign: { xs: "center", md: "left" }, maxWidth: 600 }}>
          <Typography variant="h4" sx={{ color: '#605F5F' }}>
            Boost your productivity with the BHIVE Workspace app. Elevate your
            workspace, collaborate efficiently, and unlock exclusive perks.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
              mt: 2
            }}
          >
            <Box
              component="a"
              href="#"
              sx={{
                display: "inline-block",
                width: "135px",
              }}
            >
              <Box
                component="img"
                src="/static_assets/google-play-badge.svg"
                alt="Get it on Google Play"
                sx={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>

            <Box
              component="a"
              href="#"
              sx={{
                display: "inline-block",
                width: "120px",
              }}
            >
              <Box
                component="img"
                src="/static_assets/app-store-badge.svg"
                alt="Download on the App Store"
                sx={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
