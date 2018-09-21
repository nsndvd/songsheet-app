import { Injectable } from '@angular/core';
import { UtilMap, Optional } from '@nilsroesel/utils';
import * as fs from 'fs';
import { extname } from 'path';
import * as diff from 'diff';
import { Song } from '../models/song';
import { Stream } from 'stream';

@Injectable()
export class FileManagerService {

  private fileMap: UtilMap<string, Song>;

  static write(targetPath: string, inputData: Promise<Stream>) {
    if(inputData) {
      inputData.then(stream => {
        stream.pipe( fs.createWriteStream(targetPath))
      }).catch(err => {});
    }
  }
  /**
   * Tries to read a file and parse it to json. Will return the json object or null on error.
   * @param path to the file
   * @return either the json object from the file or null on error
   */
  private static readJson(path: string): any {
    try {
      const data = fs.readFileSync(path, 'utf8');
      return JSON.parse(data);
    } catch(err) { return null; }
  }

  private dirReader(dirPath: string) {
    fs.readdirSync(dirPath).forEach(entry => {
      const entryPath = dirPath + '/' + entry;
      if(fs.statSync(entryPath).isDirectory()) this.dirReader(entryPath);
      else if(extname(entryPath) === '.song') this.fileMap.set(entryPath, null);
    });
  }

  loadFiles(path: string): void {
    this.dirReader(path);
    this.fileMap = this.fileMap
      .map((value, key) => fs.readFileSync(key, 'utf8'))
      .map(((value) => {
        try {
          const object = JSON.parse(value);
          if(Song.isDefinedNonNullSong(object)) return Song.from(object);
          else return null;
        } catch(err) { return null; }
      }))
      .filter((value => !!value));
  }

  /**
   * Return all file paths in the base directory
   */
  list(): Array<string> { return Array.from(this.fileMap, fileMap => fileMap[0]); }

  getFile(path: string): Song { return this.fileMap.get(path); }

  deleteFile(path: string): void {
    if(this.fileMap.has(path)) {
      fs.unlink(path);
      this.fileMap.delete(path);
    }
  }

  write(path: string, document: Song): void {
    Optional
      .ofNullable(this.fileMap.get(path))
      .ifPresent((song: Song) => {
        // Check if changes were made after loading
        Optional
          .ofNullable(FileManagerService.readJson(path))
          .ifPresent(object => {
            diff.diffJson(song, object)
          });

        fs.writeFileSync(path, JSON.stringify(document));
        this.fileMap.set(path, document);
      });
  }

}
