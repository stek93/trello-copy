import React from 'react';

import useMembers from 'hooks/useMembers';

import styles from './Profile.module.scss';

export default function Profile() {
	const { user } = useMembers();

	return <div className={styles.profile}>{user?.initials}</div>;
}
