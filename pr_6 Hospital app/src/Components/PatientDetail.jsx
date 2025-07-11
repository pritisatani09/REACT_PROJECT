import { Badge, Button, Card } from "react-bootstrap";
import { FaUserMd, FaProcedures } from "react-icons/fa";

const PatientDetail = ({ patient, handleDelete, handleEdit }) => {
  if (!patient) return null;

  return (
    <Card className="shadow patient-card h-100">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          {patient.patientName} <Badge bg="secondary">{patient.id}</Badge>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <FaUserMd /> {patient.doctorName} | <FaProcedures /> Ward: {patient.wardNo}
        </Card.Subtitle>
        <Card.Text>
          <strong>DOB:</strong> {patient.dob} <br />
          <strong>Gender:</strong> {patient.gender} <br />
          <strong>Contact:</strong> {patient.contactNo} <br />
          <strong>Blood Group:</strong> {patient.bloodgroup} <br />
          <strong>Disease:</strong> {patient.disease} <br />
          <strong>Admit Date:</strong> {patient.admitDate}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="warning" size="sm" onClick={() => handleEdit(patient.id)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(patient.id)}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PatientDetail;
