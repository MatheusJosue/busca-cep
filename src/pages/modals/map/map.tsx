import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import axios from 'axios';
import { MapModalProps } from './types';
import environment from '../../../assets/environments/environments.json';

const MapModal: React.FC<MapModalProps> = ({ show, handleClose, cep }) => {
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    
    useEffect(() => {
        const fetchCoordinates = async () => {
            if (cep) {
                const address = `${cep.logradouro}, ${cep.bairro}, ${cep.localidade}, ${cep.uf}`;
                const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${environment.googleApiKey}`;

                try {
                    const response = await axios.get(geocodeUrl);
                    const results = response.data.results;
                    if (results.length > 0) {
                        const location = results[0].geometry.location;
                        setPosition({
                            lat: location.lat,
                            lng: location.lng,
                        });
                        console.log('Coordinates fetched:', location); // Logging the correct position
                    } else {
                        setPosition(null);
                    }
                } catch (error) {
                    console.error('Error fetching coordinates:', error);
                    setPosition(null);
                }
            }
        };

        if (show) {
            fetchCoordinates();
        }

    }, [cep, show]);

    if (!position) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Localização no Mapa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GoogleMap mapContainerStyle={{ height: '500px', width: '100%' }} center={position} zoom={17}>
                    <MarkerF position={position} />
                </GoogleMap>
            </Modal.Body>
        </Modal>
    );
};

export default MapModal;
