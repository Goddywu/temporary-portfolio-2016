import { h, Component } from 'preact';

import debounce from 'lodash.debounce';

import States from 'core/States';

import Emitter from 'core/Emitter';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectLetters extends Component {

  state = {
    currentProject: States.currentProject
  }

  constructor() {
    super();

  }

  componentWillMount() {
    this.bind();
  }

  componentDidMount() {

    this.addListerners();
  }

  componentWillUnmount() {

    this.removeListerners();
  }

  bind() {
    this.onProjectChange = this.onProjectChange.bind(this);
  }

  addListerners() {
    Emitter.on(PROJECT_CHANGE, this.onProjectChange);
  }

  removeListerners() {

  }

  onProjectChange(currentProject) {
    this.setState({ currentProject });
  }


  render(props, state) {
    return (
      <span class="project-letter">
        {props.letter}
      </span>
    );
  }

}

export default ProjectLetters;