import MonthlyTransactionsGraph from "../../../components/admin/dashboard/MontlhyTransactionsGraph";
import TopUsersByTransactions from "../../../components/admin/dashboard/TopUsersByTransactions";

const Graphs: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div>
        <TopUsersByTransactions />
      </div>
      <MonthlyTransactionsGraph />
    </div>
  );
};

export default Graphs;
