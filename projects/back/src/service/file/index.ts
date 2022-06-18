import fs from 'fs';
import path, { basename, dirname } from 'path';
import { PathLike } from 'fs-extra';

const GRAPHQL_FILE_EXTENSION = 'graphql';

class FileService {
    /**
     * @param {string} resolverPath The resolver path
     * @param {string[]} excludedFolders excluded folders
     * @returns {object}
     */
    getGraphQLResolversFromPath(resolverPath: string, excludedFolders?: string[]) {
        return this
            .getAllFilePathsFromFolder(resolverPath)
            .filter((filePath) =>
                filePath.indexOf('.map') === -1 // build map
                && !excludedFolders?.find((excludedFolder) => filePath.includes(excludedFolder)),
            )
            .reduce((results, mutationPath) => {
                const file = require(mutationPath);
                const resolver = file.default || file;
                let resolverName = basename(mutationPath).replace('.js', '').replace('.ts', '');

                if (resolverName === 'index') {
                    resolverName = dirname(mutationPath).split('/').pop() as string;
                }

                return { ...results, [resolverName]: resolver };
            }, {});
    }

    /**
     * Recursive method to get all files from selected folder path
     */
    getAllFilePathsFromFolder(folderPath: string): string[] {
        return fs.readdirSync(folderPath as PathLike).reduce((acc: string[], filename: string) => {
            const dirPath: string = path.join(folderPath, filename);
            const isDirectory: boolean = fs.statSync(dirPath).isDirectory();
            const files: string[] = isDirectory ? this.getAllFilePathsFromFolder(dirPath) : [dirPath];
            return [...acc, ...files];
        }, []);
    }

    /**
     * Get all graphql schema from path
     * @param {string} schemaPath Graphql Schema Path
     * @returns {string}
     */
    getGraphQLSchemaFromPath(schemaPath: string): string {
        return this.getAllFilePathsFromFolder(schemaPath)
            .filter((schemaFile) => schemaFile.includes(`.${GRAPHQL_FILE_EXTENSION}`))
            .map((schemaFile) => fs.readFileSync(schemaFile, 'utf8'))
            .reduce((result, schemaContent) => `${result}${schemaContent}\n`, '');
    }
}

export default new FileService();
