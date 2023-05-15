import './Hobbies.css'

function Hobbies() {
    const hobbies = ["Sleeping", "Eating", "Cuddling"];
    const liStyle = { fontSize: "1.5em" };
    return (
        <ul>
            {hobbies.map((h, i) => <li key={i} style={liStyle}>{h}</li>)}
        </ul>
    );
}

export default Hobbies;