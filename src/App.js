import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { useHistory } from 'react-router-dom';
import './App.scss';
import { ReactComponent as EmptyState } from './assets/svgs/empty.svg';
import AutocompleteComponent from './components/Autocomplete/AutocompleteComponent';
import { Button } from './components/Button';
import Loader from './components/Loader';

const App = () => {
  let initialFirstTown = 'berlin';
  let initialSecondTown = 'london';
  const metricNames = [
    'Housing',
    'Healthcare',
    'Internet Access',
    'Safety',
    'Education',
    'Cost of Living',
  ];
  const autocompleteRef = useRef(null);
  const history = useHistory();
  const TOWN_SUGGESTION_URL = 'https://api.teleport.org/api/cities/';
  const TOWN_METRICS_URL = 'https://api.teleport.org/api/urban_areas/';
  const dataLimit = 10;
  const [cityMetrics, setCityMetrics] = useState([]);
  const [firstInput, setFirstInput] = useState('berlin');
  const [secondInput, setSecondInput] = useState('london');
  const [loading, setLoading] = useState(false);
  const [loadingFirstSuggestionMenu, setLoadingFirstSuggestionMenu] = useState(false);
  const [loadingSecondSuggestionMenu, setLoadingSecondSuggestionMenu] = useState(false);
  const [showFirstSuggestionMenu, setShowFirstSuggestionMenu] = useState(false);
  const [showSecondSuggestionMenu, setShowSecondSuggestionMenu] = useState(false);
  // const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [activeFirstMenu, setActiveFirstMenu] = useState(0);
  const [activeSecondMenu, setActiveSecondMenu] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState(null);
  const [userData, setUserData] = useState({ firstInput: '', secondInput: '' });
  const [firstData, setFirstData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [error, setError] = useState('');

  const fetchSuggestions = async (searchPhrase) => {
    await axios
      .get(`${TOWN_SUGGESTION_URL}?search=${searchPhrase}&limit=${dataLimit}`)
      .then((res) => {
        const cityInfo = res.data?._embedded[
          'city:search-results'
        ][0]?.matching_alternate_names?.map((el) => el.name);
        const filtered = cityInfo?.filter(
          (suggestion) => suggestion?.toLowerCase().indexOf(searchPhrase?.toLowerCase()) > -1
        );
        setLoadingFirstSuggestionMenu(false);
        setLoadingSecondSuggestionMenu(false);
        setActiveFirstMenu(0);
        setActiveSecondMenu(0);
        setFilteredSuggestions(filtered);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const firstInputHandler = (e) => {
    e.preventDefault();
    setLoadingFirstSuggestionMenu(true);
    setLoadingSecondSuggestionMenu(false);
    setShowSecondSuggestionMenu(false);
    setShowFirstSuggestionMenu(true);
    setFirstInput(e.currentTarget.value);
    fetchSuggestions(firstInput);
  };
  const secondInputHandler = (e) => {
    e.preventDefault();
    setLoadingFirstSuggestionMenu(false);
    setLoadingSecondSuggestionMenu(true);
    setShowFirstSuggestionMenu(false);
    setShowSecondSuggestionMenu(true);
    setSecondInput(e.currentTarget.value);
    fetchSuggestions(secondInput);
  };

  const onItemSelectedFromFirstMenu = (value) => {
    value = filteredSuggestions;
    if (value) {
      setShowFirstSuggestionMenu(false);
      setActiveFirstMenu(0);
      setFirstInput(value[activeFirstMenu]);
      setFilteredSuggestions([]);
    }
  };
  const onItemSelectedFromSecondMenu = (value) => {
    value = filteredSuggestions;
    if (value) {
      setShowSecondSuggestionMenu(false);
      setActiveSecondMenu(0);
      setSecondInput(value[activeSecondMenu]);
      setFilteredSuggestions([]);
    }
  };

  const onKeyDownForFirstMenu = (e) => {
    if (e.keyCode === 13 && filteredSuggestions) {
      e.preventDefault();
      setShowFirstSuggestionMenu(false);
      setActiveFirstMenu(0);
      setFirstInput(filteredSuggestions[activeFirstMenu]);
    } else if (e.keyCode === 38) {
      if (activeFirstMenu === 0) {
        return;
      }
      setActiveFirstMenu(activeFirstMenu - 1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeFirstMenu - 1 === filteredSuggestions?.length) {
        return;
      }
      setActiveFirstMenu(activeFirstMenu + 1);
    }
  };
  const onKeyDownForSecondMenu = (e) => {
    if (e.keyCode === 13 && filteredSuggestions) {
      e.preventDefault();
      setShowSecondSuggestionMenu(false);
      setActiveSecondMenu(0);
      setSecondInput(filteredSuggestions[activeSecondMenu]);
    } else if (e.keyCode === 38) {
      if (activeSecondMenu === 0) {
        return;
      }
      setActiveSecondMenu(activeSecondMenu - 1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSecondMenu - 1 === filteredSuggestions?.length) {
        return;
      }
      setActiveSecondMenu(activeSecondMenu + 1);
    }
  };

  const getCityMetrics = async () => {
    setLoading(true);
    console.log(firstInput, secondInput, 'here');
    const firstTownResponse = await axios.get(
      `${TOWN_METRICS_URL}slug:${firstInput.toLowerCase() || initialFirstTown}/scores/`
    );
    const secondTownResponse = await axios.get(
      `${TOWN_METRICS_URL}slug:${secondInput.toLowerCase() || initialSecondTown}/scores/`
    );
    console.log(firstTownResponse, 'first');
    console.log(secondTownResponse, 'second');

    axios
      .all([firstTownResponse, secondTownResponse])
      .then(
        axios.spread((...allData) => {
          setFirstData(allData[0]);
          setSecondData(allData[1]);

          let firstDataFilteredArray = firstData?.data?.categories.filter((item) => {
            return metricNames.indexOf(item.name) > -1;
          });
          let secondDataFilteredArray = secondData?.data?.categories.filter((item) => {
            return metricNames.indexOf(item.name) > -1;
          });
          firstDataFilteredArray = { records: firstDataFilteredArray };
          secondDataFilteredArray = { records: secondDataFilteredArray };
          console.log(firstDataFilteredArray, 'hhhhh');
          // const firstDataMetrics = firstDataFilteredArray?.records.map((item) => item.name);
          // console.log(firstDataMetrics, 'map undefiended');
          const firstTownScores = firstDataFilteredArray?.records.map(
            (item) => item.score_out_of_10
          );
          const firstTownColorCodes = firstDataFilteredArray?.records.map((item) => item.color);
          // const secondDataMetrics = secondDataFilteredArray?.records.map((item) => item.name);
          const secondTownScores = secondDataFilteredArray?.records.map(
            (item) => item.score_out_of_10
          );
          const secondTownColorCodes = secondDataFilteredArray?.records.map((item) => item.color);
          setCityMetrics([
            {
              type: 'scatterpolar',
              r: firstTownScores,
              theta: metricNames,
              fill: 'toself',
              name: firstInput || initialFirstTown,
              marker: {
                color: firstTownColorCodes,
              },
              showlegend: true,
              line: { color: '#011FFD' },
              mode: 'lines+markers',
            },
            {
              type: 'scatterpolar',
              r: secondTownScores,
              theta: metricNames,
              fill: 'toself',
              name: secondInput || initialSecondTown,
              marker: {
                color: secondTownColorCodes,
              },
              showlegend: true,
              mode: 'lines+markers',
              line: { color: '#00C2BA' },
            },
          ]);
          // setFirstInput('');
          // setSecondInput('');
          setLoading(false);
        })
      )
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    const formData = window.localStorage.getItem('user-values');
    const savedValues = JSON.parse(formData);
    setUserData(savedValues.userData);
    setFirstInput(savedValues.firstInput);
    setSecondInput(savedValues.secondInput);
  }, []);

  useEffect(() => {
    const valueToSave = { ...userData, firstInput, secondInput };
    window.localStorage.setItem('user-values', JSON.stringify(valueToSave));
  });

  //The data are loaded initially
  useEffect(() => {
    getCityMetrics();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideForFirstMenu);
    document.addEventListener('mousedown', handleClickOutsideForSecondMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideForFirstMenu);
      document.removeEventListener('mousedown', handleClickOutsideForSecondMenu);
    };
  }, []);

  const handleClickOutsideForFirstMenu = (e) => {
    const { current: autoComponent } = autocompleteRef;
    if (autoComponent && !autoComponent.contains(e.target)) {
      setShowFirstSuggestionMenu(false);
    }
  };
  const handleClickOutsideForSecondMenu = (e) => {
    const { current: autoComponent } = autocompleteRef;
    if (autoComponent && !autoComponent.contains(e.target)) {
      setShowSecondSuggestionMenu(false);
    }
  };
  if (!loading) {
    <Loader fullPage />;
  }
  console.log(error);
  return (
    <div className="App">
      <form className="wrapper" autocomplete="off" onSubmit={getCityMetrics}>
        <h1 className="title-text">City Radar App</h1>
        <div ref={autocompleteRef} className="input1">
          <AutocompleteComponent
            label="Enter town 1:"
            name="firstInput"
            value={firstInput || ''}
            fetchSuggestions={firstInputHandler}
            placeholder="e.g. Berlin"
            suggestion={filteredSuggestions}
            showSuggestions={showFirstSuggestionMenu}
            activeSuggestion={activeFirstMenu}
            onItemSelected={(value) => onItemSelectedFromFirstMenu(value)}
            onKeyDown={onKeyDownForFirstMenu}
            loading={loadingFirstSuggestionMenu}
          />
        </div>
        <div className="space1" />
        <div ref={autocompleteRef} className="input2">
          <AutocompleteComponent
            label="Enter town 2:"
            name="secondInput"
            value={secondInput || ''}
            fetchSuggestions={secondInputHandler}
            placeholder="e.g. Dortmund"
            suggestion={filteredSuggestions}
            showSuggestions={showSecondSuggestionMenu}
            activeSuggestion={activeSecondMenu}
            onItemSelected={(value) => onItemSelectedFromSecondMenu(value)}
            onKeyDown={onKeyDownForSecondMenu}
            loading={loadingSecondSuggestionMenu}
          />
        </div>
        <div className="space2" />

        <Button
          type="submit"
          className="btn"
          fullWidth
          textColor="#fff"
          bgColor="#FF7F50"
          disabled={!firstInput || !secondInput}
        >
          submit
        </Button>
        <div className="space3" />

        <div className="content">
          {!cityMetrics.length ? (
            <div className="empty-state">
              <EmptyState />
              <p>Oh no! No data was returned for your search.</p>
            </div>
          ) : (
            <Plot
              style={{ display: 'flex', justifyContent: 'center' }}
              className="plot"
              data={cityMetrics}
              layout={{
                polar: {
                  radialaxis: {
                    visible: true,
                    range: [0, 10],
                    showgrid: true,
                    tickmode: 'auto',
                    textcolor: '#000',
                  },
                },
              }}
              loading={loading}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
