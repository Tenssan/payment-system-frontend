import MonthlyTransactionsGraph from "@/app/components/admin/dashboard/MontlhyTransactionsGraph";
import TopUsersByTransactions from "@/app/components/admin/dashboard/TopUsersByTransactions";
import MostTransactionsProject from "@/app/components/admin/dashboard/MostTransactionsProject";

const Graphs: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col justify-between mb-8">
        <div className="w-full">
          <TopUsersByTransactions />
        </div>
        {/*<div className="w-full pt-4 md:w-1/2 p-2">
          <MostTransactionsProject />
        </div>*/}
      </div>
      <div className="w-full">
        <MonthlyTransactionsGraph />
      </div>
    </div>
  );
};

export default Graphs;
