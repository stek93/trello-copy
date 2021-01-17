import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

import styles from './Logo.module.scss';

const LOGO_LINK =
	'https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png';

const LOGO_ANIMATION_LINK =
	'https://a.trellocdn.com/prgb/dist/images/header-loading-logo.d73159084f5122775d4d.gif';

const LogoPropTypes = {
	className: string
};

const LogoDefaultProps = {
	className: ''
};

export default function Logo({ className }) {
	const classLogo = cn({
		[styles.logo]: true,
		[className]: className
	});
	return (
		<Link to='/'>
			<div className={classLogo}>
				<img src={LOGO_LINK} alt='Trello Logo' className={styles.logo_static} />
				<div className={styles.logo_interactive}>
					<img src={LOGO_ANIMATION_LINK} alt='Trello Interactive Logo' />
				</div>
			</div>
		</Link>
	);
}

Logo.propTypes = LogoPropTypes;
Logo.defaultProps = LogoDefaultProps;
