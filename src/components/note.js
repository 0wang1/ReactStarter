import Draggable from 'react-draggable';
import React, { Component } from 'react';
import marked from 'marked';
class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: true,
    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onIconChange = this.onIconChange.bind(this);
    this.notebody = this.noteBody.bind(this);
  }
  // Sends up Id to app to find and delete
  onDeleteClick() {
    this.props.onDelete(this.props.id);
  }
  // Only job is to change the icon
  onIconChange() {
    if (this.state.isEditing) {
      return <i className="fa fa-check-square-o" onClick={this.onEditClick} />;
    } else {
      return <i className="fa fa-pencil-square-o" onClick={this.onEditClick} />;
    }
  }
  // Actually does the edit option to disable or enable the textarea
  onEditClick() {
    if (this.state.isEditing) {
      this.setState({
        isEditing: false,
      });
    } else {
      this.setState({
        isEditing: true,
      });
    }
  }
  // Passed up to App to update with content
  onTextChange(event) {
    this.props.onUpdate(this.props.id, { text: event.target.value });
  }
  // Passed up to App to update with coordinates
  onDrag(event, ui) {
    this.props.onUpdate(this.props.id, { x: ui.x, y: ui.y });
  }

  noteBody() {
    if (this.state.isEditing) {
      return <textarea id="textspace" onChange={this.onTextChange} />;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />;
    }
  }

  render() {
    const { title, x, y, zIndex } = this.props.note;
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20, zIndex: 0 }}
        position={{ x, y, zIndex }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note">
          <h1>{title}
            <i className="fa fa-trash-o" onClick={this.onDeleteClick} />
            <i className="fa fa-arrows-alt note-mover"></i>
            {this.onIconChange()}
          </h1>
          {this.noteBody()}
        </div>
      </Draggable>
    );
  }
}
export default Note;
