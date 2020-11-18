import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../service/imageservice/images.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss']
})
export class OcrComponent implements OnInit {

  previewImageData: string;
  file: File;
  textAreaValue: string;
  submmited: boolean;

  constructor(private imageService: ImagesService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.submmited = false;
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {

      //Check the path of the file
      this.file = fileInput.target.files[0];
      console.log('File is', this.file);

      // Creates a reader object
      var reader = new FileReader();

      // Set the previewImageData value to the result
      reader.onload = function (e: any) {
        this.previewImageData = e.target.result;
      }.bind(this);

      // Image is read, once that's done. Onload executes
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  submit() {

    this.submmited = true;
    if (this.file && this.previewImageData) {
      
      // Log the file for debugging purpose 
      console.log(`file is ${this.file}`);

      // Call the imageservice. Pass the base64 data of the file and the File object 
      this.imageService.SendImageForOCR(this.previewImageData, this.file).subscribe((response) => {
        // Assign the result to the TextArea 
        this.textAreaValue = response.toString();        
        // Log data
        console.log(response);
      });
    }
    else {
      this.snackbar.open("No file selected", "Dismiss", {duration:2000});
    }

  }

  clear(){
    this.file = null;
    this.previewImageData = null;
    this.textAreaValue = "";
  }

}
