"use client";
import Container from "../../../components/Container";
import TransactionsTable from "@/app/components/admin/dashboard/TransactionsTable";

const StandardTransactionsPage: React.FC = () => {
  return (
    <Container>
      <TransactionsTable />
    </Container>
  );
};

export default StandardTransactionsPage;
