import { readdirSync, statSync } from 'fs';
import { Application } from 'express';
import { parse, resolve } from 'path';

const isDirectory = (path: string) => statSync(path).isDirectory();

function getAllRoutesFiles(directory: string) {
  const files = readdirSync(directory);

  const routerFiles: string[] = [];

  files.forEach((fileName) => {
    const filePath = `${directory}/${fileName}`;

    if (isDirectory(filePath)) {
      const directoryFiles = getAllRoutesFiles(filePath);

      routerFiles.push(...directoryFiles);
    } else {
      routerFiles.push(filePath);
    }
  });

  return routerFiles;
}

export default async function defineRoutes(app: Application, basePath: string) {
  const promises = getAllRoutesFiles(basePath)
    .filter((filePath) => {
      const fileName = parse(filePath).base;
      return filePath.indexOf('.') !== 0 && (fileName === 'routes.ts' || fileName === 'routes.js');
    })
    .map(async (filePath) => {
      const modulePath = resolve(basePath, filePath);
      const routeModule = (await import(modulePath)).default;
      app.use(routeModule.basePath, routeModule.router);
    });

  await Promise.all(promises);
}
