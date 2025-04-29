import { lazy, Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import ErrorFeedback from "./components/share/ErrorFeedback"
import LoadingFeedback from "./components/share/LoadingFeedback"
import AdminProtected from "./pages/share/AdminProtected"
import DoctorProtected from "./pages/share/DoctorProtected"
import UserProtected from "./pages/share/UserProtected"

// import { io } from "socket.io-client"
// export const socket = io("https://zomato-lite.onrender.com/api")




const PublicLayout = lazy(() => import("./components/public/PublicLayout"))
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"))
const DoctorLayout = lazy(() => import("./components/Doctor/DoctorLayout"))
const PatientLayout = lazy(() => import("./components/Patient/PatientLayout"))

// public
const AdminLogin = lazy(() => import("./pages/public/AdminLogin"))
const PatientLogin = lazy(() => import("./pages/public/Login"))
const PatientRegister = lazy(() => import("./pages/public/Register"))
const RegisterDoctor = lazy(() => import("./pages/public/RegisterDoctor"))
const DoctorLogin = lazy(() => import("./pages/public/DoctorLogin"))
const DashBoardPublic = lazy(() => import("./pages/public/DashBoard"))

// admin
const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const AllDoctors = lazy(() => import("./pages/admin/AllDoctors"))
const AllAppointments = lazy(() => import("./pages/admin/AllAppointments"))
const AllPatients = lazy(() => import("./pages/admin/AllPatients"))
const AddDoctor = lazy(() => import("./pages/admin/AddDoctor"))


// doctor
const Appointments = lazy(() => import("./pages/doctor/ScheduledAppointments"))
const Profile = lazy(() => import("./pages/doctor/Profile"))
const DoctorDashboard = lazy(() => import("./pages/doctor/Dashboard"))

// patient
const PatientDashboard = lazy(() => import("./pages/patient/Dashboard"))
const History = lazy(() => import("./pages/patient/History"))
const BookAppointment = lazy(() => import("./pages/patient/BookAppointment"))

const App = () => {
  const publicRoutes = [
    { path: "public-dashboard", element: <DashBoardPublic /> },
    { path: "admin-login", element: <AdminLogin /> },
    { path: "login-patient", element: <PatientLogin /> },
    { path: "register-patient", element: <PatientRegister /> },
    { path: "register-doctor", element: <RegisterDoctor /> },
    { path: "login-doctor", element: <DoctorLogin /> },
  ]
  const adminRoutes = [
    { isIndex: true, element: <Dashboard /> },
    { isIndex: false, path: "admin-allDoctors", element: <AllDoctors /> },
    { isIndex: false, path: "admin-appointments", element: <AllAppointments /> },
    { isIndex: false, path: "admin-AllPatient", element: <AllPatients /> },
    // { isIndex: false, path: "admin-addDoctor", element: <AddDoctor /> },
  ]
  const doctorRoutes = [
    { path: "doctor-dashboard", element: <DoctorDashboard /> },
    { path: "doctor-appointments", element: <Appointments /> },
    { path: "doctor-profile", element: <Profile /> },
    { path: "doctor-accept/:aid", element: <Profile /> },
    { path: "doctor-decline/:aid", element: <Profile /> },
  ]
  const patientRoutes = [
    { isIndex: true, path: "patient-dashboard", element: <PatientDashboard /> },
    { isIndex: false, path: "patient-bookappointment/:id", element: <BookAppointment /> },
    { isIndex: false, path: "patient-history", element: <History /> },
  ]


  return <>
    {
      import.meta.env.VITE_ENV === "dev" && <div className="position-fixed bottom-0 start-0 bg-secondary-subtle">{import.meta.env.VITE_BACKEND_URL}</div>
    }

    <ToastContainer />
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<PublicLayout />}>
          {
            publicRoutes.map(item => <Route
              key={`public-${item.path}`}
              index={item.isIndex}
              path={item.isIndex ? "" : item.path}
              element={<ErrorBoundary FallbackComponent={ErrorFeedback}>
                <Suspense fallback={<LoadingFeedback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>}
            />)
          }
        </Route>

        {/* admin */}
        <Route path="/admin" element={<AdminProtected compo={<AdminLayout />} />}>
          {/* <Route path="/" element={<AdminProtected compo={<AdminLayout />} />}> */}
          {
            adminRoutes.map(item => <Route
              key={`admin-${item.path}`}
              index={item.isIndex}
              path={item.isIndex ? "" : item.path}
              element={<ErrorBoundary FallbackComponent={ErrorFeedback}>
                <Suspense fallback={<LoadingFeedback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>}
            />)
          }
        </Route>

        {/* doctor */}
        <Route path="/doctor" element={<DoctorProtected compo={<DoctorLayout />} />}>
          {
            doctorRoutes.map(item => <Route
              key={`doctor-${item.path}`}
              index={item.isIndex}
              path={item.isIndex ? "" : item.path}
              element={<ErrorBoundary FallbackComponent={ErrorFeedback}>
                <Suspense fallback={<LoadingFeedback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>}
            />)
          }
        </Route>

        {/* patient */}
        <Route path="/patient" element={<UserProtected compo={<PatientLayout />} />}>
          {
            patientRoutes.map(item => <Route
              key={`patient-${item.path}`}
              index={item.isIndex}
              path={item.isIndex ? "" : item.path}
              element={<ErrorBoundary FallbackComponent={ErrorFeedback}>
                <Suspense fallback={<LoadingFeedback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>}
            />)
          }
        </Route>



        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App