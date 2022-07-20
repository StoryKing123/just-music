import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import ModalElement from "./modal";

//  class Modal {
//     private container?: HTMLDivElement;

//     constructor(private id: string) {
//         this.initContainer();
//     }

//     initContainer() {
//         const container = document.createElement("div");
//         document.body.appendChild(container);
//         this.container = container;
//     }
//     open() {
//         console.log(this.container);
//     }
// }
// export default  Modal;

class Modal {
    private container?: HTMLDivElement;
    constructor(private id: string) {
        this.initContainer();
    }
    private initContainer() {
        console.log("init container");
        if (document.getElementById(this.id)) return;
        const element = document.createElement("div");
        element.setAttribute("id", this.id);
        document.body.appendChild(element);
        this.container = element;
        // this.abc = 123;
    }
    open(config: { content: ReactElement }) {
        // console.log(this.container);
        // if (!this.container) this.initContainer();
        // console.log(this.container);
        // ReactDOM.render(React.createElement(App), this.container);
        // ReactDOM.render(<App />, document.getElementById("root"));
        ReactDOM.render(
            <ModalElement onClose={this.close.bind(this)}>
                {config.content}
            </ModalElement>,
            this.container!
        );
    }

    close() {
        ReactDOM.unmountComponentAtNode(this.container!);
    }
}
export default Modal;
