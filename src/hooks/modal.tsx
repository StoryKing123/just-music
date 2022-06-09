import React, { FC, useCallback, useRef, useState } from "react";
import ReactDOM, { createPortal } from "react-dom";
import ReactModal, { Props } from "react-modal";

type ModalProps = {} & Props;
// export const useModal = (props: ModalProps) => {
//     const domRef = useRef<any>(null);
//     const open = useCallback(() => {
//         const root = document.body;
//         if (!domRef.current) {
//             domRef.current = document.createElement("div");
//             root.appendChild(domRef.current);
//         }
//         const dom = domRef.current;
//         const Ele: FC = () => {
//             const [visiable, setVisiable] = useState(true);
//             return (
//                 <ReactModal
//                     isOpen={visiable}
//                     appElement={document.getElementById("modal")!}
//                 >
//                     1231312
//                 </ReactModal>
//             );
//         };
//         ReactDOM.render(<Ele></Ele>, dom);
//     }, [props]);
//     const close = useCallback(() => {
//         const dom = domRef.current;
//         ReactDOM.unmountComponentAtNode(dom!);
//         if (dom && dom.parentNode) {
//             dom.parentNode.removeChild(dom);
//         }
//     }, [props]);
//     return { open, close };
// };
// const customStyles = {
//     content: {
//         top: "50%",
//         left: "50%",
//         right: "auto",
//         bottom: "auto",
//         marginRight: "-50%",
//         transform: "translate(-50%, -50%)",
//     },
// };
type useModalProp = {
    content: any;
};
export const useModal = (props: useModalProp) => {
    const [visiable, setVisiable] = useState(false);
    const open = () => {
        console.log("open");
        setVisiable(true);
    };
    const close = () => {
        setVisiable(false);
    };
    function afterOpenModal() {}
    const Modal = (slotProps: any) => {
        return (
            <div>
                <ReactModal
                    isOpen={visiable}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={close}
                    overlayClassName="fixed flex justify-content items-center inset-0 backdrop-blur-sm  "
                    className="bg-search z-50 scroll-bar-hide text-base overflow-scroll  rounded-md  w-1/2 h-3/4 translate-x-1/2  py-6 outline-0"
                >
                    {props.content}
                </ReactModal>
            </div>
        );
    };
    return { open, close, visiable, Modal };
};
