import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Card } from 'react-bootstrap';
import generateUniqueId from 'generate-unique-id';
import PatientDetail from './PatientDetail';
import './Hospital.css';

const fields = [
  { label: "Patient Name", name: "patientName", type: "text" },
  { label: "Date of Birth", name: "dob", type: "date" },
  { label: "Contact No", name: "contactNo", type: "text" },
  { label: "Blood Group", name: "bloodgroup", type: "select", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  { label: "Disease", name: "disease", type: "select", options: ["Flu", "COVID-19", "Diabetes", "Hypertension", "Asthma"] },
  { label: "Doctor Name", name: "doctorName", type: "select", options: ["Dr. Mehta", "Dr. Sharma", "Dr. Patel", "Dr. Verma"] },
  { label: "Admit Date", name: "admitDate", type: "date" },
  { label: "Ward No", name: "wardNo", type: "text" },
];

const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {
  gender: "",
  id: "",
});

const getStorageData = () => JSON.parse(localStorage.getItem("Patients")) || [];

const Hospital = () => {
  const [inputForm, setInputForm] = useState(initialState);
  const [patientData, setPatientData] = useState(getStorageData());
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!inputForm.patientName.trim()) newErrors.patientName = "Please enter Patient Name.";
    if (!inputForm.dob) newErrors.dob = "Please enter Date of Birth.";
    if (!inputForm.gender) newErrors.gender = "Please select Gender.";
    if (!inputForm.contactNo.trim()) {
      newErrors.contactNo = "Please enter Contact No.";
    } else if (!/^\d{10}$/.test(inputForm.contactNo)) {
      newErrors.contactNo = "Contact No must be exactly 10 digits.";
    }
    if (!inputForm.bloodgroup) newErrors.bloodgroup = "Please select Blood Group.";
    if (!inputForm.disease) newErrors.disease = "Please select Disease.";
    if (!inputForm.doctorName) newErrors.doctorName = "Please select Doctor Name.";
    if (!inputForm.admitDate) newErrors.admitDate = "Please enter Admit Date.";
    if (!inputForm.wardNo.trim()) newErrors.wardNo = "Please enter Ward No.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formData = { ...inputForm };

    if (isEdit) {
      setPatientData((prev) =>
        prev.map((p) => (p.id === inputForm.id ? formData : p))
      );
      setIsEdit(false);
    } else {
      const id = generateUniqueId({ length: 6, useLetters: false });
      setPatientData((prev) => [...prev, { ...formData, id }]);
    }

    setInputForm(initialState);
  };

  const handleEdit = (id) => {
    const record = patientData.find((p) => p.id === id);
    if (record) {
      setInputForm({ ...record });
      setIsEdit(true);
    }
  };

  const handleDelete = (id) => {
    setPatientData((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("Patients", JSON.stringify(patientData));
  }, [patientData]);

  return (
    <Container className="py-4">
      <Card className="mb-5 patient-form-card">
        <div className="patient-form-header">
          {isEdit ? "EDIT PATIENT" : "ADD PATIENT"}
        </div>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            {fields.map(({ label, name, type, options }) => (
              <Form.Group className="mb-3" key={name}>
                <Form.Label>{label}</Form.Label>
                {type === "select" ? (
                  <Form.Select
                    name={name}
                    value={inputForm[name]}
                    onChange={handleChanged}
                    isInvalid={!!errors[name]}
                  >
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </Form.Select>
                ) : (
                  <Form.Control
                    type={type}
                    name={name}
                    value={inputForm[name]}
                    onChange={handleChanged}
                    placeholder={`Enter ${label}`}
                    isInvalid={!!errors[name]}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  {errors[name]}
                </Form.Control.Feedback>
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div>
                {["Male", "Female"].map((g) => (
                  <Form.Check
                    inline
                    key={g}
                    label={g}
                    name="gender"
                    type="radio"
                    id={`gender-${g}`}
                    value={g}
                    checked={inputForm.gender === g}
                    onChange={handleChanged}
                    isInvalid={!!errors.gender}
                  />
                ))}
                {errors.gender && (
                  <div className="text-danger small mt-1">{errors.gender}</div>
                )}
              </div>
            </Form.Group>

            <div className="text-end">
              <Button variant="primary" type="submit">
                {isEdit ? "Update" : "Add"} Patient
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <div className="patient-records-title mb-4">Patient Records</div>
      <Row xs={1} md={3} className="g-4">
        {patientData.length === 0 && <p>No patient records found.</p>}
        {patientData.map((patient) => (
          <Col key={patient.id}>
            <PatientDetail
              patient={patient}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Hospital;
