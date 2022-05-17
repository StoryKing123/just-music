export const isInTauri = () => {
    return window.__TAURI_IPC__ !== undefined ? true : false;
};

