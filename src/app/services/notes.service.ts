import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient:HttpClient) { }

  baseURL:string='https://sticky-note-fe.vercel.app/';

  addNote(data:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'addNote',data)
  }

  getAllNotes(data:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'getUserNotes',data)
  }

  deleteNote(data:any):Observable<any>
  {
    let options={
      header:new HttpHeaders({}),
      body:{
        NoteID:data.NoteID,
        token:data.token
      }
    }
    return this._HttpClient.delete(this.baseURL+'deleteNote',options)
  }

  upateNote(data:any):Observable<any>
  {
    return this._HttpClient.put(this.baseURL+'updateNote',data)
  }
}
