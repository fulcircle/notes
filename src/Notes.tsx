import React, { Component } from 'react';
import './Notes.scss';

class Notes extends Component {
    render() {
        return (
            <div className="Notes">
                <div className="NoteContainer">
                    <div className="Note">
                        <div className="Close"></div>
                        <textarea className="TextArea"/>
                    </div>
                    <div className="Note">
                        <textarea className="TextArea"/>
                    </div>
                    <div className="Note">
                        <textarea className="TextArea"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notes;
