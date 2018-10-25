import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the ModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalComponent {

  @Input('type') type = "confirm"; //tipo do modal - info, confirm, check
  @Input('btnConfirm') btnConfirm = "Confirmar"; //texto do botão de confirmação
  @Input('btnCancel') btnCancel = "Cancelar"; //texto do botão de cancelar
  @Input('withImg') withImg = true; //modal tem imagem?
  @Input('img') img = '../../assets/imgs/folhinha_da_macunha.png'; //imagem do modal
  @Input('title') title = "Título aqui."; //título do modal
  @Input('text') text = "Texto aqui."; //texto do modal
  @Input('loading') loading = false;
  @Input('color') color = "green"; //cor do botão de confirmação
  @Output() onConfirm: EventEmitter<any> = new EventEmitter(); //clique no botão de confirmação
  @Output() onCancel: EventEmitter<any> = new EventEmitter(); //clique no botão de cancelar

  constructor() {
  }

  ngAfterViewInit(){
    let text = this.text;
    if (text && text.indexOf('<b>') != -1){
      let arrayText = text.split('<b>');
      let arrayNewText = arrayText[1].split('</b>');
      let newText = arrayNewText[0].bold();
      this.text = arrayText[0] + newText + arrayNewText[1];
      document.getElementById('textoModal').innerHTML = this.text;
    }
  }

  cancel(){
    this.onCancel.emit();
  }

  confirm(){
    this.onConfirm.emit();
  }

  nada(){
    
  }

}
