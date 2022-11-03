import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
import { Mascota } from "../modelo/mascota.model";
import { map } from 'rxjs/operators';
import * as firebase from "firebase/compat";
import { updateDoc, serverTimestamp, doc } from "firebase/firestore";



@Injectable()
export class MascotaServicio{
  
  mascotaColeccion: AngularFirestoreCollection<Mascota>;
  mascotaDoc: AngularFirestoreDocument<Mascota>;
  mascotas: Observable<Mascota[]>;
  mascota: Observable<Mascota | null>;
  
  constructor(private db: AngularFirestore) {
    this.mascotaColeccion = db.collection('mascotas', ref => ref.orderBy('created_at', 'asc'));
  }

  getMascotas(): Observable<Mascota[]>{
    //Obtener los mascotas
    this.mascotas = this.mascotaColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as Mascota;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    );
    return this.mascotas;
  }

  
  agregarMascota(mascota: Mascota) {
    this.mascotaColeccion.add(mascota);
    
  }
  
  
  getMascota(id: string) {
    this.mascotaDoc = this.db.doc<Mascota>(`mascotas/${id}`);
    this.mascota = this.mascotaDoc.snapshotChanges().pipe(
      map(accion => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Mascota;
          
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.mascota;
  }

  modificarMascota(mascota: Mascota) {
    this.mascotaDoc = this.db.doc(`mascotas/${mascota.id}`);
    this.mascotaDoc.update(mascota);
  }

  eliminarMascota(mascota: Mascota) {
    this.mascotaDoc = this.db.doc(`mascotas/${mascota.id}`);
    this.mascotaDoc.delete();
  }
}
  
