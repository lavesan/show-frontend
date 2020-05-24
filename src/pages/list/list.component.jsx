import React, { useEffect, useState, useCallback } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { StyledListComponent } from './list.styles';
import userInstance from '../../services/user.service';

export default () => {

    const [utils, setUsers]     = useState([]);
    const [loading, setLoading] = useState(false);
    const userService           = userInstance.getInstance();
    const columnDefs            = [
        { headerName: 'Nome', field: 'name' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Data', field: 'data' },
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

    const initPage = useCallback(async () => {

        setLoading(true);
        const usersRes = await userService.list()
            .catch(() => {
                return { data: [] };
            });
        setUsers(usersRes.data);
        setLoading(false);

    }, [userService]);

    useEffect(() => {
        initPage();
    }, [initPage]);

    return (
        <StyledListComponent>
            <div className="ag-theme-balham" style={ {height: '500px', width: '100%'} }>
                <AgGridReact
                    defaultColDef={{ resizable: true }}
                    columnDefs={columnDefs}
                    rowData={utils}
                    modules={AllCommunityModules}
                    localeText={{ noRowsToShow: 'Sem resultados' }} />
            </div>
        </StyledListComponent>
    )

}
