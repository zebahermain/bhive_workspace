import {
  Card,
  CardMedia,
  Typography,
  Box,
  Chip,
  SvgIcon,
  IconButton,
  useTheme,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Workspace } from "../types/index";

interface WorkspaceCardProps {
  workspace: Workspace;
}

// Custom arrow component with gradient
const GradientArrows = () => {
  const theme = useTheme();

  return (
    <SvgIcon viewBox="0 0 24 12" sx={{ width: 24, height: 12 }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="12">
        <polygon
          points="6,0 10,6 6,12 8,12 12,6 8,0"
          fill={theme.palette.grey[800]}
        />
        <polygon
          points="12,0 16,6 12,12 14,12 18,6 14,0"
          fill={theme.palette.grey[200]}
        />
        <polygon
          points="18,0 22,6 18,12 20,12 24,6 20,0"
          fill={theme.palette.grey[100]}
        />
      </svg>
    </SvgIcon>
  );
};

// Calculate distance between two coordinates
function getDistanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
  const navigate = useNavigate();
  const theme = useTheme(); // Access theme
  const [distance, setDistance] = useState<number | null>(null);

  // Get user's location and calculate distance
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const dist = getDistanceInKm(
          userLat,
          userLng,
          workspace.latitude,
          workspace.longitude
        );
        setDistance(dist);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, [workspace.latitude, workspace.longitude]);

  const handleViewDetails = () => {
    navigate(`/workspace/${workspace.id}`);
  };

  const handleGetDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${workspace.latitude},${workspace.longitude}`,
      "_blank"
    );
  };

  // Get the image URL or use a placeholder
  const imageUrl =
    workspace.images && workspace.images.length > 0
      ? workspace.images[0]
      : "/static_assets/workspace-placeholder.jpg";

  // Format the address to be shorter
  const shortAddress = workspace.address.split(",")[0];

  // Calculate bulk price based on the discount percentage
  const bulkDiscount = workspace.day_pass_discounts_percentage["10"].value;
  const bulkDays = 10;
  const discountMultiplier = (100 - bulkDiscount) / 100;
  const bulkPassPrice = Math.round(
    workspace.day_pass_price * bulkDays * discountMultiplier
  );

  return (
    <Card
      sx={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
        p: 2,
        border: `1.08px solid ${theme.palette.grey[50]}`,
        bgcolor: theme.palette.background.paper,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography variant="h4" color="text.primary">
          {workspace.name}
        </Typography>

        {/* Distance with direction icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: theme.palette.secondary.light,
            borderRadius: 1,
            pl: 1,
            pr: 1,
            py: 0.5,
          }}
        >
          <IconButton
            onClick={handleGetDirections}
            size="small"
            sx={{ p: 0.5 }}
          >
            <DirectionsIcon
              fontSize="small"
              sx={{ color: theme.palette.text.secondary }}
            />
          </IconButton>
          <Typography
            variant="caption"
            sx={{
              ml: 0.5,
              fontWeight: 500,
              color: theme.palette.text.secondary,
            }}
          >
            {distance !== null ? `${Math.round(distance)} Kms` : "-- Kms"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ position: "relative", mb: 2 }}>
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={workspace.name}
          sx={{ objectFit: "cover", borderRadius: 1 }}
        />

        {/* Location badge on top of the image */}
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 1,
            px: 1,
            py: 0.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Chip
            icon={
              <LocationOn
                style={{ fontSize: 16, color: theme.palette.text.secondary }}
              />
            }
            label={shortAddress}
            size="small"
            sx={{
              bgcolor: theme.palette.background.paper,
              fontSize: "0.7rem",
              height: 24,
              borderRadius: 1,
              "& .MuiChip-label": { px: 1 },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1.5, mt: "auto" }}>
        {/* Day Pass Button */}
        <Box
          sx={{
            flex: 1,
            cursor: "pointer",
            borderRadius: 1,
            bgcolor: theme.palette.secondary.light, // Light gray background
            p: 1.5,
            display: "flex",
            flexDirection: "column",
          }}
          onClick={handleViewDetails}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500, mb: 1 }}
          >
            Day Pass
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                component="span"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                }}
              >
                ₹ {workspace.day_pass_price}
              </Typography>
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                /Day
              </Typography>
            </Box>
            <GradientArrows />
          </Box>
        </Box>

        {/* Bulk Pass Button */}
        <Box
          sx={{
            flex: 1,
            cursor: "pointer",
            borderRadius: 1,
            bgcolor: theme.palette.primary.main, // Yellow background
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
          onClick={handleViewDetails}
        >
          {/* Discount Label */}
          <Box
            sx={{
              position: "absolute",
              top: -10,
              right: 30,
              bgcolor: theme.palette.grey[800], // Dark gray
              color: theme.palette.common.white,
              px: 1.5,
              py: 0.25,
              fontSize: "8px",
              fontWeight: "medium",
              borderRadius: "3px",
            }}
          >
            {bulkDiscount}% Discount
          </Box>

          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontWeight: 500, mb: 1 }}
          >
            Bulk Pass
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                component="span"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                }}
              >
                ₹ {bulkPassPrice}
              </Typography>
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                /{bulkDays} Days
              </Typography>
            </Box>
            <GradientArrows />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default WorkspaceCard;
