import styled from 'styled-components';

import { CONSTANTS } from '../Note/helpers';

export const NoteContainer = styled.div`
    width: ${CONSTANTS.NOTE_WIDTH};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
