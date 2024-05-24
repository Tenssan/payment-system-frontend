const FormWrap = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="min-h-fit flex items-center justify-center pb-12 pt-12">
            <div className="max-w-[650px] bg-white w-full flex flex-col gap-6
            items-center shadow-xl rounded p-4 md:p-8">{children}</div>
        </div>
    )
}

export default FormWrap;