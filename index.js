const fs = require('fs-extra')

const rg = async (config = Object) => {
    try {

        let template = 
`
${config.modules.map(mdl => `\nconst ${mdl.name}Controller = require("../controllers/${mdl.name.charAt(0).toUpperCase() + mdl.name.slice(1)}")`).join('')}

let routes = [
    // {
    //     route: '',
    //     type: '',
    //     middlewares: ,
    //     controller: ,
    // }
    {
        route: '/register',
        type: 'post',
        middlewares: usersController['postBasic']['middlewares'],
        controler: usersController.postBasic.controller
    },
    {
        route: '/login',
        type: 'post',
        middlewares: usersController['login']['middlewares'],
        controler: usersController['login']['controller']
    },
    {
        route: '/login/admin',
        type: 'post',
        middlewares: usersController['loginAdmin']['middlewares'],
        controler: usersController['loginAdmin']['controller']
    },
    ${
     config.modules.map(mdl => 
        `
            {
                route: '/${mdl.name}',
                type: 'post',
                middlewares: ${mdl.name}Controller['post']['middlewares'],
                controller: ${mdl.name}Controller['post']['controller']
            },
            {
                route: '/${mdl.name}',
                type: 'get',
                middlewares: ${mdl.name}Controller['getList']['middlewares'],
                controller: ${mdl.name}Controller['getList']['controller']
            },
            {
                route: '/${mdl.name}/:id',
                type: 'get',
                middlewares: ${mdl.name}Controller['getDetail']['middlewares'],
                controller: ${mdl.name}Controller['getDetail']['controller']
            },
            {
                route: '/${mdl.name}/:id',
                type: 'put',
                middlewares: ${mdl.name}Controller['put']['middlewares'],
                controller: ${mdl.name}Controller['put']['controller']
            },
            {
                route: '/${mdl.name}/:id',
                type: 'delete',
                middlewares: ${mdl.name}Controller['delete']['middlewares'],
                controller: ${mdl.name}Controller['delete']['controller']
            }`
        )
    }

]

module.exports = routes
`
    fs.writeFileSync(`backend/src/routes/routes.js`, template)

    console.log('🟥 Selph - Back-End routes updated...')
    } catch (error) {
        throw error
    }
}

module.exports = rg
