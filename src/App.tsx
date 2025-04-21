import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import WorkspaceDetailPage from './pages/WorkspaceDetailPage';
import { Provider } from 'react-redux';
import { store } from './state/store';
// Import Inter font
import '@fontsource/inter';

// Create base theme with consistent 8px border radius
let theme = createTheme({
  palette: {
    // Logo Colors
    primary: {
      main: '#FFBB00', // Primary 2 (Yellow) from Figma
      light: '#FFCF4B', // Main-Light Yellow from Figma
      dark: '#27AE60', // Stroke-Dark Yellow from Figma
      contrastText: '#000000',
    },
    secondary: {
      main: '#263238', // Main text color from Figma
      light: '#F9F9F9', // Main-Light Grey from Figma
      dark: '#CECBC6', // Stroke-Dark Grey from Figma
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#263238', // Main text color
      secondary: '#65624C', // Secondary text color
    },
    // Gray palette
    grey: {
      50: '#E0E0E0', // Gray 5
      100: '#B7B6B8', // Gray 4
      200: '#828282', // Gray 3 
      300: '#4F4F4F', // Gray 2
      800: '#333333', // Gray 1
      900: '#000000', // Primary 1 (Black)
    },
  },
  typography: {
    // Set Inter as the primary font family
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '48px', // Slightly reduced from 58px
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '32px', // Slightly reduced from 36px
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '24px',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '20px',
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '18px',
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '16px', 
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '16px',
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '14px',
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8, // Explicitly set to 8px
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          borderRadius: 8,
          boxShadow: 'none',
          padding: '8px 16px',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
        // Primary (yellow) buttons
        containedPrimary: {
          backgroundColor: '#FFCF4B', // Main-Light Yellow
          color: '#000000',
          '&:hover': {
            backgroundColor: '#FFBB00', // Primary 2
          },
        },
        // Secondary (grey) buttons
        containedSecondary: {
          backgroundColor: '#F9F9F9', // Main-Light Grey
          color: '#263238', // Main text color
          '&:hover': {
            backgroundColor: '#CECBC6', // Stroke-Dark Grey
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: 8, // Changed to 8px
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Inter", sans-serif',
          },
          '& .MuiInputBase-input': {
            fontFamily: '"Inter", sans-serif',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          borderRadius: 8, // Ensure chips use 8px border radius
        },
        label: {
          fontFamily: '"Inter", sans-serif',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8, // Ensure all Paper components use 8px
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
        }
      }
    }
  },
});

// Apply responsive font sizes (this automatically adjusts font sizes based on screen size)
theme = responsiveFontSizes(theme, { 
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  factor: 2, // Higher factor makes the scaling more aggressive
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workspace/:id" element={<WorkspaceDetailPage />} />
            {/* Add other routes as needed */}
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;