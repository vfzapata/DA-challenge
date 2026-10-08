import type { Note } from '../../types/notes'

type HeaderProps = {
	notes: Note[]
}

function Header({ notes }: HeaderProps) {
	return (
		<header className="topbar flex items-center justify-between">
			<a className="brand flex items-center gap-3" href="#board" aria-label="Notes board home">
				<span className="brand-mark" aria-hidden="true"><span /></span>
				<span className="brand-name">Notes board<span>.</span></span>
			</a>
			<div className="topbar-meta flex items-center gap-4">
				<span className="saved-indicator"><span /> Saved on the current session</span>
				<span className="meta-divider" />
				<span className="note-count">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
			</div>
		</header>
	)
}

export default Header
