import { FC, useState } from "react";
import ReactModal from "react-modal";
import "@/index.css";
type ModalProps = {
    onClose: Function;
};
const ModalElement: FC<ModalProps> = (props) => {
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
            // className="scroll-bar-hide"
            overlayClassName="bg-base scroll-bar-hide"
            style={{ content: { backgroundColor: "#000" } }}
        >
            {props.children}
            {/* 123 */}
        </ReactModal>
    );
    // return <div>123</div>;
};

export default ModalElement;
