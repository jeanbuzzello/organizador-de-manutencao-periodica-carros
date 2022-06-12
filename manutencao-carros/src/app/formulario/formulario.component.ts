import { ManutencaoService } from './mantencao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Manutencao } from '../model/manutencao';
import { Shared } from './../util/shared';
import { ManutencaoPromiseService } from './manutencao-promise.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [ManutencaoPromiseService],
})
export class FormularioComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  manutencao!: Manutencao;
  manutencoes$?: Observable<Manutencao[] | undefined>;

  userRepassword: string = '';

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(
    private manutencaoService: ManutencaoService,
    private manutencaoPromiseService: ManutencaoPromiseService
  ) {}

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.manutencao = new Manutencao('', '');

    this.manutencoes$ = this.manutencaoPromiseService.getAll();
  }

  onSubmit() {
    this.isSubmitted = true;
    this.manutencaoPromiseService
      .save(this.manutencao)
      .then((value) => {
        console.log(value);

        try {
          if (!this.manutencaoService.isExist(value!.titulo)) {
            this.manutencaoService.save(value!);
          } else {
            this.manutencaoService.update(value!);
          }
        } catch (err) {
          alert(err);
        }

        this.isShowMessage = true;
        this.isSuccess = true;
        this.message = 'Cadastro realizado com sucesso!';
        this.form.reset();
        this.manutencao = new Manutencao('', '');

        this.manutencoes$ = this.manutencaoPromiseService.getAll();
      })
      .catch((e) => {
        console.log(e);
        this.isShowMessage = true;
        this.isSuccess = false;
        this.message = e;
      });
  }

  onEdit(manutencao: Manutencao) {
    let clone = Manutencao.clone(manutencao);
    this.manutencao = clone;
  }

  onDelete(titulo: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover ' + titulo
    );

    if (!confirmation) {
      return;
    }

    let response: boolean = this.manutencaoService.delete(titulo);
    this.isShowMessage = true;
    this.isSuccess = response;

    if (response) {
      this.message = 'O item foi removido com sucesso';
    } else {
      this.message = 'O item não pode ser removido';
    }

    this.manutencoes$ = this.manutencaoPromiseService.getAll();
  }
}
