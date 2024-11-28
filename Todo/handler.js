const crypto = require("crypto");
const { Pool } = require("pg");

class todoHandler {
    constructor() {
        this._pool = new Pool();

        this.addTodoHandler = this.addTodoHandler.bind(this);
        this.getAllTodosHandler = this.getAllTodosHandler.bind(this);
        this.getTodoByIdHandler = this.getTodoByIdHandler.bind(this);
        this.deleteTodoByIdHandler = this.deleteTodoByIdHandler.bind(this);

    }

    async addTodoHandler(request, h) {
        const { description } = request.payload;

        const result = await this._pool.query({
            text: "INSERT INTO todos (id, description) VALUES ($$2) RETURNING id",
        values: [crypto.randomUUID(), description],
       });

       if(!result.row[0].id) {
        throw new Error("Todo gagal ditambahkan");
       }
       return h
       .response({
        status: "success",
        message: "Todo berhasil ditambahkan",
        data: {
            todoId: result.rows[0].id,
        },
       })
       .code(201);
    }

    async getAllTodosHandler(request, h) {
        const result = await this.pool.query("SELECT * FROM todos");

        if  (!result.rows.length) {
            throw new Error("Tidak ada todo saat ini");
        }

        return h
        .response({
            status: "success",
            data: {
                todos: result.rows,
            },
        })
        .code(200);
    }

    async getTodoByIdHandler(request, h) {
        const { id } = request.params;

        const result = await this._pool.query("SELECT * FROM todos WHERE id = $1", [
            id,
        ]);
        
        if (!result.rows.length) {
            throw new Error("Todo tidak ditemukan");
        }

        return h
        .response({
            status: "success",
            data: {
                todo: result.rows[0],
            },
        })
        .code(200);
    }

    async deleteTodoByIdHandler(request, h) {
        const { id } = request.params;

        const result = await this.pool.query({
            text: "DELETE FROM todos WHERE id = $1 RETURNING id",
            values: [id],
        });

        if (!result.row.length) {
            throw new Error("Todo tidak ditemukan");
        }

        return h
        .response({
            status: "success",
            message: "Todo berhasil dihapus",
        })
        .code(200);
    }

}
module.exports = todoHandler;