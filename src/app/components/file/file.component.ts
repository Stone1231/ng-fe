import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file',
  providers: [FileService],
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  file1: File;
  file2: File;
  files: File[];
  fileNames: Array<string>;

  ngOnInit() {}
  constructor(private service: FileService) { }

  getFile1(e: any) {
    this.file1 = e.target.files[0];
  }

  getFile2(e: any) {
    this.file2 = e.target.files[0];
  }

  getFiles(e: any) {
    this.files = e.target.files;
  }

  saveFile1() {
    const fileOb = this.service.postFile(this.file1);
    fileOb.subscribe(
      res => {
        this.fileNames = [];
        this.fileNames.push(res);
      }
      );
  }

  saveFile2() {
    const fileOb = this.service.postFile2(this.file1, this.file2);
    fileOb.subscribe(
      res => {
        this.fileNames = res;
      }
      );
  }

  saveFiles() {
    const fileOb = this.service.postFiles(this.files);
    fileOb.subscribe(
      res => {
        this.fileNames = res;
      }
      );
  }
}
