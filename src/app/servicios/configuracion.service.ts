import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { configuracion } from "../modelo/configuracion.model";

@Injectable()
export class ConfiguracionServicio{
    configuracionDoc: AngularFirestoreDocument<configuracion>;
    configuracion: Observable<configuracion>;

    //id unico de la conlección de configuración
    id = '1';

    constructor(
        private db: AngularFirestore
    ) { }
    
    getConfiguracion(): Observable<configuracion>{
        this.configuracionDoc = this.db.doc<configuracion>(`configuracion/${this.id}`)
        this.configuracion = this.configuracionDoc.valueChanges();
        return this.configuracion;
    }

    modificarConfiguracion(configuracion: configuracion) {
        this.configuracionDoc = this.db.doc<configuracion>(
          `configuracion/${this.id}`
        );
        this.configuracionDoc.update(configuracion);
    }
}