import React, { Component } from 'react';
import './Notes.scss';

type Note = {
    id: string,
    title: string,
    text: string,
    color: string
}
type NotesState = {
    notes: Array<Note>
}

const COLORS = [
    {color: '#f4f3f3', display: 'white'},
    {color: '#dfdfdf', display: 'gray'},
    {color: '#bfd8d5', display: 'green'},
    {color: '#b1bed5', display: 'blue'}
];

class Notes extends Component<{}, NotesState> {

    constructor(props: any) {
        super(props);
        this.state = {notes: [{id: this.guid, title: "Untitled Note", text: "", color: this.randomColor.color}]}
    }

    get guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    get randomColor() {
        let n = COLORS.length;
        let index = Math.floor(Math.random() * n);
        return COLORS[index];
    }

    addNote() {
        const notes = [...this.state.notes];
        notes.push({id: this.guid, title: "Untitled Note", text:"", color: this.randomColor.color});
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

    onNoteChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>, note: Note, prop: string) {
        const value = event.target.value;
        const notes = [...this.state.notes];

        const index = notes.findIndex((thisNote: Note) => {
            return thisNote == note;
        });

        if (prop === 'text') {
            notes[index].text = value;
        } else if (prop === 'title') {
            notes[index].title = value;
        } else if (prop === 'color') {
            notes[index].color = value;
        }

        this.setState({notes: notes});
    }


    render() {

        const colorEles = COLORS.map((color: any) => {
            return (<option value={color.color}>{color.display}</option>)
        });

        const noteEles = this.state.notes.map((note: Note) => {
            return (
                <div key={note.id} className="Note" style={{backgroundColor: note.color}}>
                    <div className="Header">
                        <input className="Title" value={note.title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onNoteChange(event, note, 'title')}/>
                        <div className="Close" onClick={(event: React.MouseEvent) => this.removeNote(event, note)}></div>
                    </div>
                    <textarea className="TextArea" value={note.text} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => this.onNoteChange(event, note, 'text')}/>
                    <select value={note.color} className="Colors" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => this.onNoteChange(event, note, 'color')}>
                        {colorEles}
                    </select>
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
