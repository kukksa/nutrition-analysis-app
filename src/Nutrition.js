export const Nutrition = ({ label, quantity, unit},id) =>  {
    return (
        <div className="result" key={id}>
            <p><span>{label}</span> - {quantity} {unit}</p>
        </div>
    )
}

