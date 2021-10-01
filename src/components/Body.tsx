
interface Props {
	children: React.ReactNode
}

export const Body: React.FC<Props> = ({children}) => {
	return (
		<div className="body">{children}</div>
	);
}