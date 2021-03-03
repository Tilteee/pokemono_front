import React, { useEffect, useState } from 'react';

import mainApi  from '../../services/mainApi';
import CardBatalha from './CardBatalha';

function Batalha() {

    const [user, setUser] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if(userId) {
            getUser(userId);
        } else {
            alert('NÃO HÁ USUÁRIO LOGADO!')
        }

        async function getUser(id) {
            const response = await mainApi.get(`/treinador/${id}`);
            const { treinador } = response.data;
            setUser(treinador);
        }
    }, [])

    console.log({user});

    return (
        <CardBatalha user={user} arroz={'feijão'}/>
    );
}

export default Batalha;