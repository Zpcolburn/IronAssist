'use client';

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addEquipment } from '@/api/equipmentData';
import PropTypes from 'prop-types';

export default function EquipmentForm({ onAddEquipment, onClose }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    type: '',
    image: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data being submitted:', formData); // Log the form data
      const response = await addEquipment(formData);
      console.log('Equipment added:', response);
      onAddEquipment(response); // Update the equipment list
      setFormData({ make: '', model: '', type: '', image: '', description: '' }); // Reset the form
      onClose(); // Close the offcanvas
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formMake">
        <Form.Label>Make</Form.Label>
        <Form.Control type="text" name="make" value={formData.make} onChange={handleChange} placeholder="Enter make" />
      </Form.Group>

      <Form.Group controlId="formModel">
        <Form.Label>Model</Form.Label>
        <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Enter model" />
      </Form.Group>

      <Form.Group controlId="formType">
        <Form.Label>Type</Form.Label>
        <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Enter type" />
      </Form.Group>

      <Form.Group controlId="formImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Enter image URL" />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
}

EquipmentForm.propTypes = {
  onAddEquipment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
