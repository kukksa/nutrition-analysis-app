export const Nutrition = ({ label, quantity, unit}) =>  {
    return (
        <div className="result" key={label}>
            <p><span>{label}</span> - {quantity} {unit}</p>
        </div>
    )
}

