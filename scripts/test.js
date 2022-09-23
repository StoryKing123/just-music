// const execa = require("execa");
// const fs = require("fs");
import { execa } from "execa";
import fs from "fs";
// import { Command } from "@tauri-apps/api/shell";
// const command = Command.sidecar("my-sidecar");
// const output = await command.execute();

let extension = "";
console.log(process.platform);
if (process.platform === "win32") {
    extension = ".exe";
}

async function main() {
    const rustInfo = (await execa("rustc", ["-vV"])).stdout;
    const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
    if (!targetTriple) {
        console.error("Failed to determine platform target triple");
    }
    fs.renameSync(
        `src-tauri/binaries/app${extension}`,
        `src-tauri/binaries/app-${targetTriple}${extension}`
    );
}

main().catch((e) => {
    throw e;
});
