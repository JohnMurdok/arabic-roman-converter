import fs from 'fs';
import fileService from '@services/file';
jest.mock('fs');

const readdirSyncMock = fs.readdirSync as unknown as jest.Mock<string[]>;
const statSyncMock = fs.statSync as unknown as jest.Mock<Object>;
const readFileSyncMock = fs.readFileSync as unknown as jest.Mock<String>;

describe('[SERVICE] FileService - getAllFilePathsFromFolder()', () => {
    test('should return an array of string from path', () => {
        readdirSyncMock.mockReturnValueOnce(['/test.txt', '/graphql'])
            .mockReturnValueOnce(['/test.graphql']);
        statSyncMock.mockReturnValueOnce(({ isDirectory: () => false }))
            .mockReturnValueOnce(({ isDirectory: () => true }))
            .mockReturnValueOnce(({ isDirectory: () => false }));
        
        const filePaths = fileService.getAllFilePathsFromFolder('/');
        expect(filePaths).toEqual(['/test.txt', '/graphql/test.graphql']);
        expect(readdirSyncMock).toHaveBeenCalledTimes(2);
        expect(readdirSyncMock).toHaveBeenCalledWith('/');
        expect(readdirSyncMock).toHaveBeenCalledWith('/graphql');
    });
});


describe('[SERVICE] FileService - getGraphQLSchemaFromPath()', () => {
    const getAllFilePathsFromFolderMock = jest.spyOn(fileService, 'getAllFilePathsFromFolder');

    test('should return file content', () => {
        getAllFilePathsFromFolderMock.mockReturnValue(['/test.txt', '/graphql/schema.graphql']);
        readFileSyncMock.mockReturnValue('type Test {}');
        
        const schema = fileService.getGraphQLSchemaFromPath('/');
        expect(schema).toEqual('type Test {}\n');
        expect(readFileSyncMock).toHaveBeenCalledTimes(1);
        expect(readFileSyncMock).toHaveBeenCalledWith('/graphql/schema.graphql', 'utf8');
    });
});
