import { AfterViewInit, Component, Input, OnInit, Renderer2, input } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent implements AfterViewInit {

  loadElement: string;
  elementToBeShown: any;
  content: string;

  constructor(private translator: TranslocoService, private renderer: Renderer2) { }

  public show(position: { x: number, y: number }) {
    var content = document.getElementById("mydiv") as HTMLDivElement;
     this.renderer.setStyle(content, 'left', `${position.x}px`);
    this.renderer.setStyle(content, 'top', `${position.y}px`);
    this.renderer.removeClass(content, 'visually-hidden');
  }

  public hide() {
    var content = document.getElementById("mydiv") as HTMLDivElement;
    content.classList.add('visually-hidden');
  }

  public setTitle(title: string) {
    let elem = document.getElementById('mydivheader-content');

    elem?.replaceChildren(title);
  }

  public showObject(data: any) {
    this.content = '';
    let props = Object.entries(data);
    for (let index = 0; index < props.length; index++) {
      let newDiv = this.addAnotherRowIn(props[index][0], props[index][1] as string)
      if (newDiv !== undefined)
        this.content += '\n' + newDiv;
    }
  }

  addAnotherRowIn(lable: string, value: string) {

    let j = moment(value, true)
    if (j.unix() > 1000000 && j.isValid()) {
      let html = `<div class="row">
    <div class="col-4 text-black">${this.translator.translate(lable)}</div>
    <div class="col-6 text-info">${j.toString()}</div>
     <div class="row">
       <hr class="hr"/>
     </div>
    </div>`;
      this.content += html;
    }
    else {
      let html = `<div class="row">
    <div class="col-4 text-black">${this.translator.translate(lable)}</div>
    <div class="col-6 text-info">${value}</div>
     <div class="row">
       <hr class="hr"/>
     </div>
    </div>`;
      this.content += html;
    }


  }

  @Input() objectToBeingShown: any;

  bindableProps: [string, string][];


  ngAfterViewInit() {
    this.registerDragElement();
  }

  private registerDragElement() {
    const elmnt = document.getElementById('mydiv') as HTMLDivElement;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const dragMouseDown = (e: MouseEvent) => {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e: MouseEvent) => {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    };

    const closeDragElement = () => {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    };

    if (document.getElementById(elmnt.id + 'header')) {
      /* if present, the header is where you move the DIV from:*/
      (document.getElementById(elmnt.id + 'header') as HTMLDivElement).onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  }

  public allowDrop(ev: MouseEvent): void {
    ev.preventDefault();
  }

  // public drag(ev): void {
  //   ev.dataTransfer.setData("text", ev.target.id);
  // }

  // public drop(ev): void {
  //   ev.preventDefault();
  //   var data = ev.dataTransfer.getData("text");
  //   ev.target.appendChild(document.getElementById(data));
  // }
}
