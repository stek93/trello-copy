import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { string, node, bool } from 'prop-types';

import styles from './MenuItem.module.scss';

const MenuItemPropTypes = {
	children: node.isRequired,
	href: string,
	className: string,
	isNavigation: bool
};

const MenuItemDefaultProps = {
	href: '',
	className: '',
	isNavigation: false
};

export default function MenuItem({ children, href, className, isNavigation, ...props }) {
	const classMenuItem = cn({
		[styles.item]: true,
		[className]: className
	});
	return (
		<li className={classMenuItem} {...props}>
			{isNavigation ? <Link to={href}>{children}</Link> : children}
		</li>
	);
}

MenuItem.propTypes = MenuItemPropTypes;
MenuItem.defaultProps = MenuItemDefaultProps;
