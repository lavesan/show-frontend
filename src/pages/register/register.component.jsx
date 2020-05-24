import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';

import { StyledRegisterPage } from './register.styles';
import userInstance from '../../services/user.service';
import countriesDDI from '../../countries-ddi.json';

export default () => {

    const [form]       = useState({
        name: '',
        email: '',
        data: '',
        tel1: '',
        ddi1: '55',
        tel2: '',
        ddi2: '55',
        address1: '',
        complement: '',
        city: '',
        state: '',
        cep: '',
        country: '',
        equalAddress: false,
        nameWhoReceives: '',
        addressWhoReceives: '',
        cpfSent: '',
        address2: '',
        complement2: '',
        city2: '',
        state2: '',
        cep2: '',
        country2: '',
        product: '',
        productLink: '',
        quantity: '',
        aditionalInformation: '',
        // sendProductPhoto: false,
        // base64Photo: '',
        service: 1,
        paymentOptions: 1,
        aditionalInstructions: '',
    });
    const [loading, setLoading] = useState(false);
    const [ddis, setDdis]       = useState([]);
    const userService           = userInstance.getInstance();

    const save = async (formik) => {

        setLoading(true);
        await userService.save(formik)
            .then(() => {

            })
            .catch(() => {

            });
        setLoading(false);
        
    }

    useEffect(() => {

        const entries = Object.entries(countriesDDI);
        const mappedDdis = entries.map(([name, value]) => {
            return {
                value,
                label: name,
            }
        });
        setDdis(mappedDdis);

    }, [])

    return (
        <StyledRegisterPage>
            <Formik initialValues={form} onSubmit={save}>
                {({ handleChange, handleSubmit, values }) => (
                    <form onSubmit={handleSubmit} className="row">
                        <div class="form-group col-12">
                            <label for="name">Nome Completo <span className="text-danger">*</span></label>
                            <input type="text" name="name" value={values.name} onChange={handleChange} class="form-control" id="name" />
                        </div>
                        <div class="form-group col-12">
                            <label for="email">Email <span className="text-danger">*</span></label>
                            <input type="email" name="email" value={values.email} onChange={handleChange} class="form-control" id="email" />
                        </div>
                        <div class="form-group col-12">
                            <label for="data">Data</label>
                            <input type="text" name="data" value={values.data} onChange={handleChange} class="form-control" id="data" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="tel1">Telefone 1 <span className="text-danger">*</span></label>
                            <div className="d-flex">
                                <div className="col-2 pl-0">
                                    <select id="ddi1" class="form-control" onChange={handleChange} name="ddi1" value={values.ddi1}>
                                        {ddis.map(ddi => <option value={ddi.value}>{ddi.label}</option>)}
                                    </select>
                                </div>
                                <div className="col-10 px-0">
                                    <input type="text" name="tel1" value={values.tel1} onChange={handleChange} class="form-control" id="tel1" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="tel2">Telefone 2 <span className="text-danger">*</span></label>
                            <div className="d-flex">
                                <div className="col-2 pl-0">
                                    <select id="ddi2" class="form-control" onChange={handleChange} name="ddi2" value={values.ddi2}>
                                        {ddis.map(ddi => <option value={ddi.value}>{ddi.label}</option>)}
                                    </select>
                                </div>
                                <div className="col-10 px-0">
                                    <input type="text" name="tel2" value={values.tel2} onChange={handleChange} class="form-control" id="tel2" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="address1">Endereço - Rua Número <span className="text-danger">*</span></label>
                            <textarea class="form-control" id="address1" rows="3" value={values.address1} onChange={handleChange} name="address1"></textarea>
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="complement">Endereço 2 - Complemento ou Bairro <span className="text-danger">*</span></label>
                            <textarea class="form-control" id="complement" rows="3" value={values.complement} onChange={handleChange} name="complement"></textarea>
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="city">Cidade <span className="text-danger">*</span></label>
                            <input type="text" name="city" value={values.city} onChange={handleChange} class="form-control" id="city" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="state">Estado <span className="text-danger">*</span></label>
                            <input type="text" name="state" value={values.state} onChange={handleChange} class="form-control" id="state" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="cep">CEP ou Zip Code <span className="text-danger">*</span></label>
                            <input type="text" name="cep" value={values.cep} onChange={handleChange} class="form-control" id="cep" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="country">País <span className="text-danger">*</span></label>
                            <input type="text" name="country" value={values.country} onChange={handleChange} class="form-control" id="country" />
                        </div>
                        <div className="col-12 my-3">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="equalAddress" value={values.equalAddress} onChange={handleChange} />
                                <label class="form-check-label" for="equalAddress">Endereço de entrega é igual ao de faturamento - Selecione ou preencha os dados abaixo se o endereço de entrega for diferente do de faturamento - Selecione ou preencha os dados abaixo se o endereço de entrega for diferente do de faturamento</label>
                            </div>
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="nameWhoReceives">Nome Completo de quem recebe <span className="text-danger">*</span></label>
                            <input type="text" name="nameWhoReceives" value={values.nameWhoReceives} onChange={handleChange} class="form-control" id="nameWhoReceives" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="addressWhoReceives">Endereço <span className="text-danger">*</span></label>
                            <input type="text" name="addressWhoReceives" value={values.addressWhoReceives} onChange={handleChange} class="form-control" id="addressWhoReceives" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="cpfSent">CPF para Envio <span className="text-danger">*</span></label>
                            <input type="text" name="cpfSent" value={values.cpfSent} onChange={handleChange} class="form-control" id="cpfSent" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="address2">Endereço <span className="text-danger">*</span></label>
                            <input type="text" name="address2" value={values.address2} onChange={handleChange} class="form-control" id="address2" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="complement2">Endereço 2 ou Bairro</label>
                            <input type="text" name="complement2" value={values.complement2} onChange={handleChange} class="form-control" id="complement2" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="city2">Cidade <span className="text-danger">*</span></label>
                            <input type="text" name="city2" value={values.city2} onChange={handleChange} class="form-control" id="city2" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="state2">Estado <span className="text-danger">*</span></label>
                            <input type="text" name="state2" value={values.state2} onChange={handleChange} class="form-control" id="state2" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="cep2">CEP ou Zip Code <span className="text-danger">*</span></label>
                            <input type="text" name="cep2" value={values.cep2} onChange={handleChange} class="form-control" id="cep2" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="country2">País</label>
                            <input type="text" name="country2" value={values.country2} onChange={handleChange} class="form-control" id="country2" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="product">Nome do Produto <span className="text-danger">*</span></label>
                            <input type="text" name="product" value={values.product} onChange={handleChange} class="form-control" id="product" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="productLink">Link do Produto <span className="text-danger">*</span></label>
                            <input type="text" name="productLink" value={values.productLink} onChange={handleChange} class="form-control" id="productLink" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="quantity">Quantidade <span className="text-danger">*</span></label>
                            <input type="text" name="quantity" value={values.quantity} onChange={handleChange} class="form-control" id="quantity" />
                        </div>
                        <div class="form-group col-12 col-sm-6">
                            <label for="aditionalInformation">Informações Adicionais <span className="text-danger">*</span></label>
                            <input type="text" name="aditionalInformation" value={values.aditionalInformation} onChange={handleChange} class="form-control" id="aditionalInformation" />
                        </div>
                        {/* <label>Quer enviar foto do produto?</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                            <label class="form-check-label" for="exampleRadios1">
                                Sim
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                            <label class="form-check-label" for="exampleRadios1">
                                Não
                            </label>
                        </div> */}
                        <div className="col-12 mb-3">
                            <label>Serviços</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="service" id="service-opt-1" value={1} checked={values.service == 1} onChange={handleChange} />
                                <label class="form-check-label" for="service-opt-1">
                                    Redirecionamento
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="service" id="service-opt-2" value={2} checked={values.service == 2} onChange={handleChange} />
                                <label class="form-check-label" for="service-opt-2">
                                    Compra e Envio
                                </label>
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <label>Opções de Pagamento</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentOptions" id="payment-opt-1" value={1} checked={values.paymentOptions == 1} onChange={handleChange} />
                                <label class="form-check-label" for="payment-opt-1">
                                    Cartão Internacional via PayPal - iof incluso, envio RÁPIDO E PREFERÊNCIAL
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentOptions" id="payment-opt-2" value={2} checked={values.paymentOptions == 2} onChange={handleChange} />
                                <label class="form-check-label" for="payment-opt-2">
                                    Boleto - 8.7% de acréscimo
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentOptions" id="payment-opt-3" value={3} checked={values.paymentOptions == 3} onChange={handleChange} />
                                <label class="form-check-label" for="payment-opt-3">
                                    Cartão Nacional via Mercado Pago - 8.7% de acréscimo
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="paymentOptions" id="payment-opt-4" value={4} checked={values.paymentOptions == 4} onChange={handleChange} />
                                <label class="form-check-label" for="payment-opt-4">
                                    Depósito em Conta
                                </label>
                            </div>
                        </div>
                        <div className="form-group col-12">
                            <label for="aditionalInstructions">Instruções Adicionais</label>
                            <textarea class="form-control" id="aditionalInstructions" rows="3" value={values.aditionalInstructions} onChange={handleChange} name="aditionalInstructions"></textarea>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                )}
            </Formik>
        </StyledRegisterPage>
    )

}
