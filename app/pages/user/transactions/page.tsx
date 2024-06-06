'use client';
import Container from '../../../components/Container';
import TransactionsTable from '../../../components/transanctions/TransactionsTable';

const StandardTransactionsPage: React.FC = () => {
    return (
        <Container>
            <TransactionsTable/>
        </Container>
    );
};

export default StandardTransactionsPage;