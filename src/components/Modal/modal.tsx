import { FC, PropsWithChildren, useState } from "react";
import ReactModal from "react-modal";
import "@/index.css";
type ModalProps = {
    onClose: Function;
};
const ModalElement: FC<PropsWithChildren<ModalProps>> = (props) => {
    console.log("modal render");
    const [visiable, setVisiable] = useState(true);
    const handleCloseModal = () => {
        setVisiable(false);
        props.onClose();
    };
    return (
        <ReactModal
            isOpen={visiable}
            ariaHideApp={false}
            shouldCloseOnEsc={true}
            onRequestClose={handleCloseModal}
            className={{ afterOpen: "abc", base: "aaa", beforeClose: "bbb" }}
            overlayClassName="bg-base scroll-bar-hide"
            style={{
                content: { backgroundColor: "#000" },
                overlay: { backgroundColor: "blue" },
            }}
        >
            {props.children}
        </ReactModal>
    );
    // return <div>123</div>;
};

export default ModalElement;
