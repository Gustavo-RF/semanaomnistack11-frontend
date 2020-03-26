import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

function Logon() {
	const [id, setId] = useState('');
	const history = useHistory();

	async function handleLogin(e) {
		e.preventDefault();

		try{
			const response = await api.post('/sessions', {id});
			console.log(response.data.name);
			localStorage.setItem('ong_id',id);
			localStorage.setItem('ong_name', response.data.name);

			history.push('/profile');

		}catch(err) {
			alert('Ong inexistente');
		}
	}

	return (
		<div className="logon-container">
			<section className="form">
				<img src={logoImg} alt="Logo"/>
				<form onSubmit={handleLogin}>
					<h1>Faça seu logon</h1>
					<input value={id} onChange={ e => setId(e.target.value) }  type="text" placeholder="Sua ID" />
					<button className="button" type="submit">Entrar</button>
				</form>
				<Link className="back-link" to="/register">
					<FiLogIn size="16" color="#e02041" />
					Não tenho cadastro
				</Link>
			</section>
			<img src={heroesImg} alt="Heroes img"/>
		</div>
	);
}

export default Logon;