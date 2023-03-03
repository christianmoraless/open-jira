import { useContext } from "react";
import { UIContext } from "../../context/ui";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DomainIcon from "@mui/icons-material/Domain";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h6">Menu</Typography>
        </Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 ? <DomainIcon /> : <DynamicFeedIcon />}
              </ListItemIcon>
              <ListItemText primary={text}></ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 ? <DomainIcon /> : <DynamicFeedIcon />}
              </ListItemIcon>
              <ListItemText primary={text}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
