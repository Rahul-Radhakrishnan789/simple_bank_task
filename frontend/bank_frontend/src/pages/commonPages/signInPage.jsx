import React, { useState, } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Checkbox,
    Alert,
    Link
} from "@mui/material";
import axios from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";

export default function SignUpPage() {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    const handleCheckBoxChange = (event) => {
        setIsChecked(event.target.checked);
    };


    const validateForm = () => {
        if (!formData.name.trim()) {
            setError("Name is required");
            return false;
        }
        if (!formData.email.trim()) {
            setError("Email is required");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Email address is invalid");
            return false;
        }
        if (!formData.password.trim()) {
            setError("Password is required");
            return false;
        } else if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };


    const handleRegister = async () => {
        try {
            const isValid = validateForm();
            if (!isValid) return;
         
            const formDataToSend = new FormData();

            formDataToSend.append('username', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);

            if (isChecked) {
              
                console.log('Sending data:', formData);

                const response = await axios.post("/adminRegister", formDataToSend );
    
                console.log('Response:', response.data);
    
                if (response.status === 201) {
                    localStorage.setItem("loginEmail",response.data.data)
                    navigate("/login")
                }
            }
            else{
        const response = await axios.post("/userRegister", formDataToSend);
            console.log(response);
            if (response.status === 201) {
                localStorage.setItem("loginEmail",response.data.data)
                navigate("/login")

            }}
        } catch (error) {
            console.log(error);

            setErrorMessage("Already registered, please login");

        }
    };



    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleRegister();

    };

    return (
        <>
            <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {errorMessage && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Alert>
                )}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                       
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Box>
                            <Box><label>
                                Admin
                                <Checkbox
                                    checked={isChecked}
                                    onChange={handleCheckBoxChange}
                                    defaultChecked={false}
                                    color="primary"
                                    sx={{
                                        color: pink[800],
                                        "&.Mui-checked": {
                                            color: pink[600],
                                        },
                                    }}
                                />
                            </label></Box>
                            <Box><Link onClick={() => navigate("/login")}>already have an account ? signin</Link></Box>
                        </Box>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Sign Up
                        </Button> 

                    </form>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </Box>

            </Container>
        </>
    );
}