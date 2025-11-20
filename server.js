const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const registrationRoutes = require('./routes/registrationRoutes');
const appointmentRoute = require('./routes/appointmentRoute');
const doctorRoute = require('./routes/doctorRoute'); 
const medicineRoute = require('./routes/medicineRoute');
const loginRoutes = require('./routes/loginRoutes');
const laboratoryRoutes = require('./routes/laboratoryRoutes');
const labStaffRoutes = require("./routes/labstaffRoutes");
const adminLaboratoryRouter = require('./routes/adminLaboratoryRoute');
const medicalOrderRoute = require('./routes/medicalOrderRoute'); 
const medicalStaffRoute = require('./routes/medicalstaffRoute');
const userRoutes = require('./routes/userRoutes');
const doctorProfileRoute = require('./routes/doctorProfileRoute');
const paymentRoute = require('./routes/paymentRoute');
const contactRoute = require("./routes/contactRoute")



// Example URLs:
// GET  http://localhost:5000/api/laboratory/labShow
// GET  http://localhost:5000/api/laboratory/labapprove?action=approve&casenum=xxxx


const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use('/api/register', registrationRoutes);
app.use('/api/appointments', appointmentRoute); 
app.use('/api/doctor', doctorRoute); 
app.use("/api/medicine", medicineRoute);
app.use('/api', loginRoutes);
app.use('/api/laboratory', laboratoryRoutes);
app.use("/api/laboratory", labStaffRoutes);
app.use('/api/admin', adminLaboratoryRouter);
app.use('/api/medicine', medicalOrderRoute);
app.use('/api/medicalstaff', medicalStaffRoute);
app.use('/api/userdata', userRoutes);
app.use('/api/doctorprofile', doctorProfileRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/contactus",contactRoute);


// Start Server with error handling
const PORT = 5000;
try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (err) {
    console.error("Server failed to start:", err);
}
