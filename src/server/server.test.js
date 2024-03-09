const request = require('supertest');
const { app, addInfo } = require('./server');

describe('Server Routes', () => {
  describe('POST /add', () => {
    it('should add information to projectData', async () => {
      const response = await request(app)
        .post('/add')
        .send({
          depCity: 'Departure City',
          arrCity: 'Arrival City',
          depDate: '2022-01-01',
          weather: {
            max_temp: 25,
            min_temp: 15,
          },
          country: 'Country',
          capital: 'Capital',
          population: 1000000,
          summary: 'Summary',
          daysLeft: 10,
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        depCity: 'Departure City',
        arrCity: 'Arrival City',
        depDate: '2022-01-01',
        weather: {
          max_temp: 25,
          min_temp: 15,
        },
        country: 'Country',
        capital: 'Capital',
        population: 1000000,
        summary: 'Summary',
        daysLeft: 10,
      });
      expect(projectData).toEqual({
        depCity: 'Departure City',
        arrCity: 'Arrival City',
        depDate: '2022-01-01',
        weather: {
          max_temp: 25,
          min_temp: 15,
        },
        country: 'Country',
        capital: 'Capital',
        population: 1000000,
        summary: 'Summary',
        daysLeft: 10,
      });
    });
  });
});