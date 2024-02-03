import { KeyValue } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    for (const key in this.objectToBeingShown)
      this.bindableProps.push([key, this.objectToBeingShown[key]]);
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
