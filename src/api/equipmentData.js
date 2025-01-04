import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getEquipment = () =>
  new Promise((resolve, reject) => {
    const url = `${endpoint}/api/equipment`;
    console.log(`Fetching equipment from ${url}`); // Log the URL

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched equipment data:', data); // Log the fetched data
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching equipment:', error); // Log the error
        reject(error);
      });
  });

const addEquipment = (equipment) =>
  new Promise((resolve, reject) => {
    const url = `${endpoint}/api/equipment`;
    console.log(`Adding equipment to ${url}`); // Log the URL
    console.log('Data being sent:', equipment); // Log the data being sent

    const payload = {
      make: equipment.make,
      model: equipment.model,
      type: equipment.type,
      image: equipment.image,
      description: equipment.description,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Added equipment data:', data); // Log the added data
        resolve(data);
      })
      .catch((error) => {
        console.error('Error adding equipment:', error); // Log the error
        reject(error);
      });
  });

export { getEquipment, addEquipment };
