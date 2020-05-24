import { remote } from "electron";
import fs from "fs";
import * as mm from "music-metadata";
const fsPromises = fs.promises;
const funcGroup = {
  async chooseFolder(): Promise<string> {
    const dialog = remote.dialog;
    return dialog.showOpenDialog({ title: "Select a folder", properties: ["openDirectory"] }).then(res => {
      return res.filePaths[0];
    });
  },
  async readFolder(path: string): Promise<FolderDes> {
    const dirName = path + "\\";
    const items = await fsPromises.readdir(dirName);
    const folders: FolderDes[] = [];
    const files: FileDes[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemPath = dirName + item;
      await fsPromises.lstat(itemPath).then(stat => {
        stat.isDirectory()
          ? folders.push({
              path: itemPath,
              name: item,
              folders: [],
              files: []
            })
          : files.push({
              path: itemPath,
              name: item,
              size: stat.size
            });
      });
    }
    return {
      name: path.split("\\").pop() as string,
      path: path,
      folders: folders,
      files: files
    };
  },
  async readMetadata(path: string): Promise<AudioDes | void> {
    return mm
      .parseFile(path)
      .then(metadata => {
        const audioInfo: AudioDes = {
          album: metadata.common.album,
          artists: metadata.common.artists,
          title: metadata.common.title,
          duration: metadata.format.duration,
          picture: metadata.common.picture?.[0].data
        };
        return audioInfo;
      })
      .catch(() => {
        // console.error(err.message);
      });
  },
  async readAudioFile(path: string): Promise<any> {
    return fsPromises.readFile(path);
  }
};
export default funcGroup;
