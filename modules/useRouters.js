const fs = require('fs');

function useRouters(app, routerDir) {
  const files = fs.readdirSync(routerDir);
  files.forEach((file) => {
    const filePath = `${routerDir}/${file}`;
    const routePath = `/${file.split('.js').shift()}`;
    console.log(`${filePath} is used for route ${routePath}`);
    app.use(routePath, require(filePath));
  });
}

module.exports = useRouters;
