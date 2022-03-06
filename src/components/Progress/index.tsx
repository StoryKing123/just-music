import { FC } from "react";

const Progress: FC = (props) => {
    
    return (
        <div className="absolute top-0 w-full h-0.5 bg-progress-whole">
            <div className=" w-1/2 bg-progress-current h-full"></div>
        </div>
    );
};
export default Progress;
