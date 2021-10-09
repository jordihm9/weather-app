import React from 'react';
import './Button.css';

interface Props {
	children: React.ReactNode,
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<Props> = ({children, ...props}) => {
	return (
		<button className="btn" {...props}>
			{children}
		</button>
	);
}
