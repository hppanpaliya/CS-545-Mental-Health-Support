import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../../store/features/supportGroups/supportGroupsSlice";
import "./CreateGroup.css";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputAdornment,
    TextField,
} from "@mui/material";

const CreateGroup = () => {
    // Define state variable for the group name
    const [groupName, setGroupName] = useState("");

    // Get the Redux dispatch function
    const dispatch = useDispatch();

    // Handle creation of a new group
    const handleCreateGroup = () => {
        // Check if group name is not empty
        if (groupName.trim() !== "") {
            // Dispatch the createGroup action with the group name
            dispatch(createGroup({ name: groupName }));

            // Clear the group name input
            setGroupName("");
        }
    };

    // Render the form for creating a new group
    return (
        // <div className="create-group-container">
        //   <h3 className="create-group-title">Create New Group:</h3>
        //   <input
        //     type="text"
        //     placeholder="Group Name"
        //     value={groupName}
        //     onChange={(e) => setGroupName(e.target.value)}
        //     className="create-group-input"
        //   />
        //   <button onClick={handleCreateGroup} className="create-group-button">
        //     Create
        //   </button>
        // </div>

        <Container sx={{ paddingTop: 5.5 }}>
            <FormControl fullWidth>
                <TextField
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleCreateGroup}
                                    size="large"
                                >
                                    Create
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>
        </Container>
    );
};

export default CreateGroup;
