import Component from "../../helpers/Component.js";
import { getClosestElement } from "../../helpers/index.js";

class Finder extends Component {
  constructor(props) {
    super(props);
    const { parentElement } = props;
    this.renderElement = Finder.createNodesWrapper();
    parentElement.appendChild(this.renderElement);
    this.nodes = [];
    this.bindEvents();
  }

  static createNodesWrapper() {
    const nodesWrapper = document.createElement("ul");
    nodesWrapper.classList.add("finder");
    return nodesWrapper;
  }

  bindEvents() {
    this.renderElement.addEventListener("click", async (e) => {
      const targetElement = getClosestElement(e.target, "li");
      if (!targetElement) {
        return;
      }
      const type = targetElement.dataset.type;
      const nodeID = targetElement.dataset.id;
    });
  }

  set() {}
}

export default Finder;
