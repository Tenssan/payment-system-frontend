import dynamic from 'next/dynamic';

const Receipt = dynamic(() => import('../../../components/payment/Receipt'), { ssr: false });

const ReceiptPage = () => {
    return <div>jk</div>;
};

export default ReceiptPage;