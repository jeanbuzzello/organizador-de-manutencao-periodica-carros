import { ManutencaoService } from './mantencao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Manutencao } from '../model/manutencao';
import { Shared } from './../util/shared';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  manutencao!: Manutencao;
  manutencoes?: Manutencao[];

  userRepassword: string = '';

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;


  constructor(
    private manutencaoService:ManutencaoService

  ) { }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.manutencao = new Manutencao('','');
    this.manutencoes = this.manutencaoService.getManutencoes();
  }

  onSubmit() {
    this.isSubmitted = true;

    try {
      if (!this.manutencaoService.isExist(this.manutencao.titulo)) {


        this.manutencaoService.save(this.manutencao);
      } else {

        this.manutencaoService.update(this.manutencao);
      }
    } catch (err) {
      alert(err);
    }

    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';
    this.form.reset();
    this.manutencao = new Manutencao('','');
    this.manutencoes = this.manutencaoService.getManutencoes();
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

    this.manutencoes = this.manutencaoService.getManutencoes();
  }

}
