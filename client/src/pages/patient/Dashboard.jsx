import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useGetDoctorsQuery } from '../../redux/api/patientApi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { data } = useGetDoctorsQuery();
    const navigate = useNavigate();

    return (
        <Container>
            <h2 className="my-4 text-center">Available Doctors</h2>
            <Row>
                {

                    data && data.result.map((doctor) => (
                        <Col key={doctor._id} md={4} sm={6} className="mb-4">
                            <Card className="shadow-lg border-0">
                                <Card.Img
                                    variant="top"
                                    src={doctor.profileImage || "https://via.placeholder.com/150"}
                                    alt={doctor.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body className="text-center">
                                    <Card.Title>{doctor.name}</Card.Title>
                                    <Card.Text className="text-muted">{doctor.specialization}</Card.Text>
                                    <Card.Text className="text-muted">{`Contact: ${doctor.phone}`}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate(`/patient/patient-bookappointment/${doctor._id}`)}
                                    // onClick={console.log(data)}
                                    >
                                        Book Appointment
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
};

export default Dashboard;
