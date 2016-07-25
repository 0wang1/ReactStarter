import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import InputBar from './input_bar';
import * as firebasedb from '../firebasedb';

let z = 0;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };

    firebasedb.subscribeNotes((newNotes) => {
      this.setState({
        notes: Immutable.Map(newNotes),
      });
    });
    this.createNote = this.createNote.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
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

  renderNotes() {
    if (this.state.notes.size > 0) {
      return this.state.notes.entrySeq().map(([key, value]) =>
        <Note note={value} id={key} key={key}
          onUpdate={(id, fields) => { firebasedb.updateNotes(id, fields); }}
          onDelete={(id) => { firebasedb.deleteNote(id); }}
        />);
    } else {
      return false;
    }
  }
  render() {
    return (
      <div>
        <InputBar onSubmit={(text) => {
          firebasedb.createNotes(this.createNote(text));
        }} />
        {this.renderNotes()}
      </div>
    );
  }
}

export default App;
