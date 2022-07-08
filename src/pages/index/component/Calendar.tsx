import { FC } from "react";
import calendarSvg from "@/assets/icons/calendar.svg";
import PlayListCard from "@/components/PlayListCard";
import { useNavigate } from "react-router";

type CalendarType = {
    text: "now" | string;
    className: string;
    cover: string | "blank";
};

const Calendar: FC<CalendarType> = (props) => {
    const navigate = useNavigate();
    return (
        <div className={`${props.className ?? ""} relative`}>
            <PlayListCard
                className="w-full"
                cover={props.cover}
                blur
                onClick={() => navigate("/recommend")}
                title="每日推荐"
                key="daily"
            >
                <div className="absolute z-20 w-full h-full   ">
                    <div
                        className=" block text-bg left-1/2 absolute top-1/2  -translate-x-1/2   "
                        style={{ fontSize: "2rem" }}
                    >
                        {new Date().getDate()}
                    </div>
                    <img
                        src={calendarSvg}
                        className="absolute w-3/5  left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 "
                        alt=""
                    />
                </div>
            </PlayListCard>
        </div>
    );
};

export default Calendar;
