import React, { Component } from 'react';
import './Notes.scss';

type Note = {
    id: string,
    title: string,
    text: string
}
type NotesState = {
    notes: Array<Note>
}

class Notes extends Component<{}, NotesState> {

    constructor(props: any) {
        super(props);
        this.state = {notes: [{id: this.guid, title: "Untitled Note", text: ""}]}
    }

    get guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    addNote() {
        const notes = [...this.state.notes];
        notes.push({id: this.guid, title: "Untitled Note", text:""});
        this.setState({notes: notes});
    }

    removeNote(event: React.MouseEvent, note: Note) {
        const notes = [...this.state.notes];
        const index = notes.findIndex((thisNote: Note) => {
            return thisNote == note;
        });

        notes.splice(index, 1);
        this.setState({notes: notes})
    }

    onNoteChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, note: Note, prop: string) {
        const text = event.target.value;
        const notes = [...this.state.notes];

        const index = notes.findIndex((thisNote: Note) => {
            return thisNote == note;
        });

        if (prop == 'text') {
            notes[index].text = text;
        } else if (prop == 'title') {
            notes[index].title = text;
        }

        this.setState({notes: notes});
    }


    render() {

        const noteEles = this.state.notes.map((note: Note) => {
            return (
                <div key={note.id} className="Note">
                    <div className="Header">
                        <input className="Title" value={note.title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onNoteChange(event, note, 'title')}/>
                        <div className="Close" onClick={(event: React.MouseEvent) => this.removeNote(event, note)}></div>
                    </div>
                    <textarea className="TextArea" value={note.text} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => this.onNoteChange(event, note, 'text')}/>
                </div>
            );
        });

        return (
            <div className="NoteContainer">
                {noteEles}
                <div className="AddNote" onClick={() => this.addNote()}>
                    <div className="Plus"></div>
                </div>
            </div>
        );
    }
}

export default Notes;
