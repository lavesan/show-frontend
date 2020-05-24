import styled from 'styled-components';

export const StyledListComponent = styled.div`
    padding: 30px;
    .unbreakable {
        white-space: nowrap;
    }

    .filters-container {
        display: flex;
        flex-flow: row wrap;

        > * {
            width: 150px;
            &:not(:last-child) {
                margin-right: 20px;
            }
        }
    }

    .filter-button {
        border-radius: 4px;
        background-color: #198b8b;
        color: #fff;
        font-size: .9rem;

        p {
            margin: 0;
        }

        .filter-button--button {
            background: none;
            border: none;
            cursor: pointer;
        }
    }
`;
