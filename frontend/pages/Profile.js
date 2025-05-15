
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import {
  Container,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Card,
  CardContent,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Chip,
  Badge,
  AvatarGroup,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { toast } from "react-toastify";
import Leftsidebar from "../components/homepage/Leftsidebar";
import StatusUpload from "../components/StatusUpload";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import AddPostForm from "../pages/AddPost";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [followRequests, setFollowRequests] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:9090";
  const [statuses, setStatuses] = useState([]);
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
  });
  const [showAddPostModal, setShowAddPostModal] = useState(false);

  const fetchFollowCounts = () => {
    axios.get("/follow/counts").then((res) => setFollowCounts(res.data));
  };

  const fetchPosts = () => {
    axios.get("/posts/my").then((res) => setPosts(res.data));
  };

  const fetchFollowRequests = () => {
    axios.get("/follow/requests").then((res) => setFollowRequests(res.data));
  };

  useEffect(() => {
    fetchPosts();
    fetchFollowRequests();
    fetchFollowCounts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      toast.success("Post deleted");
      fetchPosts();
    } catch (err) {
      toast.error("Failed to delete post");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleAcceptFollow = (followId) => {
    axios.post(`/follow/accept/${followId}`).then(() => {
      toast.success("Follow request accepted");
      setFollowRequests((prev) => prev.filter((req) => req.id !== followId));
    });
  };

  useEffect(() => {
    loadStatuses();
  }, []);

  const loadStatuses = () => {
    axios.get("/status").then((res) => setStatuses(res.data));
  };

  const handleDeleteStatus = (id) => {
    axios.delete(`/status/${id}`).then(() => loadStatuses());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      
      <Container maxWidth="lg" sx={{ mt: 5, pb: 8 }}>
        {/* Profile Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 3,
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 2px 16px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box 
              sx={{ 
                position: "absolute", 
                top: -80, 
                left: -20, 
                right: -20, 
                height: 160, 
                background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                opacity: 0.1,
                borderRadius: "100% / 40%",
                zIndex: 0 
              }} 
            />
            <Box 
              display="flex" 
              flexDirection={{ xs: "column", sm: "row" }} 
              alignItems={{ xs: "center", sm: "flex-start" }} 
              mb={4}
              position="relative"
              zIndex={1}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: "#6366F1",
                      color: "#FFFFFF",
                      "&:hover": { bgcolor: "#4F46E5" },
                      boxShadow: "0px 2px 8px rgba(99, 102, 241, 0.3)",
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                }
              >
                <Avatar
                  sx={{
                    width: 96,
                    height: 96,
                    bgcolor: "rgba(99, 102, 241, 0.08)",
                    border: "4px solid white",
                    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 60, color: "#6366F1" }} />
                </Avatar>
              </Badge>
              <Box 
                ml={{ xs: 0, sm: 3 }}
                mt={{ xs: 2, sm: 0 }}
                textAlign={{ xs: "center", sm: "left" }}
              >
                <Typography variant="h5" fontWeight="700" color="#6366F1">
                  Your Profile
                </Typography>
                <Typography variant="body2" sx={{ color: "#6366F1" }}>
                  View and manage your profile information
                </Typography>
              </Box>
              <Box flexGrow={1} />
              <Box 
                display="flex" 
                gap={2}
                mt={{ xs: 3, sm: 0 }}
                flexDirection={{ xs: "column", sm: "row" }}
                width={{ xs: "100%", sm: "auto" }}
              >
                <Button
                  variant="outlined"
                  startIcon={<BookmarkIcon />}
                  onClick={() => navigate("/my-learning-plans")}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 3,
                    py: 1.2,
                    borderColor: "#E5E7EB",
                    color: "#4B5563",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#D1D5DB",
                      backgroundColor: "rgba(249, 250, 251, 0.5)",
                    },
                  }}
                >
                  My Learning
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => navigate("/add-post")}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                    backgroundColor: "#6366F1",
                    color: "#FFFFFF",
                    boxShadow: "0px 4px 14px rgba(99, 102, 241, 0.2)",
                    "&:hover": { 
                      backgroundColor: "#4F46E5",
                      boxShadow: "0px 4px 18px rgba(79, 70, 229, 0.25)",
                    },
                  }}
                >
                  Add Post
                </Button>
              </Box>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <StatusUpload onUpload={loadStatuses} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 3,
                    p: 3,
                    border: "1px solid #F3F4F6",
                    boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <Box 
                    display="flex" 
                    justifyContent="space-around" 
                    mb={2}
                    sx={{
                      background: "linear-gradient(to right, rgba(99, 102, 241, 0.03), rgba(139, 92, 246, 0.03))",
                      borderRadius: 2,
                      py: 2,
                    }}
                  >
                    <Box textAlign="center">
                      <Typography variant="h4" fontWeight="700" color="#6366F1">
                        {followCounts.followers}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6366F1" }}>
                        Followers
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: "rgba(209, 213, 219, 0.5)" }} />
                    <Box textAlign="center">
                      <Typography variant="h4" fontWeight="700" color="#6366F1">
                        {followCounts.following}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6366F1" }}>
                        Following
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={3}>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ color: "#4B5563", mb: 1.5 }}
                    >
                      Recent followers
                    </Typography>
                    <AvatarGroup 
                      max={5}
                      sx={{ 
                        justifyContent: "flex-start",
                        "& .MuiAvatar-root": {
                          width: 40,
                          height: 40,
                          border: "2px solid white",
                          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
                        }
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Avatar
                          key={i}
                          sx={{ 
                            bgcolor: i % 2 === 0 ? "rgba(99, 102, 241, 0.12)" : "rgba(139, 92, 246, 0.12)",
                            color: i % 2 === 0 ? "#6366F1" : "#8B5CF6",
                          }}
                        >
                          {String.fromCharCode(65 + i)}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Follow Requests */}
        {followRequests.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 3,
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 2px 16px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: "rgba(99, 102, 241, 0.08)",
                  mr: 2,
                }}
              >
                <PersonAddIcon sx={{ color: "#6366F1" }} />
              </Box>
              <Typography variant="h6" fontWeight="600" color="#6366F1">
                Follow Requests
              </Typography>
              <Box flexGrow={1} />
              <Chip
                label={followRequests.length}
                size="small"
                sx={{
                  backgroundColor: "rgba(99, 102, 241, 0.08)",
                  color: "#6366F1",
                  fontWeight: 600,
                  borderRadius: 2,
                  border: "none",
                }}
              />
            </Box>
            <List disablePadding>
              {followRequests.map((req) => (
                <ListItem
                  key={req.id}
                  sx={{
                    mb: 2,
                    backgroundColor: "#F9FAFB",
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#F3F4F6" },
                    py: 1.5,
                    px: 2,
                  }}
                  secondaryAction={
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          color: "#6366F1",
                          fontWeight: 500,
                          "&:hover": { backgroundColor: "rgba(243, 244, 246, 0.8)" },
                        }}
                      >
                        Ignore
                      </Button>
                      <Button
                        onClick={() => handleAcceptFollow(req.id)}
                        variant="contained"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          px: 3,
                          fontWeight: 500,
                          backgroundColor: "#6366F1",
                          color: "#FFFFFF",
                          "&:hover": { backgroundColor: "#4F46E5" },
                          boxShadow: "0px 2px 8px rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        Accept
                      </Button>
                    </Box>
                  }
                >
                  <Avatar
                    sx={{ 
                      mr: 2, 
                      bgcolor: "rgba(99, 102, 241, 0.12)",
                      color: "#6366F1",
                      width: 42, 
                      height: 42,
                      border: "2px solid white",
                      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    {req.follower.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Typography fontWeight="600" color="#6366F1">
                        {req.follower.username}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: "#6366F1" }}>
                        {req.follower.email}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* My Posts Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3.5}
          mt={5}
        >
          <Typography variant="h5" fontWeight="700" color="#6366F1">
            My Posts
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} lg={4} key={post.id}>
              <Card
                sx={{
                  bgcolor: "white",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
                  border: "1px solid #F3F4F6",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.06)",
                  },
                }}
              >
                {post.mediaPaths?.length > 0 && (
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/9",
                      maxHeight: 220,
                      overflow: "hidden",
                    }}
                  >
                    <Swiper 
                      slidesPerView={1} 
                      style={{ borderRadius: "0" }}
                    >
                      {post.mediaPaths.map((path, idx) => (
                        <SwiperSlide key={idx}>
                          <Box
                            sx={{
                              width: "100%",
                              height: "220px",
                              overflow: "hidden",
                              maxWidth: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#F9FAFB",
                            }}
                          >
                            {path.toLowerCase().endsWith(".mp4") ? (
                              <video
                                src={`${BASE_URL}${path}`}
                                controls
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  backgroundColor: "#000",
                                }}
                              />
                            ) : (
                              <img
                                src={`${BASE_URL}${path}`}
                                alt={`media-${idx}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </Box>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "100%",
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 30%)",
                        zIndex: 2,
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        display: "flex",
                        gap: 1,
                        zIndex: 10,
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(4px)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                          width: 36,
                          height: 36,
                        }}
                        onClick={() => navigate(`/edit-post/${post.id}`)}
                      >
                        <EditIcon fontSize="small" sx={{ color: "#6366F1" }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(4px)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                          width: 36,
                          height: 36,
                        }}
                        onClick={() => setConfirmDeleteId(post.id)}
                      >
                        <DeleteIcon
                          fontSize="small"
                          sx={{ color: "#EF4444" }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                )}
                <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(99, 102, 241, 0.12)",
                        color: "#6366F1",
                        width: 36,
                        height: 36,
                        border: "2px solid white",
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.03)",
                      }}
                    >
                      {post.user?.username?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                    <Typography variant="subtitle2" color="#6366F1" fontWeight={500}>
                      {post.user?.username || "You"}
                    </Typography>
                    <Box flexGrow={1} />
                    <IconButton size="small" sx={{ color: "#9CA3AF" }}>
                      <MoreHorizIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="700"
                    mb={1.5}
                    color="#6366F1"
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#4B5563"
                    sx={{
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      mt: "auto",
                    }}
                  >
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!confirmDeleteId}
          onClose={() => setConfirmDeleteId(null)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 1,
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 600, pt: 3, pb: 2 }}>
            Are you sure you want to delete this post?
          </DialogTitle>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              onClick={() => setConfirmDeleteId(null)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                py: 1,
                fontWeight: 600,
                color: "#4B5563",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(confirmDeleteId)}
              color="error"
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                py: 1,
                fontWeight: 600,
                bgcolor: "#EF4444",
                "&:hover": { bgcolor: "#DC2626" },
                boxShadow: "0px 2px 8px rgba(239, 68, 68, 0.2)",
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Modal
          open={showAddPostModal}
          onClose={() => setShowAddPostModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={showAddPostModal}>
            <Box
              sx={{
                width: "90%",
                maxWidth: 600,
                margin: "10vh auto",
                outline: "none",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <AddPostForm
                onClose={() => setShowAddPostModal(false)}
                onPostCreated={() =>
                  axios.get("/posts/my").then((res) => setPosts(res.data))
                }
              />
            </Box>
          </Fade>
        </Modal>
      </Container>
      <Leftsidebar />
    </Box>
  );
}