import React, { useState } from 'react';

import { ReactComponent as InfoIcon } from 'static/img/icon-info.svg';

import InfoSection from './components/InfoSection';
import styles from './Info.module.scss';

export default function Info() {
	const [showSection, setShowSection] = useState(false);
	return (
		<>
			<InfoIcon onClick={() => setShowSection(!showSection)} />
			{showSection && <InfoSection closeSection={() => setShowSection(false)} />}
		</>
	);
}
