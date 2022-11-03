import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { timeout } from 'rxjs';
import { Mascota } from 'src/app/modelo/mascota.model';
import { MascotaServicio } from 'src/app/servicios/mascota.service';

 
@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css'],
})
export class MascotasComponent implements OnInit {
  mascotas: Mascota[];
  mascota: Mascota = {
    nombre:'',
    tipo:'',
    enfermedades: '',
    edad: 0,
    created_at: new Date(),
    updated_at: new Date()
  }
  private router: Router;
  

  @ViewChild("mascotaForm") mascotaForm: NgForm;

  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(
    private mascotasServicio: MascotaServicio   ,private flashMessages: FlashMessagesService, private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    
    this.mascotasServicio.getMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
      timeout(3000);
      for (let i = 0; i < mascotas.length; i++) {
        let stringCreated: any = (this.mascotas[i].created_at?.toString());
        let stringUpdated: any = (this.mascotas[i].updated_at?.toString());

        let auxCreated: any = stringCreated[18];
        let auxUpdated: any = stringCreated[18];

        for (let j = 19; j < 28; j++) {
            
          auxCreated += stringCreated[j];
          auxUpdated += stringUpdated[j];
        }
        let dateCreated = new Date(+auxCreated * 1000);
        let dateUpdated = new Date(+auxUpdated * 1000);
          
        this.mascotas[i].created_at = dateCreated.toLocaleDateString() + " " + dateCreated.toLocaleTimeString();
        this.mascotas[i].updated_at = dateUpdated.toLocaleDateString() + " " + dateUpdated.toLocaleTimeString();
          
      }
    });
  }

  eliminar(mascota:Mascota){
    if(confirm('¿Seguro que desea eliminar la mascota?')){
      this.mascotasServicio.eliminarMascota(mascota);
      this.router.navigate(['/']);
    }
  }


  agregar({value, valid}: {value:Mascota, valid: boolean}) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      //Agregar nueva mascota
      //this.hoy = Date.now();
      //this.hoy = this.mascotasServicio.fecha();
      value.created_at = new Date();
      value.updated_at = new Date();
      this.mascotasServicio.agregarMascota(value);
      this.mascotaForm.resetForm();
      this.cerrarModal();
      
    }
    
  } 

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}
