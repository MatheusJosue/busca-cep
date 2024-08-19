import { useState } from 'react';
import './styles.css';
import { FiSearch } from 'react-icons/fi';
import api from '../../api/api';
import { CepData } from './types';
import favLogo from '../../assets/images/favLogo.png';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FiMapPin } from 'react-icons/fi';
import MapModal from '../modals/map/map';

export default function Home() {
    const [input, setInput] = useState<string>('');
    const [cep, setCep] = useState<CepData | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMapModal, setShowMapModal] = useState(false);

    const handleSearch = async () => {
        setCep(null);
        
        if (input === '') {
            setErrorMessage('Preencha algum CEP!');
            clearErrorMessageAfterDelay();
            return;
        }

        try {
            const response = await api.get(`${input}/json`);

            if (response.data.erro) {
                setErrorMessage('CEP inexistente.');
                clearErrorMessageAfterDelay();
                return;
            }else{
                setCep(response.data);
                setInput('');
                setErrorMessage('');
            }
        } catch {
            setErrorMessage('Ops, erro ao buscar o CEP');
            clearErrorMessageAfterDelay();
            setInput('');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        value = value.replace(/\D/g, '');

        if (value.length > 5) {
            value = value.replace(/(\d{5})(\d{0,3})/, '$1-$2');
        }

        setInput(value);
    };

    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
    };
    
    const clearErrorMessageAfterDelay = () => {
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    };

    const renderTooltip = (props:any) => (
        <Tooltip id="button-tooltip" {...props}>
          Visualizar no mapa 
          <FiMapPin size={20} color='#007bff'></FiMapPin>
        </Tooltip>
    );

    const handleShowMapModal = () => {
        setShowMapModal(true);
    };

    const handleCloseMapModal = () => {
        setShowMapModal(false);
    };

    return (
        <div className="App">
            <div className="App-header">
                <span className='title'>Buscar CEP</span>

                <div className='containerInput'>
                    <input
                        type="text"
                        placeholder="Digite seu cep..."
                        name="cep"
                        value={input}
                        onChange={handleChange}
                        autoComplete="off"
                        maxLength={9}
                        onKeyDown={handleKeyDown}
                    />
                    <button className='buttonSearch' onClick={handleSearch} >
                        <FiSearch size={25} color='#fff' />
                    </button>
                </div>

                <>
                {cep && (
                    <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                        <div className='card p-3' onClick={handleShowMapModal} style={{ cursor: 'pointer', position: 'relative' }}>
                            <h1 className='bold'>CEP: {cep.cep}</h1>
                            <span className='description'>Rua: {cep.logradouro}</span>
                            <span className='description'>Bairro: {cep.bairro}</span>
                            <span className='description'>Cidade: {cep.localidade} - {cep.uf}</span>
                            <FiMapPin size={20} color='#007bff' style={{ position: 'absolute', bottom: '10px', right: '10px', cursor: 'pointer'}}
                            />
                        </div>
                    </OverlayTrigger>
                )}
                </>

                <MapModal show={showMapModal} handleClose={handleCloseMapModal} cep={cep} />

                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
            </div>

            <div className="positionAbsolute">
                <a href="https://github.com/MatheusJosue" target="_blank" rel="noopener noreferrer"><img className="sizeImg" src={favLogo} alt="Logo" /></a>
            </div>
        </div>
    );
}
