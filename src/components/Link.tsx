
interface Props {
	href: string,
	text: string
}

const style: React.CSSProperties = {
	color: 'inherit'
}

export const Link: React.FC<Props> = ({href, text}) => {
	return (
		<a href={href} style={style}>{text}</a>
	);
}