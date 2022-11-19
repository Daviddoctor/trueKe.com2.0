const { response } = require("express");
const { google } = require("googleapis");

/**Credenciales de acceso para googleSheet */
const oAuth2Client = new google.auth.OAuth2(
    "769333765825-2lu1sbcu3vtdmf9i6umvgdc6ukja9m04.apps.googleusercontent.com",
    "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",
    "http://localhost"
);

/**Información de Token para googleSheet */
oAuth2Client.setCredentials({
    type: "authorized_user",
    client_id: "769333765825-2lu1sbcu3vtdmf9i6umvgdc6ukja9m04.apps.googleusercontent.com",
    client_secret: "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",
    refresh_token: "1//05Zdy9G8grHXcCgYIARAAGAUSNwF-L9IrpCXU9rAWzRB7G9o24jxQNEh2zAb60nzLKkcuNUJrMv8IqUNuSmeJAMRX9XiYH5G5zYQ"
});

const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

/**Lectura de la Sheet de almacenamiento de variables */
async function read() {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "1lDEJoeQWSUo76VqjmOzg0_EWaMXel9zB5kW3ifc6LiE",
        range: "Products!A2:F",
    });

    /**Información de los productos dentro de la BD */
    const rows = response.data.values;
    const products = rows.map((row) => ({
        id: +row[0],
        name: row[1],
        price: +row[2],
        image: row[3],
        stock: +row[4],
        category: row[5],
    }));

    return products;
}

async function write(products) {
    /**Matriz para convertir los productos en un arreglo */
    let values = products.map((p) => [p.id, p.name, p.price, p.image, p.stock, p.category]);

    const resource = {
        values,
    };
    const result = await sheets.spreadsheets.values.update({
        spreadsheetId: "1lDEJoeQWSUo76VqjmOzg0_EWaMXel9zB5kW3ifc6LiE",
        range: "Products!A2:F",
        valueInputOption: "RAW",
        resource,
    });
    console.log(result);
}

/**Schema para almacenar las ordenes en la BD "GoogleSheets" */

async function writeOrders(orders) {
    let values = orders.map((order) => [
        order.date,
        order.preferenceId,
        order.shipping.name,
        order.shipping.email,
        JSON.stringify(order.items),
        JSON.stringify(order.shipping),
        order.status,
    ]);

    const resource = {
        values,
    };
    const result = await sheets.spreadsheets.values.update({
        spreadsheetId: "1lDEJoeQWSUo76VqjmOzg0_EWaMXel9zB5kW3ifc6LiE",
        range: "Orders!A2:G",
        valueInputOption: "RAW",
        resource,
    });
}
/**Leer las ordenes y las almacena en BD */
async function readOrders() {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "1lDEJoeQWSUo76VqjmOzg0_EWaMXel9zB5kW3ifc6LiE",
        range: "Orders!A2:G",
    });

    const rows = response.data.values || [];
    const orders = rows.map((row) => ({
        date: row[0],
        preferenceId: row[1],
        name: row[2],
        email: row[3],
        items: JSON.parse(row[4]),
        shipping: JSON.parse(row[5]),
        status: row[6],
    }));

    return orders;
}
async function updateOrderByPreferenceId(preferenceId, status) {
    const orders = await readOrders();
    const order = orders.find(o => o.preferenceId === preferenceId)
    order.status = status;
    await writeOrders(orders);
}

module.exports = {
    read,
    write,
    writeOrders,
    updateOrderByPreferenceId,
    readOrders,
};