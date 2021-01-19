import React from 'react';
import cn from 'classnames';

import { ReactComponent as CloseIcon } from 'static/img/icon-close.svg';
import { ReactComponent as LinkedinIcon } from 'static/img/icon-linkedin.svg';
import { ReactComponent as GithubIcon } from 'static/img/icon-github.svg';

import styles from './InfoSection.module.scss';

const IMAGE_LINK =
	'https://a.trellocdn.com/prgb/dist/images/tips/info-image-03@1x.68fe6ac4cd198b845184.png';

export default function InfoSection({ closeSection }) {
	return (
		<section className={styles.info_section}>
			<header>
				<h3>Information</h3>
				<div className={styles.icon_wrapper}>
					<CloseIcon onClick={closeSection} />
				</div>
			</header>
			<div className={styles.main}>
				<img src={IMAGE_LINK} alt='Info' className={styles.info_image} />
				<div className={styles.author_info}>
					<h3>Made by Stefan Kajkut</h3>
					<div className={styles.socials}>
						<div className={cn(styles.icon, styles.linkedin)}>
							<a
								href='https://www.linkedin.com/in/stefan-kajkut/'
								target='_blank'
								rel='noreferrer'
							>
								<LinkedinIcon />
							</a>
						</div>
						<div className={cn(styles.icon, styles.github)}>
							<a href='https://github.com/stek93' target='_blank' rel='noreferrer'>
								<GithubIcon />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
