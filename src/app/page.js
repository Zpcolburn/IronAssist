'use client';

import React, { useEffect, useState } from 'react';
import EquipmentCard from '@/components/EquipmentCard';
import EquipmentForm from '@/components/Forms/EquipmentForm';
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { getEquipment } from '../api/equipmentData';

function Home() {
  const [equipment, setEquipment] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddEquipment = (newEquipment) => {
    setEquipment((prevEquipment) => [...prevEquipment, newEquipment]);
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await getEquipment();
        console.log('Fetched equipment data:', data); // Log the fetched data
        setEquipment(data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <Container className="text-center d-flex flex-column justify-content-center align-content-center" style={{ paddingTop: '5rem', padding: '30px' }}>
      <Button variant="primary" className="mb-3" style={{ position: 'fixed', top: '13rem', left: '0', transform: 'rotate(-90deg)', transformOrigin: 'left top' }} onClick={handleShow}>
        Add Equipment
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <EquipmentForm onAddEquipment={handleAddEquipment} onClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>

      <Row className="justify-content-center">
        {equipment.length > 0 ? (
          equipment.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
              <EquipmentCard equipObj={item} />
            </Col>
          ))
        ) : (
          <p>Loading equipment...</p>
        )}
      </Row>
    </Container>
  );
}

export default Home;
