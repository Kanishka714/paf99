
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  Divider,
  Chip,
  LinearProgress,
  Paper,
  Tooltip,
  Button,
  IconButton,
  Skeleton,
} from "@mui/material";
import Leftsidebar from "../components/homepage/Leftsidebar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LinkIcon from "@mui/icons-material/Link";
import PersonIcon from "@mui/icons-material/Person";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function LearningPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("/learning-plans/all");
        setPlans(res.data);
      } catch (error) {
        console.error("Failed to fetch learning plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Helper function to get progress percentage
  const getProgressPercentage = (status) => {
    switch (status) {
      case "Not Started":
        return 0;
      case "In Progress":
        return 50;
      case "On Hold":
        return 25;
      case "Completed":
        return 100;
      default:
        return 0;
    }
  };

  // Helper function to get progress color
  const getProgressColor = (status) => {
    switch (status) {
      case "Not Started":
        return "#64748b";
      case "In Progress":
        return "#3b82f6";
      case "On Hold":
        return "#f59e0b";
      case "Completed":
        return "#10b981";
      default:
        return "#64748b";
    }
  };

  // Helper function to get status emoji
  const getStatusEmoji = (status) => {
    switch (status) {
      case "Not Started":
        return "🔮";
      case "In Progress":
        return "🚀";
      case "On Hold":
        return "⏸";
      case "Completed":
        return "✅";
      default:
        return "📚";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        bgcolor: "#f8fafc",
      }}
    >
      <Container maxWidth="lg" sx={{ my: 4, flex: 1 }}>
        {/* Header Section with improved styling */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #6366F1 0%, #8b5cf6 100%)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              opacity: 0.05,
              background: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M0 0 L50 50 L100 0 Z\" fill=\"%23fff\"/></svg>')",
              backgroundSize: "20px 20px",
            }}
          />
          
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            position: "relative", 
            zIndex: 1 
          }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LightbulbIcon sx={{ fontSize: 36, mr: 2, color: "#fff" }} />
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="700"
                  sx={{ color: "#fff" }}
                >
                  Learning Plan Share
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mt: 0.5 }}>
                  Discover what others are learning and get inspired
                </Typography>
              </Box>
            </Box>
            
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "#fff",
                borderRadius: 6,
                px: 2,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
                backdropFilter: "blur(4px)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
                display: { xs: "none", sm: "flex" }
              }}
            >
              {/* Create Plan */}
            </Button>
          </Box>
        </Paper>

        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ borderRadius: 3, height: "100%", overflow: "hidden" }}>
                  <Skeleton variant="rectangular" height={6} />
                  <CardContent>
                    <Skeleton variant="rectangular" height={25} width={80} sx={{ borderRadius: 1, mb: 1 }} />
                    <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
                    <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1.5 }} />
                      <Skeleton variant="text" width={100} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : plans.length === 0 ? (
          <Box
            sx={{
              p: 6,
              textAlign: "center",
              bgcolor: "#fff",
              borderRadius: 3,
              border: "1px dashed #d4d4d8",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box 
              sx={{ 
                width: 100, 
                height: 100, 
                borderRadius: "50%", 
                bgcolor: "#f1f5f9", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                mx: "auto",
                mb: 3
              }}
            >
              <MenuBookIcon
                sx={{ fontSize: 48, color: "#94a3b8" }}
              />
            </Box>
            <Typography variant="h5" fontWeight={600} color="#334155" sx={{ mb: 1 }}>
              No learning plans found
            </Typography>
            <Typography variant="body1" color="#64748b" sx={{ mb: 3, maxWidth: 400, mx: "auto" }}>
              Be the first to share your learning journey with the community!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                bgcolor: "#6366F1",
                px: 3, 
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.2)",
                "&:hover": {
                  bgcolor: "#4f46e5",
                }
              }}
            >
              Create Your First Plan
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid item xs={12} sm={6} md={4} key={plan.id}>
                <Card
                  sx={{
                    bgcolor: "#ffffff",
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    },
                    border: "1px solid rgba(0,0,0,0.05)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      height: 8,
                      width: "100%",
                      bgcolor: getProgressColor(plan.progress),
                    }}
                  />
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      <Chip
                        icon={<Box component="span" sx={{ mr: -0.5 }}>{getStatusEmoji(plan.progress)}</Box>}
                        label={plan.progress}
                        size="small"
                        sx={{
                          bgcolor: `${getProgressColor(plan.progress)}15`,
                          color: getProgressColor(plan.progress),
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          height: 28,
                          border: `1px solid ${getProgressColor(plan.progress)}30`,
                          borderRadius: 4,
                          "& .MuiChip-icon": {
                            fontSize: "1rem",
                          }
                        }}
                      />
                      <IconButton size="small" sx={{ color: "#94a3b8" }}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#1e293b",
                        fontWeight: 700,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: 1.3,
                        height: "2.6em",
                        mb: 2,
                      }}
                    >
                      {plan.title}
                    </Typography>

                    <Box
                      sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        mb: 2,
                        p: 1.5,
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                      }}
                    >
                      <MenuBookIcon
                        sx={{ color: "#6366F1", mr: 1.5, fontSize: 18 }}
                      />
                      <Typography
                        variant="body2"
                        color="#475569"
                        fontWeight={500}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {plan.topics.join(", ")}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <LinkIcon
                        sx={{ color: "#6366F1", mr: 1.5, fontSize: 18, mt: 0.3 }}
                      />
                      <Typography
                        variant="body2"
                        color="#475569"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          lineHeight: 1.3,
                          height: "2.6em",
                        }}
                      >
                        {plan.resources.join(", ")}
                      </Typography>
                    </Box>

                    <Box 
                      sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        mb: 2,
                        p: 1.5,
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                      }}
                    >
                      <CalendarTodayIcon
                        sx={{ color: "#6366F1", mr: 1.5, fontSize: 18 }}
                      />
                      <Typography variant="body2" color="#475569" fontWeight={500}>
                        {new Date(plan.targetDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <IconButton size="small" sx={{ color: "#94a3b8" }}>
                        <BookmarkBorderIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#94a3b8" }}>
                        <ShareIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Divider sx={{ my: 2, background: "rgba(0,0,0,0.06)" }} />

                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                          sx={{
                            bgcolor: "#3b82f6",
                            width: 36,
                            height: 36,
                            border: "2px solid #bfdbfe",
                          }}
                          src={plan.profileImage || ""}
                        >
                          {plan.username?.charAt(0).toUpperCase() || "U"}
                        </Avatar>
                        <Typography
                          variant="body2"
                          color="#334155"
                          fontWeight={600}
                        >
                          {plan.username || "Anonymous"}
                        </Typography>
                      </Box>
                      
                      <Tooltip title={`${getProgressPercentage(plan.progress)}% Complete`} arrow>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 60 }}>
                          <Typography variant="caption" fontWeight={600} color={getProgressColor(plan.progress)}>
                            {getProgressPercentage(plan.progress)}%
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                  </CardContent>

                  <LinearProgress
                    variant="determinate"
                    value={getProgressPercentage(plan.progress)}
                    sx={{
                      height: 6,
                      "& .MuiLinearProgress-bar": {
                        bgcolor: getProgressColor(plan.progress),
                      },
                      bgcolor: `${getProgressColor(plan.progress)}20`,
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Leftsidebar />
    </Box>
  );
}