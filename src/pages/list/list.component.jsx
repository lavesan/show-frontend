import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { StyledListComponent } from './list.styles';
import { translateField } from '../../helpers/list.helpers';
import userInstance from '../../services/user.service';

export default () => {

    const [utils, setUsers]                 = useState([]);
    const [loading, setLoading]             = useState(false);
    const [filter, setFilter]               = useState([]);
    const [filterForm, setFilterForm]       = useState({
        value: '',
        type: 'name',
    });
    const userService                       = userInstance.getInstance();
    const columnDefs                        = [
        { headerName: 'Nome', field: 'name' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Data', field: 'data', cellRenderer({ data }) {
            
            const momentDate = moment(data.data, 'YYYY-MM-DD');
            return momentDate.isValid() ? momentDate.format('DD/MM/YYYY') : '';

        } },
        { headerName: 'Telefone 1', field: 'tel1', cellRenderer({ data }) {
            return `+${data.ddi1} ${data.tel1}`;
        } },
        { headerName: 'Telefone 2', field: 'tel2', cellRenderer({ data }) {
            return `+${data.ddi2} ${data.tel2}`;
        } },
        { headerName: 'Endereço', field: 'address1' },
        { headerName: 'Complemento', field: 'complement' },
        { headerName: 'Cidade', field: 'city' },
        { headerName: 'Estado', field: 'state' },
        { headerName: 'CEP', field: 'cep' },
        { headerName: 'País', field: 'country' },
        // equalAddress
        { headerName: 'Nome de quem recebe', field: 'nameWhoReceives' },
        { headerName: 'Endereço de quem recebe', field: 'addressWhoReceives' },
        { headerName: 'CPF para envio', field: 'cpfSent' },
        { headerName: 'Endereço para envio', field: 'address2' },
        { headerName: 'Complemento para envio', field: 'complement2' },
        { headerName: 'Cidade para envio', field: 'city2' },
        { headerName: 'Estado para envio', field: 'state2' },
        { headerName: 'CEP para envio', field: 'cep2' },
        { headerName: 'País para envio', field: 'country2' },
        { headerName: 'Nome do produto', field: 'product' },
        { headerName: 'Link do produto', field: 'productLink' },
        { headerName: 'Quantidade', field: 'quantity' },
        { headerName: 'Informações Adicionais', field: 'aditionalInformation' },
        { headerName: 'Serviço', field: 'service', cellRenderer({ data }) {

            const handleData = {
                1: 'Redirecionamento',
                2: 'Compra e Envio',
            }
            return handleData[data.service];

        } },
        { headerName: 'Pagamento', field: 'paymentOptions', cellRenderer({ data }) {

            const handleData = {
                1: 'PayPal',
                2: 'Boleto',
                3: 'Mercado Pago',
                4: 'Depósito',
            }
            return handleData[data.paymentOptions];
            
        } },
        { headerName: 'Instruções Adicionais', field: 'aditionalInstructions' },
    ]

    const onSubmit = e => {

        e.preventDefault();

        setFilter(f => [
            ...f,
            {
                field: filterForm.type,
                value: filterForm.value,
            },
        ]);
        setFilterForm(f => ({
            ...f,
            value: '',
        }));

    }

    const removeFilter = (index) => {
        setFilter(f => f.filter((iteration, i) => i !== index));
    }

    const handleChange = e => {
        const target = e.target;
        setFilterForm(f => ({
            ...f,
            [target.name]: target.value,
        }));
    }

    const initPage = useCallback(async () => {

        setLoading(true);
        const usersRes = await userService.list(filter)
            .catch(() => {
                return { data: [] };
            });
        setUsers(usersRes.data);
        setLoading(false);

    }, [userService, filter]);

    useEffect(() => {
        initPage();
    }, [initPage]);

    return (
        <StyledListComponent>
            <h2>Filtros</h2>
            <form onSubmit={onSubmit} className="row">
                <div className="form-group col-12 col-sm-4 col-md-3">
                    <label htmlFor="value">Digite um valor</label>
                    <input type="text" name="value" value={filterForm.value} onChange={handleChange} className="form-control" id="value" />
                </div>
                <div className="form-group col-12 col-sm-4 col-md-3">
                    <label htmlFor="type">Filtrar por:</label>
                    <select id="type" className="form-control" onChange={handleChange} name="type" value={filterForm.type}>
                        <option value="name">Nome</option>
                        <option value="email">Email</option>
                    </select>
                </div>
                <div className="col-12 col-sm-4 col-md-3 d-flex align-items-end pb-3">
                    <button disabled={!filterForm.value || !filterForm.type} type="submit" className="btn btn-primary">Filtrar</button>
                </div>
            </form>
            <div className="my-3 filters-container">
                {filter.map((filt, index) =>
                    <div className="filter-button p-2">
                        <p className="mt-0 mb-1"><b>{translateField(filt.field)}</b></p>
                        <div className="d-flex align-items-center justify-content-between">
                            <p>
                                {filt.value}
                            </p>
                            <button
                                type="button"
                                className="text-danger filter-button--button"
                                title="Remover"
                                onClick={() => removeFilter(index)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="ag-theme-balham" style={ {height: '500px', width: '100%'} }>
                <Segment style={{ height: 500 }}>
                    <Dimmer active={loading} inverted>
                        <Loader inverted content='Loading' />
                    </Dimmer>
                    <AgGridReact
                        defaultColDef={{ resizable: true }}
                        columnDefs={columnDefs}
                        rowData={utils}
                        modules={AllCommunityModules}
                        localeText={{ noRowsToShow: 'Sem resultados' }} />
                </Segment>
            </div>
        </StyledListComponent>
    )

}
