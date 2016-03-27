import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectTags extends Component {

  state = {
    projects: States.projects,
    currentProject: States.projects[0]
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
    Emitter.off(PROJECT_CHANGE, this.onProjectChange);
  }

  onProjectChange({currentProject}) {
    this.setState({currentProject});
  }

  render(props, {projects, currentProject}) {

    return (
      <div class="project-index">

        <span class="project-index__line"></span>
        <span class="project-index__number">0{currentProject.id + 1}</span>
        <span class="project-index__total">0{projects.length}</span>

      </div>
    );
  }

}

export default ProjectTags;