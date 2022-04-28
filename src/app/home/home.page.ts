import { CurrenciesService } from './../services/currencies.service';
import { Component, NgModule } from '@angular/core';
//import { runInThisContext } from 'vm';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  arrayMonedas:any=[];
  //public txtHacia:string;
  //public txtDesde:string;    

  formulario = new FormGroup({
    selDesde: new FormControl(''),
    selHacia: new FormControl(''),
    txtCantidad: new FormControl(''),
    txtTotal:new FormControl(''),

    });

  
    lblCantidad;
    lblTotal;


  constructor(private currenciesService:CurrenciesService,public formBuilder: FormBuilder) {
    
    this.getMonedas();

    this.lblTotal="";

    this.lblCantidad="Cantidad: " ;
  }

  //llamo a la API y armo un array con los datos
  getMonedas() { 
    this.currenciesService.getMonedas().then(data => {
      var mone=JSON.stringify(data).replace('{','').replace('}','');
      var monedas=mone.split(',');
      var simbolo:string;
      var descrip:string;
      for (let i = 0; i < monedas.length; i++) {
        simbolo=monedas[i].split(':')[0].replace('"','').replace('"','');
        descrip=monedas[i].split(':')[1].replace('"','').replace('"','');
        this.arrayMonedas.push([simbolo,descrip]);
        console.log(descrip);
      }
      console.log(this.arrayMonedas);

    });
  
  }
  selDesdeChange()
  {
    this.lblCantidad="Cantidad: " + this.formulario.controls.selDesde.value + " ";

    this.formulario.controls.txtTotal.setValue(""); 
  }
  selHaciaChange()
  {
    this.lblTotal=("Total: " + this.formulario.controls.selHacia.value + " ");

    this.formulario.controls.txtTotal.setValue(""); 

  }
  //Obtengo los datos seleccionados desde el formulario y lo envio al servicio para realizar el calculo
  calcular()
  {
    var desde=this.formulario.controls.selDesde.value;
    var hacia=this.formulario.controls.selHacia.value;
    var cantidad=this.formulario.controls.txtCantidad.value;
    if (cantidad=="" || hacia=="" || desde=="") {
      this.lblTotal="Complete los datos";
    } else {
      this.currenciesService.getConversion(desde,hacia,cantidad).then(resultado=>{
        console.log((resultado["rates"][hacia]));
        this.formulario.controls.txtTotal.setValue(resultado["rates"][hacia]);      
       })
    }

  }

  
}
