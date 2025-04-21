// src/components/WorkspaceDetail.tsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Stack,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  LocationOn,
  DirectionsWalk,
  Wifi,
  LocalCafe,
  Restaurant,
  AcUnit,
  LocalParking,
  MeetingRoom,
  Print,
  Security,
  EventSeat,
} from "@mui/icons-material";

// Assuming you have a proper types file
interface Workspace {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  images: string[];
  amenities: string[] | null;
  day_pass_price: number;
  latitude: number;
  longitude: number;
}

interface WorkspaceDetailProps {
  workspace: Workspace;
  onBookNow: () => void;
}

const WorkspaceDetail: React.FC<WorkspaceDetailProps> = ({
  workspace,
  onBookNow,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Function to render appropriate icon for amenities
  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi />;
      case "coffee":
        return <LocalCafe />;
      case "restaurant":
        return <Restaurant />;
      case "air conditioning":
        return <AcUnit />;
      case "parking":
        return <LocalParking />;
      case "meeting rooms":
        return <MeetingRoom />;
      case "printer":
        return <Print />;
      case "security":
        return <Security />;
      case "near subway":
        return <DirectionsWalk />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: isMobile ? "250px" : "400px",
          width: "100%",
          borderRadius: theme.shape.borderRadius * 2,
          overflow: "hidden",
          mb: 4,
        }}
      >
        <Box
          component="img"
          src={workspace.images[0]}
          alt={workspace.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid sx={{ width: { xs: "100%", md: "66.66%" } }}>
          <Typography
            variant="h4"
            fontWeight="700"
            color="text.primary"
            gutterBottom
          >
            {workspace.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <LocationOn sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="body1" color="text.primary">
              {workspace.address}
            </Typography>
          </Box>

          <Typography variant="body1" color="text.primary" sx={{ mb: 4 }}>
            {workspace.city}
          </Typography>

          <Typography
            variant="h6"
            fontWeight="600"
            color="text.primary"
            gutterBottom
          >
            Amenities
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {workspace.amenities?.map((amenity, index) => (
              <Grid key={index} sx={{ width: "33.33%" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: `${theme.palette.primary.main}10`, // 10% opacity of primary color
                    borderRadius: theme.shape.borderRadius * 2,
                  }}
                >
                  <Box sx={{ color: theme.palette.primary.main, mr: 1 }}>
                    {renderAmenityIcon(amenity)}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontWeight="500"
                  >
                    {amenity}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="h6"
            fontWeight="600"
            color="text.primary"
            gutterBottom
          >
            Location
          </Typography>

          <Paper
            elevation={0}
            sx={{
              height: "300px",
              backgroundColor: theme.palette.secondary.light,
              mb: 4,
              borderRadius: theme.shape.borderRadius * 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="text.secondary">
              Map would be displayed here
            </Typography>
          </Paper>
        </Grid>

        <Grid sx={{ width: { xs: "100%", md: "33.33%" } }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: theme.shape.borderRadius * 2,
              position: "sticky",
              top: 24,
            }}
          >
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Day Pass
                </Typography>
                <Typography variant="h5" color="primary.main" fontWeight="700">
                  ${workspace.day_pass_price}/day
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={onBookNow}
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Bulk Pass
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              No credit card required to reserve
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkspaceDetail;
