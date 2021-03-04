import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import * as whatsappChatParser from 'whatsapp-chat-parser';
import { PostdetailsService } from './postdetails.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedFile: any;
  csvRecords: any[] = [];
  k = 1;
  isEditing: boolean[] = [];
  updateButton: string[] = [];
  constructor(private postdetails: PostdetailsService, private meta: Meta) {}

  ngOnInit(): void {}

  onFileSelect(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = reader.result.toString().trim();
      console.log(text);
      //calling the whatsapp parser with the text file data
      this.whatsappParser(text);
    };
    reader.readAsText(this.selectedFile);
  }
  whatsappParser(textData: String) {
    let requiredKeyset = ['date', 'user_id', 'title', 'description', 'url'];
    whatsappChatParser
      .parseString(textData + '')
      .then((messages) => {
        for (let index in messages) {
          //properties of each message
          // console.log(messages[index].author);
          // console.log(messages[index].date);
          // console.log(messages[index].message);
          // console.log(messages[index].attachment);
          const keysets = Object.keys(messages[index]);
          for (const key in keysets) {
            messages[index] = JSON.parse(
              JSON.stringify(messages[index]).replace(
                keysets[key],
                requiredKeyset[key]
              )
            );
          }
          let value = JSON.parse(JSON.stringify(messages[index]));
          let i: number = value.title.indexOf(' ');
          if (i == -1) {
            value.description = value.title;
          } else {
            value.description = value.title.slice(i);
          }
          value.title = value.title.split(' ', 1)[0];
          this.updateButton[this.k - 1] = 'Edit';
          this.isEditing[this.k - 1] = true;
          this.csvRecords[this.k - 1] = value;
          value.tbl_id = this.k + '';
          //this.create(value,k-1);
          this.k++;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  submitBtn(data: any) {
    //
    this.meta.addTag({ name: 'description', content: 'example description' });

    this.meta.updateTag({
      property: 'og:description',
      content: data.description,
    });
    this.meta.addTag({
      property: 'og:title',
      content: data.title,
    });
    console.log(data, 'data');
    this.postdetails.setNewpostInfo(data);
  }
}
