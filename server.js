	require("dotenv").config();
    
    const Hapi = require("@hapi/hapi");
    
    const TodoPlugin = require("./Todo");
	 
	const init = async () => {
	    const server = Hapi.server({
	        port: 5000,
	        host: '0.0.0.0',
            routes: {
                cors: {
                    origin: ["*"],
                },
            },
	    });
    
        await server.register({
            plugin: TodoPlugin,
        });
	 
	    await server.start();
	    console.log(`Server berjalan pada ${server.info.port}`);
	};
	 
	init();
