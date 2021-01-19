import React, { useState } from 'react';

import { ReactComponent as InfoIcon } from 'static/img/icon-info.svg';

import InfoSection from './components/InfoSection';

export default function Info() {
	const [showSection, setShowSection] = useState(false);
	return (
		<>
			<InfoIcon onClick={() => setShowSection(!showSection)} />
			{showSection && <InfoSection closeSection={() => setShowSection(false)} />}
		</>
	);
}
