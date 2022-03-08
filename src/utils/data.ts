export const wrapPromise = (promise: any) => {
    let status = "pending";
    let result: any;
    let suspender = promise.then(
        (r: any) => {
            status = "success";
            result = r;
        },
        (e: any) => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        },
    };
};
export const extractObjectArrayAttr = (arr: any[], attr: string) => {
    const attrArr = arr.map((item) => {
        if (item.hasOwnProperty(attr)) {
            return item[attr];
        }
    });
    return attrArr;
};
