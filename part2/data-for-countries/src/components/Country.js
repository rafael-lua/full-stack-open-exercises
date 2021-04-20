import Weather from "./Weather";

const Country = ({data}) => {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>Capital: {data.capital}</p>
      <p>Population: {data.population}</p>
      <h3>Languages</h3>
      <ul>
        {data.languages.map((value) => <li key={value.name}>{value.name}</li>)}
      </ul>
      <img src={data.flag} alt={`Flag of ${data.name}`} width="200" />
      <h3>Weather</h3>
      <Weather country={data.name} />
    </div>
  )
}

export default Country;
