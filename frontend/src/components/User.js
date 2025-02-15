import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const User = ({ user, setUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize user properties
        const initializedUser = {
            _id: Date.now(),
            id: '',
            eta: '',
            sesso: '',
            scolarita: ''
        };
        // Initialize user properties if not already provided
        setUser(initializedUser);
    }, []);


    // Handler to update the user's id
    const setId = (id) => {
        setUser({ ...user, id: id });
    };

    // Handler to update the user's age
    const setAge = (eta) => {
        setUser({ ...user, eta: Number(eta) });
    };

    // Handler to update the user's gender
    const setGender = (sesso) => {
        setUser({ ...user, sesso: sesso });
    };

    // Handler to update the user's gender
    const setEducation = (scolarita) => {
        setUser({ ...user, scolarita: scolarita });
    };

    const goToPlayPage = () => {
        // Check if the necessary fields are filled
        if (user.id && user.eta && user.sesso && user.scolarita) {
            // If all fields are filled, navigate to the play page
            console.log(user);
            navigate('/play');
        } else {
            // If any field is empty, prevent navigation and alert the user
            alert('Riempi tutti i campi per continuare!');
        }
    };

    return (
        <div>
            <h2>Informazioni Giocatore</h2>
            <div className='input'>
                <label>ID: </label>
                <input
                    type="text"
                    value={user.id || ''}
                    onChange={(e) => setId(e.target.value)}
                />
            </div>
            <div className='input'>
                <label>Età: </label>
                <input
                    type="number"
                    value={user.eta || ''}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div className='input'>
                <label>Sesso: </label>
                <select
                    value={user.sesso || ''}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Seleziona Sesso</option>
                    <option value="uomo">Uomo</option>
                    <option value="donna">Donna</option>
                    <option value="altro">Altro</option>
                </select>
            </div>
            <div className='input'>
                <label>Titolo di studio (indicare il più alto titolo censeguito) </label>
                <select
                    value={user.scolarita || ''}
                    onChange={(e) => setEducation(e.target.value)}
                >
                    <option value="">Seleziona Scolarità</option>
                    <option value="Licenza media">Licenza media</option>
                    <option value="Diploma di scuola superiore">Diploma di scuola superiore</option>
                    <option value="Laurea di primo livello">Laurea di primo livello</option>
                    <option value="Laurea di secondo livello">Laurea di secondo livello</option>
                    <option value="Master/Dottorato di ricerca/Specializzazione">Master/Dottorato di ricerca/Specializzazione</option>
                </select>
            </div>
            <div className='input'>
                <a className="user-submit"  onClick={goToPlayPage}>Inizia!</a>
            </div>
        </div>
    );
};

export default User;
