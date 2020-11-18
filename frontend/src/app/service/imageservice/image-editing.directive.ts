import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
// import { element } from '@angular/core/src/render3';
import {element} from '@angular/core/src/render3';

// directive is a function that executes whenever the Angular compiler finds it in the DOM.
@Directive({
  selector: '[appImageEditing]'
})
export class ImageEditingDirective {
  IsMouseDown:boolean=false;
  IsMouseUp:boolean=false;
  constructor(private el:ElementRef,private render:Renderer2) { }

  @HostListener('mousedown') onmousedown(){
    console.log("mousedown")
   this.IsMouseDown=true;
   this.IsMouseUp=false;
  }
  @HostListener('mousemove') onmousemove()
  {
    console.log("mouse move");
    let Img=this.el.nativeElement;
    if(this.IsMouseDown==false)
    {
      this.render.setStyle(Img,'left',"50px");
    }

  }
  @HostListener('mouseup') onmouseup()
  {
    console.log("mouse up");
    this.IsMouseDown=false;
   this.IsMouseUp=true;
  }
}
