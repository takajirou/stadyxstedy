import { SwipeableDrawer, List, ListItem, ListItemText, Divider, Button } from "@mui/material";
import React, { useState } from "react";

const CheckSchedule = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        // KeyboardEventの場合のみkeyにアクセス
        if (
            event &&
            event.type === "keydown" &&
            "key" in event &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpen(isOpen);
    };

    return (
        <>
            <Button variant="contained" onClick={toggleDrawer(true)}>
                Open Drawer
            </Button>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem>
                            <ListItemText primary="大目標" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="週目標" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="今日の目標" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="勉強時間" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="休憩時間" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="勉強の内容" />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
        </>
    );
};

export default CheckSchedule;
