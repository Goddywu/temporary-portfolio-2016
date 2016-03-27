import { h, Component } from 'preact';

import Emitter from 'core/Emitter';
import States from 'core/States';

import {
  PROJECT_CHANGE
} from 'config/messages';

class ProjectNavigation extends Component {

  state = {
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

    this.base.classList.add(`project-navigation--${this.state.currentProject.ref}`);
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
    this.setState({ currentProject });
    this.base.className = "project-navigation";
    this.base.classList.add(`project-navigation--${this.state.currentProject.ref}`);
  }

  previousProject() {
    States.currentProjectIndex = (States.currentProjectIndex > 0) ? States.currentProjectIndex - 1 : States.projectsNb - 1;
    Emitter.emit(PROJECT_CHANGE, {
      currentProject: States.projects[States.currentProjectIndex],
      direction: -1
    });
  }

  nextProject() {
    States.currentProjectIndex = (States.currentProjectIndex < States.projectsNb - 1) ? States.currentProjectIndex + 1 : 0;
    Emitter.emit(PROJECT_CHANGE, {
      currentProject: States.projects[States.currentProjectIndex],
      direction: 1
    });
  }

  render(props, state) {

    return (
      <div class="project-navigation">
        <button
          class="project-navigation__el project-navigation__el--previous"
          onClick={ this.previousProject }
        >
          <span class="project-navigation__el-line"></span>
          <span class="project-navigation__el-text">Previous</span>
          <span class="project-navigation__el-icon icon icon-chevron-thin-left"></span>
        </button>

        <button
          class="project-navigation__el project-navigation__el--next"
          onClick={ this.nextProject }
        >
          <span class="project-navigation__el-line"></span>
          <span class="project-navigation__el-text">Next</span>
          <span class="project-navigation__el-icon icon icon-chevron-thin-right"></span>
        </button>

      </div>
    );
  }

}

export default ProjectNavigation;