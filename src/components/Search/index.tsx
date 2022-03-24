import { FC } from "react";

type SearchProps = {
    isShow: boolean;
};
const Search: FC<SearchProps> = (props) => {
    return (
        <div style={{ visibility: props.isShow ? "visible" : "hidden" }}>
            <input type="text" />
        </div>
    );
};

export default Search;
