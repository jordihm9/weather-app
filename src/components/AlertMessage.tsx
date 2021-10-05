import './AlertMessage.css';

interface Props {
	msg: string
}

export const AlertMessage: React.FC<Props> = ({msg}) => {
	return (
		<div className="alert">
			<div className="alert-sign" />
			<div className="msg">{msg}</div>
		</div>
	);
}
