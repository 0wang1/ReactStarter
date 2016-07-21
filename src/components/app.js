import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import InputBar from './input_bar';

let count = 0;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };
    this.createNote = this.createNote.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  // componentWillMount() {
  //   this.setState({
  //     notes: this.state.notes.set(count++, this.createNote('hello')),
  //
  //   });
  // }
  createNote(title) {
    return {
      title,
      text: '',
      x: 20,
      y: 20,
      zIndex: 0,
    };
  }

  renderNotes() {
    if (this.state.notes.size > 0) {
      return this.state.notes.entrySeq().map(([key, value]) =>
        <Note note={value} id={key} onDelete={(id) => { this.state.notes.delete(id); }} />);
    }
  }
  render() {
    // const ren = this.state.notes.entrySeq().map(([key, value]) => <Note note={value} id={key} />);
    console.log(this.state.notes);
    return (
      <div>
        <InputBar onSubmit={(text) => {
          this.state.notes.set(count++, this.createNote(text));
        }} />
        {this.renderNotes()}
      </div>
    );
  }
}

export default App;
