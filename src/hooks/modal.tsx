import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
export const useModal = () => {
    const [visiable, setVisiable] = useState(false);
    const open = () => {
        console.log("open");
        setVisiable(true);
        createPortal(<Modal />, document.getElementById("App")!);
    };
    const close = () => {
        setVisiable(false);
    };
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
    }
    const Modal = (slotProps: any) => {
        return (
            <div>
                <Modal
                    isOpen={visiable}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={close}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button onClick={close}>close</button>
                    <div>I am a modal</div>
                </Modal>
            </div>
        );
    };
    return { open, close, visiable };
};
