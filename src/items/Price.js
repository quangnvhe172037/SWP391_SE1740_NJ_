function Price({currency, num, numSize }) {
    return (
        <>
            <span className={numSize}>{num} </span>{currency}
        </>
    )
}

export default Price