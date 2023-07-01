const DateRangeComponent = ({ initialDate, finalDate, initialDateCertainty, finalDateCertainty }:
    { initialDate: string, finalDate: string, initialDateCertainty: boolean | string, finalDateCertainty: boolean | string }) => {
    const renderQuestionMark = () => {
        console.log(initialDateCertainty, finalDateCertainty);
        if (initialDateCertainty === 'False' || finalDateCertainty === "False") {
            console.log('hello');
            return <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white">
                &#63;
            </span>;
        }
        return null;
    };

    return (
        <div>
            {initialDate}
            &nbsp;
            {renderQuestionMark()}
            &nbsp;
            to
            &nbsp;
            {finalDate}
            &nbsp;
            {renderQuestionMark()}
        </div>
    );
};

export default DateRangeComponent;

