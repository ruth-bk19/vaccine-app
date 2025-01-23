"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";

// Styled components using MUI v5 `styled` API
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#3f51b5",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#2c387e",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  textTransform: "none",
  fontSize: "1rem",
  margin: theme.spacing(0, 1),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));
const handleAboutUsClick = () => {
  router.push("/about");
  setTimeout(() => {
    const element = document.getElementById("meet-our-team");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, 100); // Small delay to ensure the page has loaded
};

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const NavBar = () => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            setFirstName(data.FirstName || null);
            setIsRegistered(true);
            setHasProfile(!!data.FirstName);
          } else {
            setIsRegistered(false);
            setHasProfile(false);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        setFirstName(null);
        setIsRegistered(false);
        setHasProfile(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setFirstName(null);
        setIsRegistered(false);
        setHasProfile(false);
        router.push("/");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        {/* Logo or Brand Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/assets/images/vaccine.png" // Replace with your logo path
                alt="Vaccine Reminder Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Vaccine Reminder
              </Typography>
            </Box>
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Link href="/about_us#meet-our-team" onClick={handleAboutUsClick}>
            <NavButton>About Us</NavButton>
          </Link>

          {/* Profile Avatar and Dropdown */}
          {isRegistered && hasProfile ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <ProfileAvatar
                  alt={firstName || "User"}
                  src="/default-avatar.png"
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <div className="navButton">
                <Link href="/register" passHref>
                  <NavButton
                    variant="outlined"
                    sx={{ borderColor: "#fff", color: "#fff" }}
                  >
                    Register
                  </NavButton>
                </Link>
                <Link href="/login" passHref>
                  <NavButton
                    variant="outlined"
                    sx={{ borderColor: "#fff", color: "#fff", ml: 1 }}
                  >
                    Sign In
                  </NavButton>
                </Link>
              </div>
            </>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
