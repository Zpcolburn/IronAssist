'use client';

import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function EquipmentCard({ equipObj }) {
  console.log('EquipmentCard received equipObj:', equipObj); // Log the equipObj

  return (
    <Card className="m-3" style={{ width: '18rem', height: '23rem', overflow: 'hidden' }}>
      <Card.Img variant="top" src={equipObj.image} alt="equip" style={{ height: '12rem', objectFit: 'contain', width: '100%' }} />
      <Card.Body>
        <Card.Title className="text-truncate">
          {equipObj.make} {equipObj.model}
        </Card.Title>
        <Card.Text className="text-truncate">
          <strong>Type:</strong> {equipObj.type}
        </Card.Text>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href={`/equipment/${equipObj.id}`} passHref>
                Go to Equipment
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
}

EquipmentCard.propTypes = {
  equipObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
