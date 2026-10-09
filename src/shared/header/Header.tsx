import brandIcon from '../../assets/brandicon.png';
import './header.css';

type HeaderProps = {
	noteCount: number
}

function Header({ noteCount }: HeaderProps) {
	return (
		<header className="topbar flex items-center justify-between">
			<a className="brand flex items-center gap-3" href="#board" aria-label="Notes board home">
				<img className="brand-mark" src={brandIcon} alt="" />
				<span className="brand-name">Notes board<span>.</span></span>
			</a>
			<div className="topbar-meta flex items-center gap-4">
				<span className="saved-indicator"><span /> Saved on the current session</span>
				<span className="meta-divider" />
				<span className="note-count">{noteCount} {noteCount === 1 ? 'note' : 'notes'}</span>
			</div>
		</header>
	)
}

export default Header
