import React from 'react';
import { useParams } from 'react-router-dom';

export default function Board() {
	const { id } = useParams();
	return <h1>OVO JE ID: {id}</h1>;
}
