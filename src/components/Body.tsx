import './Body.css';

interface Props {
	children: React.ReactNode
}

export const Body: React.FC<Props> = ({children}) => {
	return (
		<main>{children}</main>
	);
}