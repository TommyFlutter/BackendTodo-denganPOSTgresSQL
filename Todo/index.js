const Handler = require('./handler');
const todoHandler = new Handler(); 

module.exports = {
    name: "todo",
        register: async (server)  => {
        server.route([

            {
                method: "POST",
                path: "/todos",
                handler: todoHandler.addTodoHandler,
            },
            {
                method: "GET",
                path: "/todos",
                handler: todoHandler.getAllTodosHandler,
            },
            {
                method: "GET",
                path: "/todos/{id}",
                handler: todoHandler.getTodoByIdHandler,
            },
            {
                method: "DELETE",
                path: "/todos/{id}",
                handler: todoHandler.deleteTodoByIdHandler,
            },
        
        ]);
        },
    };
            

