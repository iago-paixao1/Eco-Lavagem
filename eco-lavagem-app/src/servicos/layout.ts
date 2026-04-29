import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfissionalService {
  profissionalList: any[] = [];

  getProfissionais() {
    return this.profissionalList;
  }
  adicionar(profissional: any) {
    this.profissionalList.push(profissional);
  }
}
