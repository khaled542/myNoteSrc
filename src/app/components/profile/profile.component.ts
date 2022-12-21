import { NotesService } from './../../services/notes.service';
import { AuthService } from './../../services/auth.service';
import { Component,OnInit} from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var $:any; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  constructor(private _AuthService:AuthService,private _NotesService:NotesService){}

  userData:any=this._AuthService.userData.getValue();
  userID:any=this.userData._id;
  userToken=localStorage.getItem('userToken');
  allNotes:any[]=[];
  noteID:any;
  isEmpty:boolean=false;
  isLoaded:boolean=false;

  addNoteForm:FormGroup=new FormGroup({
    title:new FormControl('',[Validators.required]),
    desc:new FormControl('',[Validators.required]),
  })

  updateNoteForm:FormGroup=new FormGroup({
    title:new FormControl('',[Validators.required]),
    desc:new FormControl('',[Validators.required]),
  })
  ngOnInit(): void 
  {
    this.getAllNotes();
  }

  addNote():void
  {
    let data={
      title:this.addNoteForm.value.title,
      desc:this.addNoteForm.value.desc,
      citizenID:this.userID,
      token:this.userToken
    }

    this._NotesService.addNote(data).subscribe({
      next:(response)=>
      {
        if(response.message=='success')
        {
          $('#addNote').modal('hide');
          this.addNoteForm.reset();
          this.getAllNotes();
        }
      }
    })
  }

  getAllNotes():void
  {
   let data={
      token:this.userToken,
      userID:this.userID
    }
    this._NotesService.getAllNotes(data).subscribe({
      next:(response)=>
      {
        this.allNotes=response.Notes;
        this.isLoaded=true;
        if(this.allNotes!=null && this.allNotes.length>0)
        {
          this.isEmpty=false;
        }
        else
        {
          this.isEmpty=true;
        }
      }
    })
  }

  deleteNote():void
  {
    let data={
      NoteID:this.noteID,
      token:this.userToken
    }

    this._NotesService.deleteNote(data).subscribe({
      next:(response)=>
      {
        if(response.message=='deleted')
        {
          this.getAllNotes();
          $('#deleteNote').modal('hide');
        }
      }
    })
  }

  getNoteID(id:any):void
  {
    this.noteID=id;
  }

  setUpdateForm():void
  {
    for(let i=0;i<this.allNotes.length;i++)
    {
      if(this.noteID==this.allNotes[i]._id)
      {
        this.updateNoteForm.controls['title'].setValue(this.allNotes[i].title)
        this.updateNoteForm.controls['desc'].setValue(this.allNotes[i].desc)
      }
    }
  }

  updateNote()
  {
      let data={
        token:this.userToken,
        title:this.updateNoteForm.value.title,
        desc:this.updateNoteForm.value.desc,
        NoteID:this.noteID
      }

      this._NotesService.upateNote(data).subscribe({
        next:(response)=>
        {
          if(response.message=='updated')
          {
            this.getAllNotes();
            $('#updateNote').modal('hide');
          }
        }
      })
  }
}
