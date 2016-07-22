import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import InputBar from './input_bar';
import firebase from '../firebase';

let z = 0;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };
    this.createNote = this.createNote.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }
  // Default note is created with these properties
  createNote(title) {
    return {
      title,
      text: '',
      x: 20,
      y: 20,
      zIndex: z++,
    };
  }
  // updates with position (x,y,zIndex), and editing of the note
  updateNotes(id, fields) {
    firebase.updateNotes(id, fields);
  }
  // maps through and displays all the notes
  renderNotes() {
    if (this.state.notes.size > 0) {
      return this.state.notes.entrySeq().map(([key, value]) =>
        <Note note={value} id={key} key={key} onUpdate={this.updateNotes}
          onDelete={(id) => { firebase.deleteNote(id); }}
        />);
    } else {
      return false;
    }
  }
  render() {
    return (
      <div>
        <InputBar onSubmit={(text) => {
          this.setState({
            notes: this.state.notes.set(Math.random(), this.createNote(text)),
          });
        }} />
        {this.renderNotes()}
      </div>
    );
  }
}

export default App;
