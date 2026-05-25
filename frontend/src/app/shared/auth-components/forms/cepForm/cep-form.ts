import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CepServiceService } from '../../../../services/CEP/cep-service.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CepType } from '../../../../models/cepType';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cep-form',
  imports: [MatIconModule, NgxMaskDirective, NgxMaskPipe, FormsModule],
  standalone: true,
  templateUrl: './cep-form.html',
})
export class CepForm implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  private cepService = inject(CepServiceService);
  private cdr = inject(ChangeDetectorRef);

  cepInfo: CepType = {
    cep: '',
    logradouro: '',
    numero: '',
    uf: '',
    cidade: '',
    bairro: '',
    complemento: '',
  };

  cepAlteration(cep: string) {
    //impede de gerar requisições falhas
    if (cep == '' || cep.length < 9) {
      return;
    }

    //Retira os caracteres da mascara
    cep = this.cepService.limpaCep(cep);
    let cepResponse: any;

    //Iludindo o usuario
    this.cepInfo.logradouro = 'Buscando...';
    this.cepInfo.uf = '...';
    this.cepInfo.bairro = 'Buscando...';
    this.cepInfo.cidade = 'Buscando...';

    this.cepService.getCep(cep).subscribe({
      next: (res) => {
        cepResponse = res;
        this.cepInfo.cep = cep;
        this.cepInfo.logradouro = cepResponse.logradouro;
        this.cepInfo.uf = cepResponse.uf;
        this.cepInfo.cidade = cepResponse.localidade;
        this.cepInfo.bairro = cepResponse.bairro;
        this.cdr.markForCheck();
      },
      error: (res) => {
        console.log('+ ERRO NO VIA CEP +' + res);
      },
    });
  }

  getData(): any {
    if (
      Object.entries(this.cepInfo)
        .filter(([chave]) => chave !== 'complemento')
        .some(([, valor]) => !valor || String(valor).trim() === '')
    ) {
      return false;
    }

    return this.cepInfo;
  }
}
