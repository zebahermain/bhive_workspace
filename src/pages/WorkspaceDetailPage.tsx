// src/pages/WorkspaceDetailPage.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WorkspaceDetail from "../components/WorkspaceDetail";

const WorkspaceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedWorkspace, loading, error } = useSelector(
    (state: RootState) => state.centers
  );

  useEffect(() => {}, [dispatch, id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBookNow = () => {};

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackClick}
          sx={{ mb: 3, textTransform: "none" }}
        >
          Back to workspaces
        </Button>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: "center", my: 4 }}>
            {error}
          </Typography>
        ) : !selectedWorkspace ? (
          <Typography sx={{ textAlign: "center", my: 4 }}>
            Workspace not found.
          </Typography>
        ) : (
          <WorkspaceDetail
            workspace={selectedWorkspace}
            onBookNow={handleBookNow}
          />
        )}
      </Container>
    </>
  );
};

export default WorkspaceDetailPage;
