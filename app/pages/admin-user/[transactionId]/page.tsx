import dynamic from 'next/dynamic';

const Receipt = dynamic(() => import('../../../components/payment/Receipt'), { ssr: false });

const ReceiptPage = () => {
    return <Receipt />;
};

export default ReceiptPage;