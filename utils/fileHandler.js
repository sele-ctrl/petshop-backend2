const fs = require("fs").promises;
const path = require("path");

const filePath = (name) => path.join(__dirname, "../data", name);

async function leerJSON(nombreArchivo) {
    const data = await fs.readFile(filePath(nombreArchivo), "utf-8");
    return JSON.parse(data);
}

async function guardarJSON(nombreArchivo, data) {
    await fs.writeFile(filePath(nombreArchivo), JSON.stringify(data, null, 2));
}

module.exports = { leerJSON, guardarJSON };
