import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Fixtures.css';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [filteredFixtures, setFilteredFixtures] = useState([]);
  const [search, setSearch] = useState('');
  const [seriesFilter, setSeriesFilter] = useState('All');
  const [popupFixture, setPopupFixture] = useState(null);

  const fetchFixtures = async () => {
    try {
      const res = await axios.get('https://core-prod-origin.cricclubs.com/core/match/getSchedule', {
        params: {
          clubId: 17793,
          limit: 50,
        },
        headers: {
          'x-consumer-key': 'Kom177cc',
          'x-api-key': 'adm$ui93',
        },
      });

      const list = res.data?.data?.fixtureList || [];
      setFixtures(list);
      setFilteredFixtures(list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, []);

  useEffect(() => {
    let result = fixtures;

    if (search) {
      result = result.filter((f) =>
        `${f.teamOneName} ${f.teamTwoName}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (seriesFilter !== 'All') {
      result = result.filter((f) => f.seriesType === seriesFilter);
    }

    setFilteredFixtures(result);
  }, [search, seriesFilter, fixtures]);

  const uniqueSeriesTypes = ['All', ...new Set(fixtures.map((f) => f.seriesType).filter(Boolean))];

  return (
    <div className="fixtures-container">
      <h1 className="fixtures-title">🏏 Fixtures</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={seriesFilter} onChange={(e) => setSeriesFilter(e.target.value)}>
          {uniqueSeriesTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="fixtures-grid">
        {filteredFixtures.map((fixture) => (
          <div key={fixture.fixtureId} className="fixture-card" onClick={() => setPopupFixture(fixture)}>
            <div className="fixture-header">
              <div className="team">
                {fixture.t1_logo_file_path && (
                  <img src={`https://core-prod-origin.cricclubs.com${fixture.t1_logo_file_path}`} alt="" className="team-logo" />
                )}
                <span>{fixture.teamOneName}</span>
              </div>
              <span className="vs">vs</span>
              <div className="team">
                {fixture.t2_logo_file_path ? (
                  <img src={`https://core-prod-origin.cricclubs.com${fixture.t2_logo_file_path}`} alt="" className="team-logo" />
                ) : (
                  <div className="no-logo" />
                )}
                <span>{fixture.teamTwoName}</span>
              </div>
            </div>
            <div className="fixture-body">
              <p><strong>Date:</strong> {fixture.fixedFormatDate}</p>
              <p><strong>Time:</strong> {fixture.time}</p>
              <p><strong>Series:</strong> {fixture.seriesName} ({fixture.seriesType})</p>
            </div>
          </div>
        ))}
      </div>

      {popupFixture && (
        <div className="popup-overlay" onClick={() => setPopupFixture(null)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>
              {popupFixture.teamOneName} vs {popupFixture.teamTwoName}
            </h2>
            <p><strong>Date:</strong> {popupFixture.fixedFormatDate}</p>
            <p><strong>Time:</strong> {popupFixture.time}</p>
            <p><strong>Series:</strong> {popupFixture.seriesName} ({popupFixture.seriesType})</p>
            <p><strong>Status:</strong> {popupFixture.statusDesc}</p>
            <p><strong>Day:</strong> {popupFixture.day}</p>
            <button onClick={() => setPopupFixture(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fixtures;
