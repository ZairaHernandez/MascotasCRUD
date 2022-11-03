import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Mascota } from 'src/app/modelo/mascota.model';
import { MascotaServicio } from 'src/app/servicios/mascota.service';

@Component({
  selector: 'app-editar-mascotas',
  templateUrl: './editar-mascotas.component.html',
  styleUrls: ['./editar-mascotas.component.css']
})
export class EditarMascotasComponent implements OnInit {
  mascota: Mascota = {
    nombre:'',
    tipo:'',
    enfermedades: '',
    edad: 0,
    updated_at: new Date()
  }
  
  id: string;
  constructor(
    private mascotasServicio: MascotaServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.mascotasServicio.getMascota(this.id).subscribe((mascota) => {
      this.mascota = mascota;
    });
  }

  guardar({ value, valid }: { value: Mascota; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      value.id = this.id;
      //modificar el Mascota
      value.updated_at = new Date();
      this.mascotasServicio.modificarMascota(value);
      this.router.navigate(['/']);
    }
  }

  /*
  eliminar() {
    if (confirm('¿Seguro que desea eliminar el Mascota?')) {
      this.mascotasServicio.eliminarMascota(this.mascota);
      this.router.navigate(['/']);
    }
  };
*/
  
  
}
