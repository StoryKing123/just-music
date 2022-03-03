export type Mod = string | { [key: string]: any };
export type Mods = Mod | Mod[];

function genBem(name: string, mods?: Mods): string {
    if (!mods) {
        return "";
    }

    if (typeof mods === "string") {
        return ` ${name}--${mods}`;
    }

    if (Array.isArray(mods)) {
        return mods.reduce<string>((ret, item) => ret + genBem(name, item), "");
    }

    return Object.keys(mods).reduce(
        (ret, key) => ret + (mods[key] ? genBem(name, key) : ""),
        ""
    );
}

export function createBEM(name: string) {
    return (el?: Mods, mods?: Mods): Mods => {
        if (el && typeof el !== "string") {
            mods = el;
            el = "";
        }

        el = el ? `${name}__${el}` : name;

        return `${el}${genBem(el, mods)}`;
    };
}

export type BEM = ReturnType<typeof createBEM>;

export function createNamespace(name: string) {
    const prefixedName = `van-${name}`;
    return [
        prefixedName,
        createBEM(prefixedName)
    ] as const;
}
