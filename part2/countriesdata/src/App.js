import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({ searchWord, handler }) => {
  return (
    <div>
      filter countries <input value={searchWord} onChange={handler} />
    </div>
  )
}

const Country = ({ country }) => {
  const [temperature, setTemperature] = useState(0);
  const [windDegree, setWindDegree] = useState(0);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (country == null) {
      return;
    }
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital[0]}`)
      .then(resp => {
        console.log(resp.data);
        setTemperature(resp.data.current.temperature);
        setWindDegree(resp.data.current.wind_degree);
        setIcon(resp.data.current.weather_icons[0]);
      });
  })

  if (country == null) {
    return <></>
  }
  
  let langs = [];
  for (const lang in country.languages) {
    langs.push(country.languages[lang]);
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h2>Language</h2>
      <ul>
        {langs.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <h2>Wheather</h2>
      <p>temperature {temperature}</p>
      <p>wind degree {windDegree}</p>
      <img src={icon} alt="weather" />
    </div>
  )
}

const Countries = ({ countries, handler }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => handler(country)}>show</button>
          </div>
        )}
      </div>
    )
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else {
    return <></>
  }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [shownCountry, setShownCountry] = useState(null);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(resp => {
        console.log(resp.data);
        setCountries(resp.data);
      });
  }, [])

  const shownCountries = searchWord.trim() === ''
    ? countries
    : countries.filter(countries => countries.name.common.toLowerCase().search(searchWord.toLowerCase().trim()) >= 0);

  const handleSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  }

  const handleChange = (country) => {
    setShownCountry(country);
  }

  return (
    <div>
      <Filter searchWord={searchWord} handler={handleSearchWordChange} />
      <hr />
      <Countries countries={shownCountries} handler={handleChange} />
      <Country country={shownCountry} />
    </div>
  )
}

export default App