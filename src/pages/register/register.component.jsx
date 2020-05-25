import React, { useState, useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import Modal from "react-responsive-modal";
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import { StyledRegisterPage, StyledLoadingModal } from './register.styles';
import { registerValidations } from './register.validations';
import { cpfMask, onlyCharactersMask, onlyNumberMask, onlyCharactersWithSpaceMask, dateMask } from '../../helpers/masks.helpers';
import { initialRegisterFields } from '../../helpers/register.helpers';
import { isValidDate } from '../../helpers/validations.helpers';
import userInstance from '../../services/user.service';
import countriesDDI from '../../countries-ddi.json';

export default () => {

    const [form, setForm]                   = useState(initialRegisterFields);
    const [progress, setProgress]           = useState({
        show: false,
        loading: false,
        error: false,
    });
    const [ddis, setDdis]                   = useState([]);
    const [invalidateDate, setInvalidDate]  = useState(false);
    const userService                       = userInstance.getInstance();

    const save = (formik) => {

        setProgress({
            show: true,
            loading: true,
            error: false,
        });
        userService.save(formik)
            .then(() => {
                setForm(initialRegisterFields);
                setProgress({
                    show: true,
                    loading: false,
                    error: false,
                });
            })
            .catch(() => {
                setProgress({
                    show: true,
                    loading: false,
                    error: true,
                });
            });

    }

    const onMaskChange = ({ e, maskMethod, setFieldValue }) => {
        setFieldValue(e.target.name, maskMethod(e.target.value));

        if (e.target.name === 'data') {
            // console.log('valido: ', isValidDate(e.target.value));
            // setInvalidDate(e.target.value
            //         ? isValidDate(e.target.value)
            //         : false
            // );
        }
    }

    const toggleModal = () => {
        setProgress(f => ({
            ...f,
            show: false,
            loading: false,
        }))
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
            <Segment>
                <div className="my-body">
                    <Formik enableReinitialize={true} initialValues={form} onSubmit={save} validationSchema={registerValidations}>
                        {({ handleChange, handleSubmit, values, setFieldValue, errors }) => (
                            <form onSubmit={handleSubmit} className="row">
                                {JSON.stringify(errors)}
                                <div className="form-group col-12">
                                    <label htmlFor="name">Nome Completo <span className="text-danger">*</span></label>
                                    <input type="text" name="name" value={values.name} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyCharactersWithSpaceMask })} className={`form-control ${errors.name && 'is-invalid'}`} id="name" />
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="email">Email <span className="text-danger">*</span></label>
                                    <input type="email" name="email" value={values.email} onChange={handleChange} className={`form-control ${errors.email && 'is-invalid'}`} id="email" />
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="data">Data</label>
                                    <input type="date" name="data" value={values.data} onChange={handleChange} className={`form-control ${errors.data || invalidateDate && 'is-invalid'}`} id="data" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="tel1">Telefone 1 <span className="text-danger">*</span></label>
                                    <div className="d-flex">
                                        <div className="col-2 pl-0">
                                            <select id="ddi1" className={`form-control ${errors.ddi1 && 'is-invalid'}`} onChange={handleChange} name="ddi1" value={values.ddi1}>
                                                {ddis.map(ddi => <option key={ddi.label} value={ddi.value}>{ddi.label}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-10 px-0">
                                            <input type="text" name="tel1" value={values.tel1} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyNumberMask })} className={`form-control ${errors.tel1 && 'is-invalid'}`} id="tel1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="tel2">Telefone 2 <span className="text-danger">*</span></label>
                                    <div className="d-flex">
                                        <div className="col-2 pl-0">
                                            <select id="ddi2" className={`form-control ${errors.ddi2 && 'is-invalid'}`} onChange={handleChange} name="ddi2" value={values.ddi2}>
                                                {ddis.map(ddi => <option key={ddi.label} value={ddi.value}>{ddi.label}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-10 px-0">
                                            <input type="text" name="tel2" value={values.tel2} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyNumberMask })} className={`form-control ${errors.tel2 && 'is-invalid'}`} id="tel2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="address1">Endereço - Rua Número <span className="text-danger">*</span></label>
                                    <textarea className={`form-control ${errors.address1 && 'is-invalid'}`} id="address1" rows="3" value={values.address1} onChange={handleChange} name="address1"></textarea>
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="complement">Endereço 2 - Complemento ou Bairro <span className="text-danger">*</span></label>
                                    <textarea className={`form-control ${errors.complement && 'is-invalid'}`} id="complement" rows="3" value={values.complement} onChange={handleChange} name="complement"></textarea>
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="city">Cidade <span className="text-danger">*</span></label>
                                    <input type="text" name="city" value={values.city} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyCharactersWithSpaceMask })} className={`form-control ${errors.city && 'is-invalid'}`} id="city" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="state">Estado <span className="text-danger">*</span></label>
                                    <input type="text" name="state" value={values.state} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyCharactersWithSpaceMask })} className={`form-control ${errors.state && 'is-invalid'}`} id="state" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="cep">CEP ou Zip Code <span className="text-danger">*</span></label>
                                    <input type="text" name="cep" value={values.cep} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyNumberMask })} className={`form-control ${errors.cep && 'is-invalid'}`} id="cep" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="country">País <span className="text-danger">*</span></label>
                                    <input type="text" name="country" value={values.country} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyCharactersMask })} className={`form-control ${errors.country && 'is-invalid'}`} id="country" />
                                </div>
                                <div className="col-12 my-3">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="equalAddress" value={values.equalAddress} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="equalAddress">Endereço de entrega é igual ao de faturamento</label>
                                    </div>
                                </div>
                                {!values.equalAddress && (
                                    <>
                                        <div className="form-group col-12 col-sm-6">
                                            <label htmlFor="nameWhoReceives">Nome Completo de quem recebe <span className="text-danger">*</span></label>
                                            <input type="text" name="nameWhoReceives" value={values.nameWhoReceives} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyCharactersWithSpaceMask })} className={`form-control ${errors.nameWhoReceives && 'is-invalid'}`} id="nameWhoReceives" />
                                        </div>
                                        <div className="form-group col-12 col-sm-6">
                                            <label htmlFor="addressWhoReceives">Endereço <span className="text-danger">*</span></label>
                                            <input type="text" name="addressWhoReceives" value={values.addressWhoReceives} onChange={handleChange} className={`form-control ${errors.addressWhoReceives && 'is-invalid'}`} id="addressWhoReceives" />
                                        </div>
                                        <div className="form-group col-12 col-sm-6">
                                            <label htmlFor="cpfSent">CPF para Envio <span className="text-danger">*</span></label>
                                            <input type="text" name="cpfSent" value={values.cpfSent} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: cpfMask })} className={`form-control ${errors.cpfSent && 'is-invalid'}`} id="cpfSent" />
                                        </div>
                                        <div className="form-group col-12 col-sm-6">
                                            <label htmlFor="address2">Endereço <span className="text-danger">*</span></label>
                                            <input type="text" name="address2" value={values.address2} onChange={handleChange} className={`form-control ${errors.address2 && 'is-invalid'}`} id="address2" />
                                        </div>
                                        <div className="form-group col-12 col-sm-6">
                                            <label htmlFor="complement2">Endereço 2 ou Bairro</label>
                                            <input type="text" name="complement2" value={values.complement2} onChange={handleChange} className={`form-control ${errors.complement2 && 'is-invalid'}`} id="complement2" />
                                        </div>
                                        <div className="form-group col-12 col-sm-6">
                                            <label htmlFor="city2">Cidade <span className="text-danger">*</span></label>
                                            <input type="text" name="city2" value={values.city2} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyCharactersWithSpaceMask })} className={`form-control ${errors.city2 && 'is-invalid'}`} id="city2" />
                                        </div>
                                        <div className="form-group col-12 col-sm-6">
                                            <label htmlFor="state2">Estado <span className="text-danger">*</span></label>
                                            <input type="text" name="state2" value={values.state2} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyCharactersWithSpaceMask })} className={`form-control ${errors.state2 && 'is-invalid'}`} id="state2" />
                                        </div>
                                        <div className="form-group col-12 col-sm-6">
                                            <label htmlFor="cep2">CEP ou Zip Code <span className="text-danger">*</span></label>
                                            <input type="text" name="cep2" value={values.cep2} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyNumberMask })} className={`form-control ${errors.cep2 && 'is-invalid'}`} id="cep2" />
                                        </div>
                                        <div className="form-group col-12 col-sm-6">
                                            <label htmlFor="country2">País</label>
                                            <input type="text" name="country2" value={values.country2} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyCharactersWithSpaceMask })} className={`form-control ${errors.country2 && 'is-invalid'}`} id="country2" />
                                        </div>
                                    </>
                                )}
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="product">Nome do Produto <span className="text-danger">*</span></label>
                                    <input type="text" name="product" value={values.product} onChange={handleChange} className={`form-control ${errors.product && 'is-invalid'}`} id="product" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="productLink">Link do Produto <span className="text-danger">*</span></label>
                                    <input type="text" name="productLink" value={values.productLink} onChange={handleChange} className={`form-control ${errors.productLink && 'is-invalid'}`} id="productLink" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="quantity">Quantidade <span className="text-danger">*</span></label>
                                    <input type="text" name="quantity" value={values.quantity} onChange={e => onMaskChange({ setFieldValue, e, maskMethod: onlyNumberMask })} className={`form-control ${errors.quantity && 'is-invalid'}`} id="quantity" />
                                </div>
                                <div className="form-group col-12 col-sm-6">
                                    <label htmlFor="aditionalInformation">Informações Adicionais <span className="text-danger">*</span></label>
                                    <input type="text" name="aditionalInformation" value={values.aditionalInformation} onChange={handleChange} className={`form-control ${errors.aditionalInformation && 'is-invalid'}`} id="aditionalInformation" />
                                </div>
                                {/* <label>Quer enviar foto do produto?</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Sim
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Não
                                    </label>
                                </div> */}
                                <div className="col-12 mb-3">
                                    <label>Serviços</label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="service" id="service-opt-1" value={1} checked={values.service == 1} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="service-opt-1">
                                            Redirecionamento
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="service" id="service-opt-2" value={2} checked={values.service == 2} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="service-opt-2">
                                            Compra e Envio
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Opções de Pagamento</label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="paymentOptions" id="payment-opt-1" value={1} checked={values.paymentOptions == 1} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="payment-opt-1">
                                            Cartão Internacional via PayPal - iof incluso, envio RÁPIDO E PREFERÊNCIAL
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="paymentOptions" id="payment-opt-2" value={2} checked={values.paymentOptions == 2} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="payment-opt-2">
                                            Boleto - 8.7% de acréscimo
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="paymentOptions" id="payment-opt-3" value={3} checked={values.paymentOptions == 3} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="payment-opt-3">
                                            Cartão Nacional via Mercado Pago - 8.7% de acréscimo
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="paymentOptions" id="payment-opt-4" value={4} checked={values.paymentOptions == 4} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="payment-opt-4">
                                            Depósito em Conta
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group col-12">
                                    <label htmlFor="aditionalInstructions">Instruções Adicionais</label>
                                    <textarea className={`form-control ${errors.aditionalInstructions && 'is-invalid'}`} id="aditionalInstructions" rows="3" value={values.aditionalInstructions} onChange={handleChange} name="aditionalInstructions"></textarea>
                                </div>
                                <div className="col-12 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </Segment>
            <Modal open={progress.show} onClose={toggleModal} closeOnOverlayClick={false} center>
                <StyledLoadingModal>
                    <Segment>
                        <Dimmer active={progress.loading} inverted>
                            <Loader inverted content='Loading' />
                        </Dimmer>
                        {!progress.loading && (
                            <>
                                {progress.error
                                    ? <p className="text-danger">Aconteceu um erro no servidor. Por favor tente mais tarde.</p>
                                    : <p className="text-success">Dados cadastrados com sucesso!</p>
                                }
                            </>
                        )}
                    </Segment>
                </StyledLoadingModal>
            </Modal>
        </StyledRegisterPage>
    )

}
