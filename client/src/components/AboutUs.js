import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Row, Col, Container, Card, CardBody, CardTitle, CardText } from "reactstrap";

const teamMembers = [
  {
    name: "Aya Said Al-Harrasi",
    id: "26J1931",
    role: "Frontend & Backend Developer",
  },
  {
    name: "Azza Said Al-Taiwani",
    id: "26S1935",
    role: "Frontend & Backend Developer",
  },
];

const AboutUs = () => {
  const { isLogin } = useSelector(state => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="text-center mb-3">About Our Store Project</h1>
          <p className="text-center">
            Welcome to our online store project! This platform allows users to browse, search, and purchase products with ease. 
            Our goal is to provide a seamless shopping experience using modern web technologies.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        {teamMembers.map((member, idx) => (
          <Col md={4} sm={6} xs={12} key={idx} className="mb-3">
            <Card>
              <CardBody>
                <CardTitle tag="h3">{member.name}</CardTitle>
                <CardText><strong>ID:</strong> {member.id}</CardText>
                <CardText><strong>Role:</strong> {member.role}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={12}>
          <h2 className="mt-4">References</h2>
          <ul>
            <li>ReactJS Documentation</li>
            <li>Redux Toolkit Documentation</li>
            <li>Reactstrap Documentation</li>
            <li>Online tutorials and resources</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;