import { ActivatedRoute } from '@angular/router';
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
    private manutencaoPromiseService: ManutencaoPromiseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    Shared.initializeWebStorage();

    let _id = Number(this.route.snapshot.paramMap.get('id'));
    if (_id == 0) {
      this.manutencao = new Manutencao('', '');
      this.manutencoes$ = this.manutencaoPromiseService.getAll();
    } else {
      let respo = this.manutencaoPromiseService
        .getOne(_id)
        .then((u) => {
          console.log('uuuuuuuuuu', u);
          this.manutencao = new Manutencao(u!.titulo, '');

          this.manutencao.descricao = u!.descricao;
          this.manutencao.dt_manutencao = u!.dt_manutencao;
          this.manutencao.id = u!.id;
          this.manutencao.valor = u!.valor;
        })
        .catch((e) => {
          this.message = e;
          this.manutencao = new Manutencao('', '');
        })
        .finally(() => {
          console.log('A operação foi finalizada');
          this.manutencoes$ = this.manutencaoPromiseService.getAll();
        });
    }
  }

  async onSubmit() {
    this.isSubmitted = true;

    try {
      await this.manutencaoPromiseService.getOne(this.manutencao.id);

      this.manutencaoPromiseService
        .update(this.manutencao)
        .then((value) => {
          console.log(value);

          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Cadastro atualizado com sucesso!';

          // this.manutencao = new Manutencao('', '');

          this.manutencoes$ = this.manutencaoPromiseService.getAll();
        })
        .catch((e) => {
          console.log(e);
          this.isShowMessage = true;
          this.isSuccess = false;
          this.message = e.message;
        });
    } catch (err) {
      this.manutencaoPromiseService
        .save(this.manutencao)
        .then((value) => {
          console.log(value);

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
