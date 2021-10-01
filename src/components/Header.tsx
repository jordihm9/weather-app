interface Props {
	children: React.ReactNode
}

export const Header: React.FC<Props> = ({children}) => {
	return (
		<div className="header">
			<nav>
				<h1 className="app-name">Weather App</h1>
				<div>
					{children}
				</div>
			</nav>
		</div>
	);
}
