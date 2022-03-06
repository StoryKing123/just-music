export enum THEME {
    LIGHT = "light",
    DARK = "dark",
}
const THEME_KEY = "theme";
export const setTheme = (theme: THEME) => {
    const element = document.getElementById("App");
    element?.classList.remove(
        `${THEME_KEY}-${theme === THEME.DARK ? THEME.LIGHT : THEME.DARK}`
    );
    element?.classList.add(`${THEME_KEY}-${theme}`);
    localStorage.setItem(THEME_KEY, theme);
};

export const initTheme = (): THEME => {
    const theme = (localStorage.getItem(THEME_KEY) as THEME) ?? THEME.DARK;
    setTheme(theme);
    return theme;
};
export const getTheme = (): THEME => {
    return localStorage.getItem(THEME_KEY) as THEME;
};
