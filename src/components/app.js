import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import InputBar from './input_bar';

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

  createNote(title) {
    return {
      title,
      text: '',
      x: 20,
      y: 20,
      zIndex: z++,
    };
  }
  updateNotes(id, fields) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }
  renderNotes() {
    if (this.state.notes.size > 0) {
      return this.state.notes.entrySeq().map(([key, value]) =>
        <Note note={value} id={key} onUpdate={this.updateNotes}
          onDelete={(id) => { this.setState({ notes: this.state.notes.delete(id) }); }}
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
