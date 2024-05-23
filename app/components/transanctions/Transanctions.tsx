import React from 'react';

const Transactions: React.FC = () => {
  // Datos de la tabla simulados
  const data = [
    {
      transactions: {
        transactionid: 1,
        remitentid: 1,
        destinatary_id: 2,
        project: 'Project 1',
        payment_method_id: 1,
        date: '10-10-2024',
        status: 'Completed',
        amount: 100,
        payment_methods: {
          name: 'Credit Card',
        },
        users: {
          remitent: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john123@gmail.com',
          },
          destinatary: {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane123@gmail.com',
          },
        },
      },
    },
    {
      transactions: {
        transactionid: 2,
        remitentid: 3,
        destinatary_id: 1,
        project: 'Project 2',
        payment_method_id: 2,
        date: '11-11-2024',
        status: 'Pending',
        amount: 200,
        payment_methods: {
          name: 'PayPal',
        },
        users: {
          remitent: {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane456@gmail.com',
          },
          destinatary: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john123@gmail.com',
          },
        },
      },
    },
    {
      transactions: {
        transactionid: 3,
        remitentid: 4,
        destinatary_id: 2,
        project: 'Project 3',
        payment_method_id: 3,
        date: '12-12-2024',
        status: 'Failed',
        amount: 300,
        payment_methods: {
          name: 'Bank Transfer',
        },
        users: {
          remitent: {
            first_name: 'Alice',
            last_name: 'Johnson',
            email: 'alice789@gmail.com',
          },
          destinatary: {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane123@gmail.com',
          },
        },
      },
    },
  ];

  return (
    <div className="overflow-x-auto text-left bg-MainLight dark:bg-MainDark border border-separate border-spacing-0 border-BorderLight dark:border-BorderDark rounded-3xl mb-10 mx-4 shadow-[0px_0px_15px_rgba(114,114,113,0.3)] mt-0">
      <table className="table-auto text-TextLight dark:text-TextDark w-full">
        <thead>
          <tr>
            <th className="p-2 border-b border-custom-gray text-center">ID</th>
            <th className="p-2 border-b border-custom-gray text-center">Remitent</th>
            <th className="p-2 border-b border-custom-gray text-center">Remitent Email</th>
            <th className="p-2 border-b border-custom-gray text-center">Destinatary</th>
            <th className="p-2 border-b border-custom-gray text-center">Destinatary Email</th>
            <th className="p-2 border-b border-custom-gray text-center">Project</th>
            <th className="p-2 border-b border-custom-gray text-center">Payment Method</th>
            <th className="p-2 border-b border-custom-gray text-center">Date</th>
            <th className="p-2 border-b border-custom-gray text-center">Status</th>
            <th className="p-2 border-b border-custom-gray text-center">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.transactionid}</td>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.users.remitent.first_name} {item.transactions.users.remitent.last_name}</td>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.users.remitent.email}</td>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.users.destinatary.first_name} {item.transactions.users.destinatary.last_name}</td>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.users.destinatary.email}</td>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.project}</td>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.payment_methods.name}</td>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.date}</td>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.status}</td>
              <td className="p-2 border-b border-custom-gray text-center">{item.transactions.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
